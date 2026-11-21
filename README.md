# Kaytex Fabrics — Sales Landing Page

A responsive, static product-discovery and enquiry storefront for Kaytex Fabrics Limited. Built with plain HTML, CSS and vanilla JavaScript. No build step, framework, database or paid dependency is required.

## Preview locally

1. Extract the ZIP.
2. Open `index.html` in a modern browser, or serve the folder with a local static server (recommended for testing):

   ```bash
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000`.

## Push to GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder (the `index.html`, `css`, `js` and `assets` items should be at the repository root).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. GitHub Pages will publish the static site at the URL shown in Settings → Pages.

## What is included

- Responsive single-page sales landing page.
- Collection filtering for women, men, kids and fabric craft.
- Enquiry shortlist with remove / clear actions.
- Product and bulk enquiry forms that prepare a WhatsApp message.
- Phone, email and location contact details.
- Local SVG fallback artwork, so collection panels retain a designed appearance if remote photos are unavailable.
- SEO description, social preview metadata, favicon and reduced-motion handling.

## Important commercial notes before public launch

- This is a **sales enquiry storefront**, not a live checkout system. The public Kaytex website does not provide verified SKU-level prices, live stock, shipping rules or online payment details. The site therefore avoids showing invented prices or stock and routes buyers to the sales team.
- The WhatsApp action uses the mobile number publicly shown on Kaytex's website: `+91 98153 22260`. Confirm that this number is WhatsApp-enabled and approved for customer enquiries before publishing. If not, update `WHATSAPP_NUMBER` in `js/main.js` or remove the WhatsApp actions.
- Product photos currently reference image files published on Kaytex's official website. The site includes local SVG fallbacks in case those remote images cannot be reached. For the most reliable long-term hosting, obtain approval and download the approved high-resolution product photography into `assets/`, then update the image `src` paths in `index.html` to local paths.
- The header uses a clean typographic wordmark rather than an extracted official logo file. Replace it with the company's approved logo artwork if available.
- Verify product descriptions, brand spellings, contact routing, legal footer wording, and all photography rights with Kaytex before launch.

## Edit contact details

- Public telephone: `+91 183 400 9025` (in `index.html`).
- Public enquiry email: `contact@kaytexfabrics.com` (in `index.html`).
- Public mobile shown on Kaytex's website: `+91 98153 22260` (`WHATSAPP_NUMBER` in `js/main.js`).
- Address: Batala Road, Post Office Khanna Nagar, Amritsar – 143001, Punjab, India.

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages (free static hosting)

No npm install or compile step is needed.
