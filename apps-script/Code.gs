// ============================================================
// TRIOVATION — All-in-One Backend (Google Apps Script)
// ============================================================
// Handles:
// 1. Products API (Catalogue, search, sort, CRUD)
// 2. Bulk Order Enquiries (Logged to 'BulkOrders' tab)
// 3. Design Consultancy Requests (Logged to 'Consultancy' tab)
// 4. General Enquiries (Logged to 'Enquiries' tab)
// 5. Order Checkout (Logged to 'Orders' tab)
// ============================================================

// ─── CONFIGURATION ──────────────────────────────────────────
const CONFIG = {
  COMPANY_EMAIL: 'triovation.co@gmail.com',
  COMPANY_NAME: 'Triovation',
  WEBSITE_URL: 'https://www.triovation.co',
  PRODUCTS_SHEET: 'Sheet1',          // ← Products catalogue tab
  BULK_ORDERS_SHEET: 'BulkOrders',   // ← Auto-created for Bulk Orders
  CONSULTANCY_SHEET: 'Consultancy',  // ← Auto-created for Design Consultancy
  ENQUIRIES_SHEET: 'Enquiries',      // ← Auto-created for General Enquiries
  ORDERS_SHEET: 'Orders'             // ← Auto-created for Orders
};

// ============================================================
// ROUTING — doGet & doPost
// ============================================================

function doGet(e) {
  const action = ((e && e.parameter && e.parameter.action) || '').trim();

  try {
    switch (action) {
      case 'getAllProducts':
        return jsonOutput(getAllProducts(e.parameter.sortBy));
      case 'getProductById':
        return jsonOutput(getProductById(e.parameter.productId));
      case 'getProductsByCategory':
        return jsonOutput(getProductsByCategory(e.parameter.category, e.parameter.sortBy));
      case 'searchProducts':
        return jsonOutput(searchProducts(e.parameter.searchTerm, e.parameter.sortBy));
      case 'getCategories':
        return jsonOutput(getCategories());
      case 'fixSheet':
        return jsonOutput(fixSheet());
      case 'test':
        return jsonOutput({
          success: true,
          message: 'Triovation All-in-One API is connected!',
          timestamp: new Date().toISOString(),
          services: ['Products', 'BulkOrders', 'Consultancy', 'Enquiries', 'Orders']
        });
      default:
        return jsonOutput({ error: 'Unknown GET action: ' + action });
    }
  } catch (err) {
    return jsonOutput({ error: err.message, stack: err.stack });
  }
}

function doPost(e) {
  try {
    let body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      body = e.parameter;
    }

    const action = body.action || '';
    const formType = (body.formType || '').toLowerCase();
    const source = (body.source || '').toLowerCase();

    // ── 1. Bulk Order Enquiry ──
    if (action === 'submitBulkOrder' || formType === 'bulk-order' || source.indexOf('bulk') >= 0) {
      return jsonOutput(handleBulkOrderEnquiry(body));
    }

    // ── 2. Design Consultancy Request ──
    if (action === 'submitConsultancy' || formType === 'design-consultancy' || source.indexOf('consult') >= 0) {
      return jsonOutput(handleConsultancyEnquiry(body));
    }

    // ── 3. Product CRUD Actions ──
    switch (action) {
      case 'addProduct':
        return jsonOutput(addProduct(body.productData));
      case 'updateProduct':
        return jsonOutput(updateProduct(body.productId, body.productData));
      case 'deleteProduct':
        return jsonOutput(deleteProduct(body.productId));

      case 'submitOrder':
        return jsonOutput(handleOrder(body));

      case 'submitEnquiry':
        return jsonOutput(handleGeneralEnquiry(body));
    }

    // ── 4. Fallback Auto-Detection ──
    if (body.formData && body.cart) {
      return jsonOutput(handleOrder(body));
    }
    if (body.name && (body.message !== undefined || body.location !== undefined)) {
      return jsonOutput(handleGeneralEnquiry(body));
    }

    return jsonOutput({ error: 'Unknown POST action: ' + action });
  } catch (err) {
    return jsonOutput({ error: err.message, stack: err.stack });
  }
}

function jsonOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}


// ============================================================
// ██████  1. BULK ORDER ENQUIRIES HANDLER
// ============================================================

function handleBulkOrderEnquiry(data) {
  var name = (data.name || '').trim();
  var email = (data.email || '').trim();
  var phone = (data.phone || '').trim();
  var location = (data.location || '').trim();
  var message = (data.message || '').trim();
  var source = (data.source || 'Bulk Order Page').trim();

  // 1. Log to dedicated 'BulkOrders' sheet
  logBulkOrder(name, email, phone, location, message, source);

  // 2. Send notification to company
  sendBulkOrderToCompany(name, email, phone, location, message, source);

  // 3. Send confirmation to customer
  if (email) {
    sendBulkOrderConfirmation(name, email, message);
  }

  return { success: true, message: 'Bulk order enquiry recorded successfully' };
}

function logBulkOrder(name, email, phone, location, message, source) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.BULK_ORDERS_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.BULK_ORDERS_SHEET);
    sheet.getRange(1, 1, 1, 7).setValues([[
      'Timestamp', 'Full Name', 'Email Address', 'Phone Number', 'Location / Address', 'Requirements / Message', 'Source'
    ]]);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name, email, phone, location, message, source
  ]);
}

function sendBulkOrderToCompany(name, email, phone, location, message, source) {
  var subject = '📦 New Bulk Order Enquiry from ' + name + ' — ' + CONFIG.COMPANY_NAME;

  var htmlBody = '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:620px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="background:linear-gradient(135deg,#b91c1c 0%,#e05a5e 100%);padding:28px 24px;text-align:center;">' +
      '<h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;letter-spacing:0.5px;">' + CONFIG.COMPANY_NAME + '</h1>' +
      '<p style="color:#fecaca;margin:6px 0 0;font-size:14px;font-weight:500;">📦 Bulk Order & Corporate Gifting Enquiry</p>' +
    '</div>' +
    '<div style="padding:26px 24px;">' +
      '<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:12px 16px;border-radius:6px;margin-bottom:20px;">' +
        '<p style="margin:0;color:#991b1b;font-weight:600;font-size:14px;">A new bulk order / quote request has been submitted!</p>' +
      '</div>' +
      '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;width:130px;">Name</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">' + name + '</td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;"><a href="mailto:' + email + '" style="color:#dc2626;font-weight:500;text-decoration:none;">' + email + '</a></td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Phone</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;"><a href="tel:' + phone + '" style="color:#111827;text-decoration:none;">' + (phone || 'Not provided') + '</a></td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Location</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">' + (location || 'Not provided') + '</td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Source</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#111827;">' + source + '</td></tr>' +
      '</table>' +
      '<div style="margin-top:20px;">' +
        '<p style="color:#6b7280;font-size:13px;font-weight:600;margin-bottom:6px;">Requirements / Message:</p>' +
        '<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px;">' +
          '<p style="margin:0;color:#374151;line-height:1.6;font-size:14px;">' + (message || 'No additional requirements specified.') + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div style="background:#f9fafb;padding:14px 24px;text-align:center;border-top:1px solid #e5e7eb;">' +
      '<p style="margin:0;color:#9ca3af;font-size:12px;">Logged in "BulkOrders" sheet • ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + '</p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: CONFIG.COMPANY_EMAIL,
    replyTo: email || CONFIG.COMPANY_EMAIL,
    name: CONFIG.COMPANY_NAME,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendBulkOrderConfirmation(name, email, message) {
  var subject = 'Thank you for your Bulk Order Enquiry — ' + CONFIG.COMPANY_NAME;

  var htmlBody = '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="background:linear-gradient(135deg,#b91c1c 0%,#e05a5e 100%);padding:28px 24px;text-align:center;">' +
      '<h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">' + CONFIG.COMPANY_NAME + '</h1>' +
      '<p style="color:#fecaca;margin:6px 0 0;font-size:14px;">Bulk Order & Corporate Gifting</p>' +
    '</div>' +
    '<div style="padding:28px 24px;">' +
      '<h2 style="color:#111827;font-size:20px;margin:0 0 14px;">Hi ' + name + ',</h2>' +
      '<p style="color:#374151;line-height:1.7;margin-bottom:16px;">Thank you for contacting Triovation for your bulk order requirements! We have received your enquiry and our corporate gifting team is reviewing your details.</p>' +
      '<p style="color:#374151;line-height:1.7;margin-bottom:16px;">We will connect with you shortly with customized volume pricing, product recommendations, and delivery timelines.</p>' +
      (message ? (
        '<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:12px 16px;border-radius:6px;margin-bottom:20px;">' +
          '<p style="margin:0;color:#991b1b;font-size:13px;"><strong>Your Message:</strong><br/>' + message + '</p>' +
        '</div>'
      ) : '') +
      '<p style="color:#374151;line-height:1.7;">Explore our latest collections anytime at <a href="' + CONFIG.WEBSITE_URL + '" style="color:#dc2626;font-weight:600;text-decoration:none;">' + CONFIG.WEBSITE_URL + '</a></p>' +
      '<p style="color:#374151;margin-top:24px;">Warm regards,<br/><strong>Team ' + CONFIG.COMPANY_NAME + '</strong></p>' +
    '</div>' +
    '<div style="background:#f9fafb;padding:14px 24px;text-align:center;border-top:1px solid #e5e7eb;">' +
      '<p style="margin:0;color:#9ca3af;font-size:12px;">' + CONFIG.COMPANY_NAME + ' | ' + CONFIG.COMPANY_EMAIL + '</p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: email,
    replyTo: CONFIG.COMPANY_EMAIL,
    name: CONFIG.COMPANY_NAME,
    subject: subject,
    htmlBody: htmlBody
  });
}


// ============================================================
// ██████  2. DESIGN CONSULTANCY HANDLER
// ============================================================

function handleConsultancyEnquiry(data) {
  var name = (data.name || '').trim();
  var email = (data.email || '').trim();
  var phone = (data.phone || '').trim();
  var location = (data.location || '').trim();
  var message = (data.message || '').trim();
  var source = (data.source || 'Design Consultancy Page').trim();

  // 1. Log to dedicated 'Consultancy' sheet
  logConsultancy(name, email, phone, location, message, source);

  // 2. Send notification to company
  sendConsultancyToCompany(name, email, phone, location, message, source);

  // 3. Send confirmation to customer
  if (email) {
    sendConsultancyConfirmation(name, email, message);
  }

  return { success: true, message: 'Consultancy request recorded successfully' };
}

function logConsultancy(name, email, phone, location, message, source) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.CONSULTANCY_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.CONSULTANCY_SHEET);
    sheet.getRange(1, 1, 1, 7).setValues([[
      'Timestamp', 'Full Name', 'Email Address', 'Phone Number', 'Location / City', 'Design Brief / Message', 'Source'
    ]]);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name, email, phone, location, message, source
  ]);
}

function sendConsultancyToCompany(name, email, phone, location, message, source) {
  var subject = '🎨 New Design Consultation Request from ' + name + ' — ' + CONFIG.COMPANY_NAME;

  var htmlBody = '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:620px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="background:linear-gradient(135deg,#312e81 0%,#6366f1 100%);padding:28px 24px;text-align:center;">' +
      '<h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;letter-spacing:0.5px;">' + CONFIG.COMPANY_NAME + '</h1>' +
      '<p style="color:#c7d2fe;margin:6px 0 0;font-size:14px;font-weight:500;">🎨 Design Consultancy Request</p>' +
    '</div>' +
    '<div style="padding:26px 24px;">' +
      '<div style="background:#eef2ff;border-left:4px solid #6366f1;padding:12px 16px;border-radius:6px;margin-bottom:20px;">' +
        '<p style="margin:0;color:#3730a3;font-weight:600;font-size:14px;">A new design consultation request has been submitted!</p>' +
      '</div>' +
      '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;width:130px;">Client Name</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">' + name + '</td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;"><a href="mailto:' + email + '" style="color:#4f46e5;font-weight:500;text-decoration:none;">' + email + '</a></td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Phone</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;"><a href="tel:' + phone + '" style="color:#111827;text-decoration:none;">' + (phone || 'Not provided') + '</a></td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Location</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">' + (location || 'Not provided') + '</td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Source</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#111827;">' + source + '</td></tr>' +
      '</table>' +
      '<div style="margin-top:20px;">' +
        '<p style="color:#6b7280;font-size:13px;font-weight:600;margin-bottom:6px;">Project Brief / Message:</p>' +
        '<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px;">' +
          '<p style="margin:0;color:#374151;line-height:1.6;font-size:14px;">' + (message || 'No specific details provided.') + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div style="background:#f9fafb;padding:14px 24px;text-align:center;border-top:1px solid #e5e7eb;">' +
      '<p style="margin:0;color:#9ca3af;font-size:12px;">Logged in "Consultancy" sheet • ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + '</p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: CONFIG.COMPANY_EMAIL,
    replyTo: email || CONFIG.COMPANY_EMAIL,
    name: CONFIG.COMPANY_NAME,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendConsultancyConfirmation(name, email, message) {
  var subject = 'Thank you for your Design Consultation Request — ' + CONFIG.COMPANY_NAME;

  var htmlBody = '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="background:linear-gradient(135deg,#312e81 0%,#6366f1 100%);padding:28px 24px;text-align:center;">' +
      '<h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">' + CONFIG.COMPANY_NAME + '</h1>' +
      '<p style="color:#c7d2fe;margin:6px 0 0;font-size:14px;">Design Consultancy</p>' +
    '</div>' +
    '<div style="padding:28px 24px;">' +
      '<h2 style="color:#111827;font-size:20px;margin:0 0 14px;">Hi ' + name + ',</h2>' +
      '<p style="color:#374151;line-height:1.7;margin-bottom:16px;">Thank you for booking a design consultation with Triovation! We have received your brief and our creative team is analyzing your project requirements.</p>' +
      '<p style="color:#374151;line-height:1.7;margin-bottom:16px;">We will connect with you within 24-48 hours to schedule our 1-on-1 strategy call.</p>' +
      (message ? (
        '<div style="background:#eef2ff;border-left:4px solid #6366f1;padding:12px 16px;border-radius:6px;margin-bottom:20px;">' +
          '<p style="margin:0;color:#3730a3;font-size:13px;"><strong>Your Brief:</strong><br/>' + message + '</p>' +
        '</div>'
      ) : '') +
      '<p style="color:#374151;line-height:1.7;">Visit our portfolio at <a href="' + CONFIG.WEBSITE_URL + '" style="color:#4f46e5;font-weight:600;text-decoration:none;">' + CONFIG.WEBSITE_URL + '</a></p>' +
      '<p style="color:#374151;margin-top:24px;">Warm regards,<br/><strong>Team ' + CONFIG.COMPANY_NAME + '</strong></p>' +
    '</div>' +
    '<div style="background:#f9fafb;padding:14px 24px;text-align:center;border-top:1px solid #e5e7eb;">' +
      '<p style="margin:0;color:#9ca3af;font-size:12px;">' + CONFIG.COMPANY_NAME + ' | ' + CONFIG.COMPANY_EMAIL + '</p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: email,
    replyTo: CONFIG.COMPANY_EMAIL,
    name: CONFIG.COMPANY_NAME,
    subject: subject,
    htmlBody: htmlBody
  });
}


// ============================================================
// ██████  3. GENERAL ENQUIRY HANDLER
// ============================================================

function handleGeneralEnquiry(data) {
  var name = (data.name || '').trim();
  var email = (data.email || '').trim();
  var phone = (data.phone || '').trim();
  var message = (data.message || '').trim();
  var source = (data.source || 'Website General Enquiry').trim();

  // 1. Log to sheet
  logGeneralEnquiry(name, email, phone, message, source);

  // 2. Notify company
  sendGeneralEnquiryToCompany(name, email, phone, message, source);

  // 3. Confirm to customer
  if (email) {
    sendGeneralEnquiryConfirmation(name, email, message);
  }

  return { success: true, message: 'Enquiry received successfully' };
}

function logGeneralEnquiry(name, email, phone, message, source) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.ENQUIRIES_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.ENQUIRIES_SHEET);
    sheet.getRange(1, 1, 1, 6).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Message', 'Source']]);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name, email, phone, message, source
  ]);
}

function sendGeneralEnquiryToCompany(name, email, phone, message, source) {
  var subject = '🔔 New Enquiry from ' + name + ' — ' + CONFIG.COMPANY_NAME;

  var htmlBody = '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="background:linear-gradient(135deg,#1f2937 0%,#374151 100%);padding:28px 24px;text-align:center;">' +
      '<h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">' + CONFIG.COMPANY_NAME + '</h1>' +
      '<p style="color:#9ca3af;margin:6px 0 0;font-size:14px;">New Website Enquiry</p>' +
    '</div>' +
    '<div style="padding:26px 24px;">' +
      '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;width:120px;">Name</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">' + name + '</td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;"><a href="mailto:' + email + '" style="color:#2563eb;text-decoration:none;">' + email + '</a></td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Phone</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;"><a href="tel:' + phone + '" style="color:#111827;text-decoration:none;">' + (phone || 'Not provided') + '</a></td></tr>' +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#6b7280;">Source</td><td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#111827;">' + source + '</td></tr>' +
      '</table>' +
      '<div style="margin-top:20px;">' +
        '<p style="color:#6b7280;font-size:13px;font-weight:600;margin-bottom:6px;">Message:</p>' +
        '<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px;">' +
          '<p style="margin:0;color:#374151;line-height:1.6;font-size:14px;">' + (message || 'No message provided') + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div style="background:#f9fafb;padding:14px 24px;text-align:center;border-top:1px solid #e5e7eb;">' +
      '<p style="margin:0;color:#9ca3af;font-size:12px;">Received at ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + '</p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: CONFIG.COMPANY_EMAIL,
    replyTo: email || CONFIG.COMPANY_EMAIL,
    name: CONFIG.COMPANY_NAME,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendGeneralEnquiryConfirmation(name, email, message) {
  var subject = 'Thank you for your enquiry — ' + CONFIG.COMPANY_NAME;

  var htmlBody = '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="background:linear-gradient(135deg,#1f2937 0%,#374151 100%);padding:28px 24px;text-align:center;">' +
      '<h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">' + CONFIG.COMPANY_NAME + '</h1>' +
    '</div>' +
    '<div style="padding:28px 24px;">' +
      '<h2 style="color:#111827;font-size:20px;margin:0 0 14px;">Hi ' + name + ',</h2>' +
      '<p style="color:#374151;line-height:1.7;margin-bottom:16px;">Thank you for reaching out to us! We have received your message and our team will get back to you shortly.</p>' +
      (message ? (
        '<div style="background:#f0f9ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:6px;margin-bottom:20px;">' +
          '<p style="margin:0;color:#1e40af;font-size:13px;"><strong>Your Message:</strong><br/>' + message + '</p>' +
        '</div>'
      ) : '') +
      '<p style="color:#374151;line-height:1.7;">Feel free to browse our catalogue at <a href="' + CONFIG.WEBSITE_URL + '" style="color:#2563eb;text-decoration:none;">' + CONFIG.WEBSITE_URL + '</a></p>' +
      '<p style="color:#374151;margin-top:24px;">Warm regards,<br/><strong>Team ' + CONFIG.COMPANY_NAME + '</strong></p>' +
    '</div>' +
    '<div style="background:#f9fafb;padding:14px 24px;text-align:center;border-top:1px solid #e5e7eb;">' +
      '<p style="margin:0;color:#9ca3af;font-size:12px;">' + CONFIG.COMPANY_NAME + ' | ' + CONFIG.COMPANY_EMAIL + '</p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: email,
    replyTo: CONFIG.COMPANY_EMAIL,
    name: CONFIG.COMPANY_NAME,
    subject: subject,
    htmlBody: htmlBody
  });
}


// ============================================================
// ██████  4. ORDER / CHECKOUT HANDLER
// ============================================================

function handleOrder(orderData) {
  var formData = orderData.formData || {};
  var cart = orderData.cart || [];
  var subtotal = orderData.subtotal || 0;
  var shipping = orderData.shipping || 0;
  var total = orderData.total || 0;
  var paymentMethod = orderData.paymentMethod || 'whatsapp';
  var orderDate = orderData.orderDate || new Date().toISOString();

  // Generate order ID
  var orderId = 'TRV-' + Date.now().toString(36).toUpperCase();

  // 1. Log order to sheet
  logOrder(orderId, formData, cart, subtotal, shipping, total, paymentMethod, orderDate);

  // 2. Notify company
  sendOrderToCompany(orderId, formData, cart, subtotal, shipping, total, paymentMethod, orderDate);

  // 3. Confirm to customer
  if (formData.email) {
    sendOrderConfirmation(orderId, formData, cart, subtotal, shipping, total, paymentMethod);
  }

  return { success: true, orderId: orderId, message: 'Order placed successfully' };
}

function logOrder(orderId, formData, cart, subtotal, shipping, total, paymentMethod, orderDate) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.ORDERS_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.ORDERS_SHEET);
    sheet.getRange(1, 1, 1, 16).setValues([[
      'Order ID', 'Order Date', 'First Name', 'Last Name', 'Company',
      'Email', 'Phone', 'Street Address', 'Apartment', 'City',
      'State', 'PIN Code', 'Country', 'Payment Method', 'Items', 'Total'
    ]]);
    sheet.getRange(1, 1, 1, 16).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  var itemsSummary = cart.map(function(item) {
    var line = (item.name || 'Item') + ' × ' + item.quantity + ' = ₹' + ((item.price || 0) * item.quantity).toFixed(2);
    if (item.customization) line += ' [Customization: ' + item.customization + ']';
    return line;
  }).join('\n');

  sheet.appendRow([
    orderId,
    new Date(orderDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    formData.firstName || '', formData.lastName || '', formData.companyName || '',
    formData.email || '', formData.phone || '',
    formData.streetAddress || '', formData.apartment || '', formData.townCity || '',
    formData.state || '', formData.pinCode || '', formData.country || 'India',
    paymentMethod, itemsSummary, '₹' + total.toFixed(2)
  ]);
}

function sendOrderToCompany(orderId, formData, cart, subtotal, shipping, total, paymentMethod, orderDate) {
  var subject = '🛒 New Order ' + orderId + ' from ' + formData.firstName + ' ' + formData.lastName + ' — ' + CONFIG.COMPANY_NAME;

  var itemsHtml = '';
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    itemsHtml += '<tr>' +
      '<td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;">' + item.name + '</td>' +
      '<td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;text-align:center;">' + item.quantity + '</td>' +
      '<td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;text-align:right;">₹' + ((item.price || 0) * item.quantity).toFixed(2) + '</td>' +
    '</tr>';
    if (item.customization) {
      itemsHtml += '<tr><td colspan="3" style="padding:4px 16px 12px;border-bottom:1px solid #f3f4f6;">' +
        '<div style="background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;border-radius:4px;font-size:12px;color:#1e40af;">🎨 Customization: ' + item.customization + '</div>' +
      '</td></tr>';
    }
  }

  var companyRow = formData.companyName
    ? '<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Company</td><td style="color:#111827;">' + formData.companyName + '</td></tr>'
    : '';
  var notesBlock = formData.orderNotes
    ? '<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;margin-bottom:24px;"><p style="margin:0 0 4px;color:#6b7280;font-size:12px;">📝 Order Notes:</p><p style="margin:0;color:#374151;">' + formData.orderNotes + '</p></div>'
    : '';

  var htmlBody = '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:650px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="background:linear-gradient(135deg,#1f2937 0%,#374151 100%);padding:30px 24px;text-align:center;">' +
      '<h1 style="color:#fff;margin:0;font-size:24px;">' + CONFIG.COMPANY_NAME + '</h1>' +
      '<p style="color:#9ca3af;margin:8px 0 0;font-size:14px;">New Order Received</p>' +
    '</div>' +
    '<div style="padding:30px 24px;">' +
      '<div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:14px 16px;border-radius:6px;margin-bottom:24px;">' +
        '<p style="margin:0;color:#92400e;font-weight:600;">🛒 New Order: <strong>' + orderId + '</strong></p>' +
        '<p style="margin:4px 0 0;color:#92400e;font-size:13px;">' + new Date(orderDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + '</p>' +
      '</div>' +
      '<h3 style="color:#111827;font-size:16px;margin:0 0 12px;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">👤 Customer Details</h3>' +
      '<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">' +
        '<tr><td style="padding:8px 0;color:#6b7280;width:130px;font-size:13px;">Name</td><td style="color:#111827;font-weight:600;">' + formData.firstName + ' ' + formData.lastName + '</td></tr>' +
        '<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td><a href="mailto:' + formData.email + '" style="color:#2563eb;">' + formData.email + '</a></td></tr>' +
        '<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td><a href="tel:' + formData.phone + '" style="color:#2563eb;">' + formData.phone + '</a></td></tr>' +
        companyRow +
        '<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Address</td><td style="color:#111827;">' + formData.streetAddress + (formData.apartment ? ', ' + formData.apartment : '') + '<br/>' + formData.townCity + ', ' + formData.state + ' — ' + formData.pinCode + '<br/>' + formData.country + '</td></tr>' +
        '<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Payment</td><td style="color:#111827;">' + paymentMethod + '</td></tr>' +
      '</table>' +
      notesBlock +
      '<h3 style="color:#111827;font-size:16px;margin:0 0 12px;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">📦 Order Items</h3>' +
      '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">' +
        '<thead><tr style="background:#f9fafb;">' +
          '<th style="padding:10px 16px;text-align:left;font-size:12px;color:#6b7280;">Product</th>' +
          '<th style="padding:10px 16px;text-align:center;font-size:12px;color:#6b7280;">Qty</th>' +
          '<th style="padding:10px 16px;text-align:right;font-size:12px;color:#6b7280;">Subtotal</th>' +
        '</tr></thead><tbody>' + itemsHtml + '</tbody>' +
      '</table>' +
      '<div style="background:#f9fafb;border-radius:8px;padding:16px;margin-top:16px;">' +
        '<table style="width:100%;">' +
          '<tr><td style="padding:4px 0;color:#6b7280;">Subtotal</td><td style="text-align:right;color:#374151;font-weight:600;">₹' + subtotal.toFixed(2) + '</td></tr>' +
          '<tr><td style="padding:4px 0;color:#6b7280;">Shipping</td><td style="text-align:right;color:#22c55e;font-weight:600;">' + (shipping === 0 ? 'Free' : '₹' + shipping.toFixed(2)) + '</td></tr>' +
          '<tr><td colspan="2" style="border-top:2px solid #e5e7eb;padding-top:8px;"></td></tr>' +
          '<tr><td style="color:#111827;font-weight:700;font-size:16px;">Total</td><td style="text-align:right;color:#111827;font-weight:700;font-size:18px;">₹' + total.toFixed(2) + '</td></tr>' +
        '</table>' +
      '</div>' +
    '</div>' +
    '<div style="background:#f9fafb;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">' +
      '<p style="margin:0;color:#9ca3af;font-size:12px;">Order received at ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + '</p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: CONFIG.COMPANY_EMAIL,
    replyTo: formData.email || CONFIG.COMPANY_EMAIL,
    name: CONFIG.COMPANY_NAME,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendOrderConfirmation(orderId, formData, cart, subtotal, shipping, total, paymentMethod) {
  var subject = '✅ Order Confirmed — ' + orderId + ' | ' + CONFIG.COMPANY_NAME;

  var itemsHtml = '';
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    itemsHtml += '<tr>' +
      '<td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;">' + item.name + '</td>' +
      '<td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;text-align:center;">' + item.quantity + '</td>' +
      '<td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#374151;text-align:right;">₹' + ((item.price || 0) * item.quantity).toFixed(2) + '</td>' +
    '</tr>';
    if (item.customization) {
      itemsHtml += '<tr><td colspan="3" style="padding:4px 16px 12px;border-bottom:1px solid #f3f4f6;">' +
        '<div style="background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;border-radius:4px;font-size:12px;color:#1e40af;">🎨 Customization: ' + item.customization + '</div>' +
      '</td></tr>';
    }
  }

  var htmlBody = '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:650px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="background:linear-gradient(135deg,#1f2937 0%,#374151 100%);padding:30px 24px;text-align:center;">' +
      '<h1 style="color:#fff;margin:0;font-size:24px;">' + CONFIG.COMPANY_NAME + '</h1>' +
      '<p style="color:#9ca3af;margin:8px 0 0;font-size:14px;">Order Confirmation</p>' +
    '</div>' +
    '<div style="padding:30px 24px;">' +
      '<div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:14px 16px;border-radius:6px;margin-bottom:24px;">' +
        '<p style="margin:0;color:#166534;font-weight:600;font-size:16px;">✅ Your order has been confirmed!</p>' +
        '<p style="margin:6px 0 0;color:#166534;font-size:13px;">Order ID: <strong>' + orderId + '</strong></p>' +
      '</div>' +
      '<h2 style="color:#111827;font-size:20px;margin:0 0 8px;">Hi ' + formData.firstName + ',</h2>' +
      '<p style="color:#374151;line-height:1.7;margin-bottom:20px;">Thank you for your order! We have received it and will contact you shortly on WhatsApp to process the payment and arrange delivery.</p>' +
      '<h3 style="color:#111827;font-size:16px;margin:0 0 12px;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">📦 Your Order</h3>' +
      '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">' +
        '<thead><tr style="background:#f9fafb;">' +
          '<th style="padding:10px 16px;text-align:left;font-size:12px;color:#6b7280;">Product</th>' +
          '<th style="padding:10px 16px;text-align:center;font-size:12px;color:#6b7280;">Qty</th>' +
          '<th style="padding:10px 16px;text-align:right;font-size:12px;color:#6b7280;">Subtotal</th>' +
        '</tr></thead><tbody>' + itemsHtml + '</tbody>' +
      '</table>' +
      '<div style="background:#f9fafb;border-radius:8px;padding:16px;">' +
        '<table style="width:100%;">' +
          '<tr><td style="padding:4px 0;color:#6b7280;">Subtotal</td><td style="text-align:right;color:#374151;font-weight:600;">₹' + subtotal.toFixed(2) + '</td></tr>' +
          '<tr><td style="padding:4px 0;color:#6b7280;">Shipping</td><td style="text-align:right;color:#22c55e;font-weight:600;">' + (shipping === 0 ? 'Free' : '₹' + shipping.toFixed(2)) + '</td></tr>' +
          '<tr><td colspan="2" style="border-top:2px solid #e5e7eb;padding-top:8px;"></td></tr>' +
          '<tr><td style="color:#111827;font-weight:700;font-size:16px;">Total</td><td style="text-align:right;color:#111827;font-weight:700;font-size:18px;">₹' + total.toFixed(2) + '</td></tr>' +
        '</table>' +
      '</div>' +
      '<div style="margin-top:24px;background:#f0f9ff;border-radius:8px;padding:16px;">' +
        '<h4 style="margin:0 0 8px;color:#1e40af;">📍 Delivery Address</h4>' +
        '<p style="margin:0;color:#374151;line-height:1.6;">' +
          formData.firstName + ' ' + formData.lastName + '<br/>' +
          formData.streetAddress + (formData.apartment ? ', ' + formData.apartment : '') + '<br/>' +
          formData.townCity + ', ' + formData.state + ' — ' + formData.pinCode + '<br/>' +
          formData.country +
        '</p>' +
      '</div>' +
      '<p style="color:#374151;line-height:1.7;margin-top:24px;">If you have any questions, reach us at <a href="mailto:' + CONFIG.COMPANY_EMAIL + '" style="color:#2563eb;">' + CONFIG.COMPANY_EMAIL + '</a></p>' +
      '<p style="color:#374151;margin-top:20px;">Warm regards,<br/><strong>Team ' + CONFIG.COMPANY_NAME + '</strong></p>' +
    '</div>' +
    '<div style="background:#f9fafb;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">' +
      '<p style="margin:0;color:#9ca3af;font-size:12px;">' + CONFIG.COMPANY_NAME + ' | <a href="' + CONFIG.WEBSITE_URL + '" style="color:#6b7280;">' + CONFIG.WEBSITE_URL + '</a></p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: formData.email,
    replyTo: CONFIG.COMPANY_EMAIL,
    name: CONFIG.COMPANY_NAME,
    subject: subject,
    htmlBody: htmlBody
  });
}


// ============================================================
// ██████  5. PRODUCTS API (Catalogue, Search, CRUD)
// ============================================================

function getProductSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.PRODUCTS_SHEET);
  if (!sheet) {
    sheet = ss.getSheetByName('Products') || ss.getSheetByName('Sheet1') || ss.getSheets()[0];
  }
  return sheet;
}

function getHeaders(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0]
    .map(function(h) { return h.toString().trim().toLowerCase(); });
}

function colIdx(headers) {
  return function() {
    var names = Array.prototype.slice.call(arguments);
    for (var i = 0; i < names.length; i++) {
      var idx = headers.indexOf(names[i].toLowerCase());
      if (idx >= 0) return idx;
    }
    return -1;
  };
}

function rowToProduct(row, headers) {
  var find = colIdx(headers);

  var get = function() {
    var idx = find.apply(null, arguments);
    return idx >= 0 ? (row[idx] || '').toString().trim() : '';
  };

  var id = get('id', 'product id', 'productid');
  var name = get('name', 'product name', 'productname');
  var description = get('description', 'desc');
  var priceRaw = get('price');
  var mrp = get('mrp', 'original price');
  var image = get('image', 'main image', 'mainimage', 'image url');
  var imagesRaw = get('images', 'extra images', 'additional images');
  var category = get('category', 'cat');
  var details = get('details', 'additional details');
  var customSpecsRaw = get('customspecifications', 'custom specifications',
    'custom specifications (json)', 'specifications', 'specs', 'custom_specifications');
  var slug = get('slug', 'url slug');

  // Parse price
  var price = 0;
  if (priceRaw) {
    var cleaned = priceRaw.replace(/[₹$€£¥,\s]/g, '').replace(/[^\d.\-]/g, '');
    price = parseFloat(cleaned) || 0;
  }

  // Parse images (comma-separated)
  var images = [];
  if (imagesRaw) {
    images = imagesRaw.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
  }

  // Parse custom specifications (JSON)
  var customSpecifications = null;
  if (customSpecsRaw) {
    try {
      customSpecifications = JSON.parse(customSpecsRaw);
    } catch (e) {
      customSpecifications = customSpecsRaw;
    }
  }

  return {
    id: id,
    name: name,
    description: description,
    price: price,
    mrp: mrp || priceRaw,
    image: image,
    images: images,
    category: category,
    details: details,
    customSpecifications: customSpecifications,
    slug: slug
  };
}

function getAllProducts(sortBy) {
  var sheet = getProductSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  var headers = getHeaders(sheet);
  var data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();

  var products = [];
  for (var i = 0; i < data.length; i++) {
    var p = rowToProduct(data[i], headers);
    if (p.id && p.name) products.push(p);
  }

  return sortProducts(products, sortBy);
}

function getProductById(productId) {
  if (!productId) return { error: 'productId is required' };

  var sheet = getProductSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { error: 'No products found' };

  var headers = getHeaders(sheet);
  var data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();

  for (var i = 0; i < data.length; i++) {
    var product = rowToProduct(data[i], headers);
    if (product.id === productId.toString().trim()) {
      return product;
    }
  }
  return { error: 'Product not found: ' + productId };
}

function getProductsByCategory(category, sortBy) {
  if (!category) return { error: 'category is required' };
  var allProducts = getAllProducts(sortBy);
  if (allProducts.error) return allProducts;

  var catLower = category.toLowerCase().trim();
  return allProducts.filter(function(p) {
    return p.category && p.category.toLowerCase().trim() === catLower;
  });
}

function searchProducts(searchTerm, sortBy) {
  if (!searchTerm) return getAllProducts(sortBy);
  var allProducts = getAllProducts(sortBy);
  if (allProducts.error) return allProducts;

  var term = searchTerm.toLowerCase().trim();
  return allProducts.filter(function(p) {
    var fields = [p.name, p.description, p.category, p.details, p.id];
    for (var i = 0; i < fields.length; i++) {
      if ((fields[i] || '').toLowerCase().indexOf(term) >= 0) return true;
    }
    return false;
  });
}

function getCategories() {
  var sheet = getProductSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  var headers = getHeaders(sheet);
  var find = colIdx(headers);
  var catColIdx = find('category', 'cat');
  if (catColIdx < 0) return [];

  var data = sheet.getRange(2, catColIdx + 1, lastRow - 1, 1).getValues();
  var seen = {};
  var result = [];
  for (var i = 0; i < data.length; i++) {
    var cat = data[i][0].toString().trim();
    if (cat && !seen[cat]) {
      seen[cat] = true;
      result.push(cat);
    }
  }
  return result.sort();
}

function addProduct(productData) {
  if (!productData) return { error: 'productData is required' };

  var sheet = getProductSheet();
  var headers = getHeaders(sheet);
  var lastRow = sheet.getLastRow();

  var nextId = 'T0001';
  if (lastRow > 1) {
    var find = colIdx(headers);
    var idColIdx = find('id', 'product id', 'productid');
    if (idColIdx >= 0) {
      var ids = sheet.getRange(2, idColIdx + 1, lastRow - 1, 1).getValues();
      var maxNum = 0;
      for (var i = 0; i < ids.length; i++) {
        var idStr = ids[i][0].toString().trim();
        if (idStr.indexOf('T') === 0) {
          var num = parseInt(idStr.replace('T', ''), 10);
          if (!isNaN(num) && num > maxNum) maxNum = num;
        }
      }
      nextId = 'T' + ('0000' + (maxNum + 1)).slice(-4);
    }
  }

  var newRow = headers.map(function(h) {
    return mapFieldToValue(h, productData, nextId);
  });

  sheet.appendRow(newRow);
  return { success: true, id: nextId, message: 'Product added successfully' };
}

function updateProduct(productId, productData) {
  if (!productId) return { error: 'productId is required' };
  if (!productData) return { error: 'productData is required' };

  var sheet = getProductSheet();
  var headers = getHeaders(sheet);
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { error: 'No products to update' };

  var find = colIdx(headers);
  var idColIdx = find('id', 'product id', 'productid');
  if (idColIdx < 0) return { error: 'ID column not found' };

  var ids = sheet.getRange(2, idColIdx + 1, lastRow - 1, 1).getValues();

  for (var i = 0; i < ids.length; i++) {
    if (ids[i][0].toString().trim() === productId.toString().trim()) {
      var rowNum = i + 2;
      var currentRow = sheet.getRange(rowNum, 1, 1, headers.length).getValues()[0];

      var updatedRow = headers.map(function(h, ci) {
        var fieldName = headerToField(h);
        if (fieldName && productData[fieldName] !== undefined) {
          if (fieldName === 'images' && Array.isArray(productData[fieldName])) {
            return productData[fieldName].join(', ');
          }
          if (fieldName === 'customSpecifications' && typeof productData[fieldName] === 'object') {
            return JSON.stringify(productData[fieldName]);
          }
          return productData[fieldName];
        }
        return currentRow[ci];
      });

      sheet.getRange(rowNum, 1, 1, headers.length).setValues([updatedRow]);
      return { success: true, message: 'Product updated successfully' };
    }
  }
  return { error: 'Product not found: ' + productId };
}

function deleteProduct(productId) {
  if (!productId) return { error: 'productId is required' };

  var sheet = getProductSheet();
  var headers = getHeaders(sheet);
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { error: 'No products to delete' };

  var find = colIdx(headers);
  var idColIdx = find('id', 'product id', 'productid');
  if (idColIdx < 0) return { error: 'ID column not found' };

  var ids = sheet.getRange(2, idColIdx + 1, lastRow - 1, 1).getValues();

  for (var i = 0; i < ids.length; i++) {
    if (ids[i][0].toString().trim() === productId.toString().trim()) {
      sheet.deleteRow(i + 2);
      return { success: true, message: 'Product deleted successfully' };
    }
  }
  return { error: 'Product not found: ' + productId };
}

function sortProducts(products, sortBy) {
  if (!sortBy || sortBy === 'featured') return products;

  switch (sortBy) {
    case 'price-low-high':
    case 'price_low_high':
      return products.sort(function(a, b) { return (a.price || 0) - (b.price || 0); });
    case 'price-high-low':
    case 'price_high_low':
      return products.sort(function(a, b) { return (b.price || 0) - (a.price || 0); });
    case 'name':
    case 'alphabetical':
      return products.sort(function(a, b) { return (a.name || '').localeCompare(b.name || ''); });
    case 'newest':
    case 'latest':
      return products.sort(function(a, b) {
        var nA = parseInt((a.id || '').replace(/\D/g, '')) || 0;
        var nB = parseInt((b.id || '').replace(/\D/g, '')) || 0;
        return nB - nA;
      });
    case 'category':
      return products.sort(function(a, b) { return (a.category || '').localeCompare(b.category || ''); });
    default:
      return products;
  }
}

function fixSheet() {
  var sheet = getProductSheet();
  var expectedHeaders = ['ID', 'Name', 'Description', 'Price', 'MRP',
    'Image', 'Images', 'Category', 'Details', 'CustomSpecifications', 'Slug'];

  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    return { success: true, message: 'Headers added to empty sheet' };
  }

  var currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
    .map(function(h) { return h.toString().trim(); });

  return { success: true, message: 'Sheet checked', headers: currentHeaders };
}

function headerToField(header) {
  var map = {
    'id': 'id', 'product id': 'id', 'productid': 'id',
    'name': 'name', 'product name': 'name', 'productname': 'name',
    'description': 'description', 'desc': 'description',
    'price': 'price',
    'mrp': 'mrp', 'original price': 'mrp',
    'image': 'image', 'main image': 'image', 'mainimage': 'image', 'image url': 'image',
    'images': 'images', 'extra images': 'images', 'additional images': 'images',
    'category': 'category', 'cat': 'category',
    'details': 'details', 'additional details': 'details',
    'customspecifications': 'customSpecifications', 'custom specifications': 'customSpecifications',
    'custom specifications (json)': 'customSpecifications',
    'specifications': 'customSpecifications', 'specs': 'customSpecifications',
    'custom_specifications': 'customSpecifications',
    'slug': 'slug', 'url slug': 'slug'
  };
  return map[header.toLowerCase()] || null;
}

function mapFieldToValue(header, productData, newId) {
  var h = header.toLowerCase();
  if (['id', 'product id', 'productid'].indexOf(h) >= 0) return newId;
  if (['name', 'product name', 'productname'].indexOf(h) >= 0) return productData.name || '';
  if (['description', 'desc'].indexOf(h) >= 0) return productData.description || '';
  if (h === 'price') return productData.price || '';
  if (['mrp', 'original price'].indexOf(h) >= 0) return productData.mrp || '';
  if (['image', 'main image', 'mainimage', 'image url'].indexOf(h) >= 0) return productData.image || '';
  if (['images', 'extra images', 'additional images'].indexOf(h) >= 0) {
    return Array.isArray(productData.images) ? productData.images.join(', ') : (productData.images || '');
  }
  if (['category', 'cat'].indexOf(h) >= 0) return productData.category || '';
  if (['details', 'additional details'].indexOf(h) >= 0) return productData.details || '';
  if (['customspecifications', 'custom specifications', 'custom specifications (json)', 'specifications', 'specs', 'custom_specifications'].indexOf(h) >= 0) {
    return typeof productData.customSpecifications === 'object'
      ? JSON.stringify(productData.customSpecifications)
      : (productData.customSpecifications || '');
  }
  if (['slug', 'url slug'].indexOf(h) >= 0) return productData.slug || '';
  return '';
}

