import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import YearMonthForm from "./components/YearMonthForm";
import DownloadPdf from "./DownloadPdf";
function App() {
  const [companies, setCompanies] = useState([]);
  const [yearMonth, setYearMonth] = useState("2024-02");
  const [errorMessage, setErrorMessage] = useState("");
  // 子コンポーネントからデータを受け取る関数
  const handleYearMonthSubmit = (data) => {
    console.log(
      "受け取ったデータ:",
      data.year_month,
      "受け取った会社:",
      data.company_lists
    );
    setYearMonth(data.year_month || ""); // 状態を更新
    setCompanies(data.company_lists || []);
    setErrorMessage(data.error_message);
  };
  useEffect(() => {
    console.log("更新されたcompanies:", companies);
  }, [companies]);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* <h1>{data ? data : "Loading..."}</h1> */}
      {/* <h1>{campanies ? campanies : "Loading..."}</h1> */}
      <YearMonthForm onSubmit={handleYearMonthSubmit} />
      <p>{yearMonth ? "選択された年月" + yearMonth : "Loading..."}</p>
      {/* <p>{JSON.stringify(companies)}</p> */}
      {/* companiesが配列かどうか確認してからmapを実行 */}
      {/* {Array.isArray(companies) && companies.length > 0 ? (
        <ul>
          {companies.map((company) => (
            // もしcompanyがオブジェクトならプロパティにアクセスする
            <li key={company.c_id}>{company.c_name}</li>
          ))}
        </ul>
      ) : (
        <>
          <p>{errorMessage}</p>
        </>
      )} */}
      <p>請求書を作成する企業を選択して下さい</p>
      <DownloadPdf companies={companies} year_month={yearMonth} />
    </>
  );
}

export default App;
