import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// 各ページのコンポーネントを作成
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import InvoceIndex from "./InvoiceIndex";
import DownloadPdf from "./DownloadPdf";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/invoce-index">InvoiceIndex</a>
            </li>
            <li>
              <a href="/download-pdf">DownloadPdf</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} /> {/* 修正ポイント */}
          <Route path="/invoce-index" element={<InvoceIndex />} />
          <Route path="/download-pdf" element={<DownloadPdf />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
