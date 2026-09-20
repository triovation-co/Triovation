# 📸 Triovation Google Sheets Cloudinary Auto-Uploader

This tool adds a native **Upload Image to Cloudinary** sidebar directly inside your Google Sheet product database.

When you drop an image:
1. It uploads directly to your Cloudinary account.
2. Generates the live CDN URL (e.g. `https://res.cloudinary.com/...`).
3. Automatically inserts the link into the `image` (Main Image) or `images` (Gallery) column of the selected product row.

---

## ⚡ Setup Guide (Takes ~3 Minutes)

### Part 1: Get Cloudinary Details (Free, 1 Minute)
1. Log in to your [Cloudinary Dashboard](https://cloudinary.com/console).
2. Note your **Cloud Name** (shown on the dashboard home screen).
3. Click the ⚙️ **Settings** gear icon (bottom-left or top-right).
4. Go to **Upload** settings ➔ scroll down to **Upload presets**.
5. Click **Add upload preset**:
   - **Upload preset name**: `triovation_products` (or any name you like).
   - **Signing Mode**: Change from **Signed** to **Unsigned**.
   - (Optional) **Folder**: `triovation/products`.
6. Click **Save** (top-right).

---

### Part 2: Add Script to Your Google Sheet (2 Minutes)
1. Open your **Google Sheet** (the one that powers Triovation).
2. In the top menu, click **Extensions** ➔ **Apps Script**.
3. You will see your existing Apps Script project:
   - In the left sidebar under **Files**, click the **`+`** icon ➔ select **Script** (or edit `Code.gs`):
     - Paste the code from [`apps-script/Code.gs`](./Code.gs).
   - Click the **`+`** icon ➔ select **HTML**:
     - Name it exactly: `CloudinarySidebar` (without `.html`).
     - Paste the code from [`apps-script/CloudinarySidebar.html`](./CloudinarySidebar.html).
4. Click the 💾 **Save project** icon (or press `Ctrl + S`).
5. **Reload your Google Sheet tab in your browser**.

---

## 🚀 How to Use It Daily

1. In your Google Sheet, you will now see a new menu at the top:
   **`🚀 Triovation` ➔ `📸 Upload Image to Cloudinary`**.
2. Click it! The uploader sidebar opens on the right side of your sheet.
3. Click on any product row in your sheet (e.g., Row 15: `T0014`).
   - The sidebar immediately recognizes the Product ID and Name!
4. Choose whether this is:
   - **Main Image** (updates `image` column)
   - **Gallery (Append)** (adds to `images` column)
5. Drag and drop your image (or click to browse).
6. Click **⚡ Upload & Add to Sheet**:
   - The image uploads to Cloudinary.
   - The link is generated and automatically written into the exact cell in your sheet!

---

## ⚙️ First-Time Settings in the Sidebar
When you first open the sidebar:
1. Click **⚙️ Cloudinary Credentials**.
2. Enter your **Cloud Name** and **Upload Preset** (e.g. `triovation_products`).
3. Click **Save Settings**.
*(This is saved in your browser, so you only need to enter it once!)*
