import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
import axios from "axios";

export default function Home() {
  /**
   * ## 設定一個useState來放置圖片的內容 初始值設定為null
   * ## 再設定一個input
   */
  let [picData, setPicData] = useState(null);
  let [input, setInput] = useState("");
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");

  /**
   * ## auth設定的是api的金鑰
   * ## initURL設定的是官方文件中提供的動作的網址
   */
  const auth = "bSJFvJcfXT5dyNpMBPGEbV07ylUpZULPAk1t6UBFftoWX2rYdJimgOoY";
  const initURL = `https://api.pexels.com/v1/curated?page=1&per_page=18`;
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=18`;

  const search = async url => {
    let result = await axios.get(url, {
      headers: { authorization: auth },
    });
    console.log(result);
    setPicData(result.data.photos);
    setPage(1);
    setCurrentSearch(input);
  };

  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=18`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${
        page + 1
      }&per_page=18`;
    }

    let result = await axios.get(newURL, { headers: { authorization: auth } });

    console.log(result);
    setPicData(picData.concat(result.data.photos));
  };

  /**
   * ## 使用useEffect在頁面載入的時候就執行
   * ## 為了讓Home頁面載入的時候就顯示圖片
   */
  useEffect(() => {
    search(initURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {picData &&
          picData.map(d => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
}
