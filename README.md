# SAAR website

## Folder structure
- `index.html` — the whole site (Home / About / Follow)
- `css/style.css` — all styling, mobile + desktop
- `js/config.js` — **the one file you edit to lock/unlock the site**
- `js/script.js` — site logic (password gate, mobile menu)
- `generate-password.html` — open this in a browser to make a new password
- `assets/` — logo, hero image, social banner

## How to lock or unlock the site
Open `js/config.js`:

- To make the site **private** (password required): set `LOCKED: true`
- To make the site **public**: set `LOCKED: false`

The default password is **saar2026**. To change it:
1. Open `generate-password.html` in any browser (just double-click the file)
2. Type your new password, click "Generate hash"
3. Copy the `PASSWORD_HASH` value it gives you into `js/config.js`

Save the file, then redeploy (see below). This is a simple front-end gate —
good for keeping casual visitors out before launch — a technical visitor
could bypass it by reading the page source, so don't use it to protect
anything truly sensitive.

## Previewing locally
Just double-click `index.html` to open it in your browser.

## Deploying to GitHub Pages
1. Create a new GitHub repo (e.g. `saar-site`)
2. Push the contents of this `site/` folder to it
3. In the repo: Settings → Pages → Deploy from branch → `main` / root
4. Your site will be live at `https://<your-username>.github.io/saar-site/`

Every time you change `config.js` (or anything else), commit and push
again — GitHub Pages redeploys automatically in a minute or two.
