import React, { useEffect, useState } from "react";
function DownloadPdf({ companies, year_month }) {
  const [formData, setFormData] = useState({
    year_month: year_month,
    companies: [],
  });
  const [shouldSubmit, setSouldSubmit] = useState(false);
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // チェックボックスの状態を管理するstate
  const [checkedItems, setCheckedItems] = useState({});
  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // チェックの状態を反転
    }));
  };
  //フォームをポストした時の処理
  const handleDownload = async (e) => {
    e.preventDefault();
    console.log("handleDownload");
    console.log("チェックボックスで選択されたリスト", checkedItems);
    const selectedItems = Object.keys(checkedItems).filter(
      //チェックボックスでチェックされたアイテムのリストを取得
      (key) => checkedItems[key]
    );
    console.log("選択された項目のID:", selectedItems);
    setFormData((prev) => ({
      ...prev,
      companies: selectedItems,
    }));
    // setFormData({
    //   //formDataの企業IDのリストを更新
    //   ...formData,
    //   companies: selectedItems,
    // });
    console.log("formDataはこの段階では更新されていない", formData);
    setSouldSubmit(true); //送信フラグをたてる
  };

  useEffect(() => {
    if (shouldSubmit) {
      const submitForm = async () => {
        console.log("formData 更新後の送信:", formData);
        const response = await fetch(
          "http://127.0.0.1:8000/invoice/api/generate-filled-pdf/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          console.log("ok");
        } else {
          console.log("not ok");
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        console.log(a.href);
        a.download = "filled_template.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // メモリ解放
        window.URL.revokeObjectURL(url);
        setSouldSubmit(false); //送信フラグリセット
      };
      submitForm();
    }
  }, [formData, shouldSubmit]);

  return (
    <form onSubmit={handleDownload}>
      <h3>
        選択された年月:{year_month ? year_month : "まだ選択されていません"}
      </h3>
      {/* <div>
        <label>data:</label>
        <input
          type="text"
          name="data"
          value={formData.data}
          onChange={handleChange}
        />
      </div> */}
      <ul>
        {companies.map((company) => (
          <li list-style="none">
            <label key={company.c_id}>
              <input
                type="checkbox"
                checked={checkedItems[company.c_id] || false}
                onChange={() => handleCheckboxChange(company.c_id)}
              />
              {company.c_name}
            </label>
          </li>
        ))}
      </ul>
      <button type="submit">PDF をダウンロード</button>
    </form>
  );
  // <button onClick={handleDownload}>PDF をダウンロード</button>);
}

export default DownloadPdf;
