// src/components/SitemapGenerator.jsx
// Admin component to generate sitemap from Google Sheets
// Add this to your admin panel or create a separate page

import React, { useState } from 'react';
import { generateSitemap, downloadSitemap } from '../utils/generateSitemap';

const SitemapGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [sitemapPreview, setSitemapPreview] = useState('');

  const handleGenerateSitemap = async () => {
    setLoading(true);
    setStatus('Generating sitemap...');
    
    try {
      const sitemap = await generateSitemap();
      setSitemapPreview(sitemap);
      setStatus('✅ Sitemap generated successfully!');
      
      // Automatically download
      downloadSitemap(sitemap);
      
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
      console.error('Error generating sitemap:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sitemapPreview);
    setStatus('📋 Sitemap copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Sitemap Generator
      </h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          This tool generates a sitemap.xml file from your Google Sheets products database.
          Click the button below to generate and download your sitemap.
        </p>
        
        <button
          onClick={handleGenerateSitemap}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '🔄 Generating...' : '🗺️ Generate Sitemap'}
        </button>
      </div>

      {status && (
        <div className={`p-4 rounded-lg mb-4 ${
          status.startsWith('✅') 
            ? 'bg-green-100 text-green-800' 
            : status.startsWith('❌')
            ? 'bg-red-100 text-red-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {status}
        </div>
      )}

      {sitemapPreview && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-700">Preview:</h3>
            <button
              onClick={handleCopyToClipboard}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
            >
              📋 Copy to Clipboard
            </button>
          </div>
          
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto max-h-96 text-xs border border-gray-200">
            {sitemapPreview}
          </pre>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">📝 Next Steps:</h4>
            <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
              <li>Save the downloaded sitemap.xml file</li>
              <li>Upload it to your /public folder</li>
              <li>Deploy your changes</li>
              <li>Submit to Google Search Console at: <code className="bg-yellow-100 px-1">https://www.triovation.com/sitemap.xml</code></li>
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">ℹ️ About Sitemaps</h4>
        <p className="text-sm text-gray-600">
          A sitemap helps search engines discover and index all your pages. 
          Generate a new sitemap whenever you add/remove products or pages.
          For automatic updates, consider setting up a scheduled job to run this weekly.
        </p>
      </div>
    </div>
  );
};

export default SitemapGenerator;