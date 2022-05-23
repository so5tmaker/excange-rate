import { useState, useEffect } from "react";
import { getHeaderRate } from "../api/api";
import Header from "./Header";
import { Selects } from "./Selects";

export function Main() {
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    const fetchHeaderRate = async () => {
      try {
        const response = await getHeaderRate();
        setHeaderData(response);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchHeaderRate();
  }, []);

  return (
    <div className='wrapper center'>
      <Header headerData={headerData} />
      <Selects />
    </div>
  );
}
