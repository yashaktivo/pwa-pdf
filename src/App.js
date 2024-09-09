import logo from './logo.svg';
import './App.css';
import dummyPDF from "./dummy-pdf.pdf"

const DownloadLink = () => {
  const downloadFile = () => {
    // Replace with the URL to your PDF
    const pdfUrl = "/path_to_your_pdf/your_file.pdf";
    const fileName = "your_file.pdf";
    
    // Fetch the file and convert it to Blob
    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a link element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;

        // Programmatically click the link to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch(error => console.error("Download failed:", error));
  };

  return (
    <div>
      <button onClick={downloadFile}>Download PDF</button>
    </div>
  );
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Testing to download PDF from PWA
        </p>
        <a
          className="App-link"
          href={dummyPDF}
          target="_blank"
          download={dummyPDF}
          Content-Disposition={dummyPDF}
        >
         Download PDF
        </a>
        <DownloadLink />
      </header>
    </div>
  );
}

export default App;
