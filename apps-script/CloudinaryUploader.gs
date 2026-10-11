/**
 * =======================================================================
 * TRIOVATION - CLOUDINARY PRODUCT IMAGE UPLOADER (ADD-ON)
 * =======================================================================
 * 
 * 💡 SAFE TO ADD: Standalone file.
 * In Google Apps Script:
 * 1. Open CloudinaryUploader.gs (or bottom of Code.gs)
 * 2. Paste this code.
 * (Your existing Code.gs is 100% untouched and safe!)
 * 
 * ⚠️ FIX APPLIED: Changed getUserProperties() → getDocumentProperties()
 *    so credentials are shared across ALL editors, not per-user.
 */

// 1. Menu Builder
function onOpen() {
  addTriovationMenu();
}

function addTriovationMenu() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('Triovation')
      .addItem('📸 Upload Image to Cloudinary', 'showCloudinarySidebar')
      .addToUi();
  } catch (e) {}
}

// 2. Opens the Cloudinary Uploader sidebar in Google Sheets
function showCloudinarySidebar() {
  var html = HtmlService.createHtmlOutputFromFile('CloudinarySidebar')
    .setTitle('Triovation Cloudinary Uploader')
    .setWidth(360);
  SpreadsheetApp.getUi().showSidebar(html);
}

// 3. Fast, reliable row info detector
function getActiveProductInfo() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var activeCell = sheet.getActiveCell();
    var row = activeCell ? activeCell.getRow() : 2;

    if (row <= 1) {
      row = 2; // Default to first product row if on header
    }

    // Direct read from Columns A, B, F, G (Triovation Sheet structure)
    // Col 1 = A (id), Col 2 = B (name), Col 6 = F (image), Col 7 = G (images)
    var rowData = sheet.getRange(row, 1, 1, 7).getValues()[0];
    var id = (rowData[0] || '').toString();
    var name = (rowData[1] || '').toString();
    var mainImage = (rowData[5] || '').toString();
    var galleryImages = (rowData[6] || '').toString();

    if (!id && !name) {
      id = 'Row ' + row;
    }

    return {
      isValidRow: true,
      row: row,
      sheetName: sheet.getName(),
      id: id || ('Row ' + row),
      name: name || '',
      mainImage: mainImage || '',
      galleryImages: galleryImages || '',
      activeCellA1: activeCell ? activeCell.getA1Notation() : ('F' + row)
    };
  } catch (err) {
    return {
      isValidRow: true,
      row: 2,
      sheetName: 'Sheet1',
      id: 'Row 2',
      name: '',
      message: err.message
    };
  }
}

// 4. Writes multiple uploaded Cloudinary URLs into the spreadsheet
function saveImageUrls(urls, targetMode, targetRow) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var row = targetRow ? parseInt(targetRow, 10) : (sheet.getActiveCell() ? sheet.getActiveCell().getRow() : 2);

    if (isNaN(row) || row <= 1) {
      throw new Error('Please select a valid product row number (row 2 or above).');
    }

    if (!urls || urls.length === 0) {
      throw new Error('No image URLs to save.');
    }

    // Triovation standard columns:
    // Column F = 6 = Main Image
    // Column G = 7 = Gallery Images
    var targetCol = 6;
    var colName = 'Column F (image)';

    try {
      var headers = sheet.getRange(1, 1, 1, 10).getValues()[0].map(function(h) {
        return (h || '').toString().trim().toLowerCase();
      });

      if (targetMode === 'main') {
        var imgIdx = headers.indexOf('image');
        targetCol = imgIdx !== -1 ? (imgIdx + 1) : 6;
        colName = 'image (Col ' + targetCol + ')';
      } else if (targetMode === 'gallery') {
        var imgsIdx = headers.indexOf('images');
        targetCol = imgsIdx !== -1 ? (imgsIdx + 1) : 7;
        colName = 'images (Col ' + targetCol + ')';
      }
    } catch (e) {
      targetCol = targetMode === 'gallery' ? 7 : 6;
    }

    var targetCell = sheet.getRange(row, targetCol);

    if (targetMode === 'gallery') {
      var existingVal = (targetCell.getValue() || '').toString().trim();
      var cleanList = [];

      // Extract existing URLs cleanly (removes any stray brackets [ ] or quotes)
      if (existingVal) {
        var existingMatches = existingVal.match(/https?:\/\/[^\s,'"]+/g);
        if (existingMatches) {
          cleanList = existingMatches;
        }
      }

      // Append new URLs (avoiding duplicates)
      for (var i = 0; i < urls.length; i++) {
        var cleanUrl = (urls[i] || '').trim();
        if (cleanUrl && cleanList.indexOf(cleanUrl) === -1) {
          cleanList.push(cleanUrl);
        }
      }

      // Write clean comma-separated URLs:
      // Google Sheets and Excel recognize each https:// link as a clickable hyperlink!
      targetCell.setValue(cleanList.join(', '));

    } else {
      // Main image: clean single URL
      var mainUrl = (urls[0] || '').trim();
      targetCell.setValue(mainUrl);
    }

    return {
      success: true,
      row: row,
      column: targetCol,
      columnName: colName,
      cellA1: targetCell.getA1Notation(),
      count: urls.length,
      urls: urls
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

// Single URL backward compatibility
function saveImageUrl(url, targetMode, targetRow) {
  return saveImageUrls([url], targetMode, targetRow);
}

// ═══════════════════════════════════════════════════════
// 5. Cloudinary config storage
// ⚠️ FIX: Uses getDocumentProperties() instead of getUserProperties()
//    so ALL editors share the same credentials.
// ═══════════════════════════════════════════════════════

function getCloudinaryConfig() {
  try {
    // ✅ FIX: DocumentProperties = shared across all editors of this spreadsheet
    var props = PropertiesService.getDocumentProperties();
    return {
      cloudName: props.getProperty('trio_cloud_name') || 'dze9kd1fl',
      uploadPreset: props.getProperty('trio_upload_preset') || 'triovation_products',
      folder: props.getProperty('trio_folder') || 'triovation/products'
    };
  } catch (e) {
    return {
      cloudName: 'dze9kd1fl',
      uploadPreset: 'triovation_products',
      folder: 'triovation/products'
    };
  }
}

function saveCloudinaryConfig(cloudName, uploadPreset, folder) {
  try {
    // ✅ FIX: DocumentProperties = shared across all editors of this spreadsheet
    var props = PropertiesService.getDocumentProperties();
    props.setProperties({
      'trio_cloud_name': cloudName || 'dze9kd1fl',
      'trio_upload_preset': uploadPreset || '',
      'trio_folder': folder || 'triovation/products'
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
