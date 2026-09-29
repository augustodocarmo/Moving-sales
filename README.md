# Warrington Moving Sale

A lightweight static catalogue for a house-clearance / moving sale. Built with plain HTML, CSS and JavaScript for GitHub Pages; no build step and no Lovable credits required.

## Publish

1. Create a public GitHub repository, e.g. `moving-sale`.
2. Upload the contents of this folder to the repository root.
3. In **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. GitHub will publish at `https://<username>.github.io/moving-sale/`.

## Availability sync

The page attempts to read the existing Google Sheet through its CSV endpoint. If the Sheet is accessible publicly, changing an item's `Status` to `Sold` will hide it automatically, and updated prices/descriptions will also appear. If public access is unavailable, the embedded catalogue is used as a fallback.

## Contact button

In `app.js`, set `CONTACT.whatsappNumber` to a WhatsApp number in international format, digits only, e.g. `447700900000`. If left blank, **I'm interested** uses the device's Share sheet or copies an enquiry message.
