import React from "react";
function PdfViewer() {
  return (
    <iframe
      src="http://127.0.0.1:8000/invoice/api/generate-filled-pdf/"
      width="100%"
      height="600px"
      title="PDF Viewer"
    />
  );
}

export default PdfViewer;
