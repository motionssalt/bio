import sodium from 'libsodium-wrappers';

const GH_PAT = process.env.GITHUB_PAT;
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID;
const REPO = 'motionssalt/bio';

if (!GH_PAT || !CF_TOKEN || !CF_ACCOUNT) {
  console.error('Missing required environment variables');
  process.exit(1);
}

async function setSecret(secretName, secretValue) {
  await sodium.ready;
  
  // 1. Get repo public key
  const keyRes = await fetch(`https://api.github.com/repos/${REPO}/actions/secrets/public-key`, {
    headers: {
      Authorization: `Bearer ${GH_PAT}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'MotionsaltSecretSetter'
    }
  });
  if (!keyRes.ok) {
    throw new Error(`Failed to get public key: ${keyRes.status} ${await keyRes.text()}`);
  }
  const { key, key_id } = await keyRes.json();

  // 2. Encrypt secret
  const binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  const binsec = sodium.from_string(secretValue);
  const encBytes = sodium.crypto_box_seal(binsec, binkey);
  const encrypted_value = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);

  // 3. Put secret
  const putRes = await fetch(`https://api.github.com/repos/${REPO}/actions/secrets/${secretName}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GH_PAT}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'MotionsaltSecretSetter',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      encrypted_value,
      key_id
    })
  });

  if (!putRes.ok && putRes.status !== 201 && putRes.status !== 204) {
    throw new Error(`Failed to set secret ${secretName}: ${putRes.status} ${await putRes.text()}`);
  }
  console.log(`Secret ${secretName} set successfully (HTTP ${putRes.status})`);
}

async function main() {
  await setSecret('CLOUDFLARE_API_TOKEN', CF_TOKEN);
  await setSecret('CLOUDFLARE_ACCOUNT_ID', CF_ACCOUNT);
  console.log('All required secrets configured in GitHub Actions!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
