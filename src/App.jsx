import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";
// 各ページのコンポーネントを作成
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import InvoiceIndex from "./InvoiceIndex";
import DownloadPdf from "./DownloadPdf";

function App() {
  return (
    <Router>
      <div>
        <img src="" alt="" srcset="" />
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
              <a href="/">Home</a>
            </li>
            <li>
              <Link to="/about">About</Link>
              <a href="/about">About</a>
            </li>
            <li>
              <Link to="/invoice-index">InvoiceIndex</Link>
            </li>
            <li>
              <Link to="/download-pdf">DownloadPdf</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} /> {/* 修正ポイント */}
          <Route path="/invoice-index" element={<InvoiceIndex />} />
          <Route path="/download-pdf" element={<DownloadPdf />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
