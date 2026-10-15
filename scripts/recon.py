import urllib.request
import urllib.error
import json
import os
import sys

GH_PAT = os.environ.get("GITHUB_PAT", "")
CF_TOKEN = os.environ.get("CLOUDFLARE_API_TOKEN", "")
CF_ACCOUNT = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "")

def check_github():
    print("--- 1. GitHub API ---")
    headers = {
        "Authorization": f"Bearer {GH_PAT}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "MotionsaltPortfolioBuild"
    }
    # User / Auth check
    try:
        req = urllib.request.Request("https://api.github.com/user", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            user = json.loads(r.read().decode())
            print(f"Authenticated as GitHub user: {user.get('login')}")
    except Exception as e:
        print(f"Auth check note: {e}")

    # Repo check
    try:
        req = urllib.request.Request("https://api.github.com/repos/motionssalt/bio", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            repo = json.loads(r.read().decode())
            print(f"Repo: {repo.get('full_name')}, Default Branch: {repo.get('default_branch')}, Private: {repo.get('private')}")
    except Exception as e:
        print(f"Repo check error: {e}")

    # Branches
    try:
        req = urllib.request.Request("https://api.github.com/repos/motionssalt/bio/branches", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            branches = json.loads(r.read().decode())
            print(f"Branches: {[b['name'] for b in branches]}")
    except Exception as e:
        print(f"Branches error: {e}")

    # Tags
    try:
        req = urllib.request.Request("https://api.github.com/repos/motionssalt/bio/tags", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            tags = json.loads(r.read().decode())
            print(f"Tags: {[t['name'] for t in tags]}")
    except Exception as e:
        print(f"Tags error: {e}")

    # Commits on main
    try:
        req = urllib.request.Request("https://api.github.com/repos/motionssalt/bio/commits?per_page=5", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            commits = json.loads(r.read().decode())
            print(f"Recent commits count: {len(commits)}")
            for c in commits:
                print(f"  - {c['sha'][:7]}: {c['commit']['message'].splitlines()[0]}")
    except Exception as e:
        print(f"Commits error: {e}")

    # Pages
    try:
        req = urllib.request.Request("https://api.github.com/repos/motionssalt/bio/pages", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            pages = json.loads(r.read().decode())
            print(f"GitHub Pages status: {pages.get('status')}, url: {pages.get('html_url')}")
    except urllib.error.HTTPError as e:
        print(f"GitHub Pages: {e.code} (likely not enabled)")
    except Exception as e:
        print(f"Pages error: {e}")

def check_cloudflare():
    print("\n--- 2. Cloudflare API ---")
    headers = {
        "Authorization": f"Bearer {CF_TOKEN}",
        "Content-Type": "application/json"
    }
    # Verify token
    try:
        req = urllib.request.Request("https://api.cloudflare.com/client/v4/user/tokens/verify", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            res = json.loads(r.read().decode())
            print(f"Token verify: success={res.get('success')}, status={res.get('result', {}).get('status')}")
    except Exception as e:
        print(f"Token verify note: {e}")

    # List pages projects in account
    try:
        req = urllib.request.Request(f"https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT}/pages/projects", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            res = json.loads(r.read().decode())
            projects = res.get("result", [])
            print(f"Cloudflare Pages projects found: {len(projects)}")
            for p in projects:
                print(f"  - {p.get('name')}: {p.get('sub_domain')}")
    except Exception as e:
        print(f"Cloudflare projects error: {e}")

def check_drive():
    print("\n--- 3. Public Google Drive Check ---")
    folder_id = "1w2KqAMVrJrHiz4T55FQZaCuYGoFZc5g8"
    urls = [
        f"https://drive.google.com/embeddedfolderview?id={folder_id}#list",
        f"https://drive.google.com/embeddedfolderview?id={folder_id}#grid",
        f"https://drive.google.com/drive/folders/{folder_id}"
    ]
    for url in urls:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
            with urllib.request.urlopen(req, timeout=10) as r:
                body = r.read().decode("utf-8", errors="ignore")
                print(f"URL: {url} -> Status {r.status}, length: {len(body)} bytes")
                # Look for file items or indicators
                if "flip-entry" in body or "data-id" in body or "drive-viewer" in body:
                    print("  -> Found entry markers in response!")
        except Exception as e:
            print(f"URL {url} error: {e}")

if __name__ == "__main__":
    check_github()
    check_cloudflare()
    check_drive()
