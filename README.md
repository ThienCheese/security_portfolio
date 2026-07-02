# Security Portfolio Website

A static, recruiter-facing portfolio site for three Information Security projects:

1. Extended Detection and Response Architecture with Wazuh
2. ProxyNotShell Exploit Replication & AD Threat Detection
3. Windows Defender Evasion & Process Injection Detection

## Structure

```text
security_portfolio/
├── index.html
├── projects/
│   ├── wazuh-xdr.html
│   ├── proxynotshell.html
│   └── process-injection.html
└── assets/
    ├── css/styles.css
    └── js/app.js
```

## How to run locally

Open `index.html` directly in your browser, or run a small local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## How to deploy on GitHub Pages

1. Create a repository named `security-portfolio`.
2. Upload all files in this folder.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Choose branch `main`, folder `/root`, then save.
6. Your site will be available at `https://<username>.github.io/security-portfolio/`.

## Safe portfolio note

The pages intentionally describe architecture, detection logic, artifacts, and defensive reasoning. They avoid publishing weaponized commands, exploit payloads, credentials, or operational bypass instructions.

## Suggested CV line

Security Project Portfolio: Visual case studies covering Wazuh XDR, ProxyNotShell AD threat detection, and process injection detection. Available at: `https://<username>.github.io/security-portfolio/`
