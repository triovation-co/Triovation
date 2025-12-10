import { useState } from "react";

export default function CatalogueViewer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const pdfFile = "/catalogue.pdf";

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Catalogue</h1>
        <p className="text-gray-600">Browse our complete collection</p>
      </div>

      {/* Download Button - Always visible */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-end">
          <a
            href={pdfFile}
            download="Triovation-Catalogue.pdf"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Catalogue
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden relative" style={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}>
          
          {/* Loading State */}
          {loading && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading catalogue...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center p-8 max-w-md">
                <svg className="w-20 h-20 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Unable to Display PDF</h3>
                <p className="text-gray-600 mb-6">Your browser may not support inline PDF viewing. Please download the catalogue to view it.</p>
                <a 
                  href={pdfFile} 
                  download="Triovation-Catalogue.pdf"
                  className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg"
                >
                  Download Catalogue
                </a>
              </div>
            </div>
          )}

          {/* PDF Iframe */}
          <iframe
            src={`${pdfFile}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full border-0"
            title="Product Catalogue"
            onLoad={handleLoad}
            onError={handleError}
            style={{ display: error ? 'none' : 'block' }}
          />
        </div>

        {/* Browser Compatibility Note */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Having trouble viewing? <a href={pdfFile} download className="text-blue-500 hover:text-blue-700 underline">Download the PDF</a> to view on your device.</p>
        </div>
      </div>
    </div>
  );
}