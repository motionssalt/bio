import urllib.request
import urllib.error
import json
import os
import base64
import sys

GH_PAT = os.environ.get("GITHUB_PAT")
REPO = "motionssalt/bio"

if not GH_PAT:
    print("Missing GITHUB_PAT")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {GH_PAT}",
    "Accept": "application/vnd.github+json",
    "User-Agent": "MotionsaltPortfolioDeployer"
}

def api_call(endpoint, method="GET", data=None):
    url = f"https://api.github.com/repos/{REPO}/{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    if data is not None:
        payload = json.dumps(data).encode("utf-8")
        req.data = payload
        req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))

def main():
    print("🚀 Pushing all codebase files to GitHub via Git Data API...")
    
    # 1. Get current commit on main
    ref_info = api_call("git/ref/heads/main")
    parent_sha = ref_info["object"]["sha"]
    print(f"Parent commit on main: {parent_sha}")

    # 2. Gather all tracked files
    tree_items = []
    ignored_dirs = {".git", "node_modules", "legacy", "build", "dist"}
    
    file_count = 0
    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in ignored_dirs]
        for f in files:
            fpath = os.path.join(root, f)
            relpath = os.path.relpath(fpath, ".").replace("\\", "/")
            if relpath.startswith(".git") or relpath.startswith("node_modules") or relpath.startswith("legacy"):
                continue
            
            with open(fpath, "rb") as fp:
                content_bytes = fp.read()
            
            b64_content = base64.b64encode(content_bytes).decode("ascii")
            blob_res = api_call("git/blobs", method="POST", data={
                "content": b64_content,
                "encoding": "base64"
            })
            
            mode = "100755" if os.access(fpath, os.X_OK) and not fpath.endswith(('.json', '.ts', '.tsx', '.html', '.css', '.md')) else "100644"
            tree_items.append({
                "path": relpath,
                "mode": mode,
                "type": "blob",
                "sha": blob_res["sha"]
            })
            file_count += 1
            if file_count % 10 == 0:
                print(f"  Uploaded {file_count} blobs...")

    print(f"Total files uploaded: {len(tree_items)}")

    # 3. Create tree
    print("Creating new Git tree...")
    tree_res = api_call("git/trees", method="POST", data={
        "tree": tree_items
    })
    new_tree_sha = tree_res["sha"]
    print(f"New tree SHA: {new_tree_sha}")

    # 4. Create commit
    print("Creating commit...")
    commit_res = api_call("git/commits", method="POST", data={
        "message": "feat(portfolio): full refurbishment with public drive sync, upwork view & cloudflare pages deploy\n\n- Zero-config public Google Drive sync engine with WebP & MP4 preview derivation\n- Strict Upwork TOS-compliant view at /upwork/ and #/upwork\n- Cloudflare Pages direct deploy pipeline with 3-hour cron and keepalive\n- Dual theme system with Space Grotesk + Inter and signature kinetic easing",
        "tree": new_tree_sha,
        "parents": [parent_sha],
        "author": {
            "name": "Victor Jumbo",
            "email": "vjumbo98@gmail.com"
        }
    })
    new_commit_sha = commit_res["sha"]
    print(f"Created commit SHA: {new_commit_sha}")

    # 5. Update ref heads/main
    print("Updating branch ref heads/main...")
    update_res = api_call("git/refs/heads/main", method="PATCH", data={
        "sha": new_commit_sha,
        "force": True
    })
    print(f"✅ Successfully updated main to {new_commit_sha}!")

if __name__ == "__main__":
    main()
