import { useState, useEffect } from "react";

function YearMonthForm({ onSubmit }) {
  const [yearMonth, setYearMonth] = useState("2024-02");
  const [companyLists, setCompanyLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージ用

  const handleSubmit = (event) => {
    //フォーム送信時の処理
    event.preventDefault();
    setErrorMessage(""); // 送信前にエラーメッセージをクリア
    fetch("http://127.0.0.1:8000/invoice/api/send_year_month/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year_month: yearMonth,
      }),
    })
      .then((response) => response.json()) // 帰ってきたレスポンスを処理
      .then((data) => {
        if (data.company_lists) {
          setCompanyLists(data.company_lists); //データのあった企業データを更新
        } else {
          setCompanyLists([]); //データがなかった場合空に
          setErrorMessage("データが存在しませんでした");
        }
        console.log("companyListsが更新される前:", companyLists);
      })
      .catch((error) => {
        console.error("エラー:", error);
        setErrorMessage("データの取得に失敗しました");
      });
  };
  useEffect(() => {
    //companyListsが更新された後にする処理
    console.log("companyListsが更新された後:", companyLists);
    onSubmit({
      year_month: yearMonth,
      company_lists: companyLists,
      error_message: errorMessage,
    });
  }, [companyLists]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        年月を選択:
        <input
          type="month"
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
          required
        />
      </label>
      <button type="submit">送信</button>
    </form>
  );
}

export default YearMonthForm;
