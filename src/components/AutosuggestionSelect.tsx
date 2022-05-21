import { useState, useEffect } from "react";

import { useToggle } from "../hooks/useToggle";
import { useInput } from "../hooks/useInput";
import { getRate, getHeaderRate } from "../api/api";
import Header from "./Header";
import { Select } from "./Select";

export function AutosuggestionSelect() {
  const [headerData, setHeaderData] = useState([]);
  const [isActiveFrom, toggleFrom] = useToggle();
  const [isActiveTo, toggleTo] = useToggle();
  const initialData = [
    { item: "", rate: 0 },
    { item: "", rate: 0 },
  ];
  const [rateData, setInput] = useInput(initialData);
  const [rateFrom, setInputRateFrom] = useState(0);
  const [rateTo, setInputRateTo] = useState(0);

  const currencies = ["uah", "eur", "usd"];

  const handleClickEvent = async (
    item: string,
    position: number,
    toggleFn: any,
    setInputFn: any
  ) => {
    const opposite = position === 0 ? 1 : 0;
    const isFirstFrom = !rateData[position].item;
    const isFirstTo = !rateData[opposite].item;
    rateData[position].item = item;
    // 1. приходит первый раз

    // const { item: oppositeItem, rate: oppositeRate } = rateData[opposite];
    // const positionItem = oppositeItem === "" ? item : oppositeItem;
    // let { data: rate } = await getRate(item, positionItem);
    // const positionRate = oppositeRate === 0 ? 1 : oppositeRate;
    // if (oppositeItem !== "") {
    //   rateData[opposite].rate = rate * (oppositeRate === 0 ? 1 : oppositeRate);
    //   setInputFn(rate * (oppositeRate === 0 ? 1 : oppositeRate));
    // } else {
    //   rateData[position].rate = 1;
    // }
    setInput(rateData);
    toggleFn();
  };

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
  }, [setHeaderData]);

  return (
    <div className='wrapper center'>
      <Header headerData={headerData} />
      <div className='container'>
        <Select
          selectData={rateData}
          position={0}
          isActive={isActiveFrom}
          handleClickEvent={handleClickEvent}
          toggle={toggleFrom}
          setInputRate={setInputRateFrom}
          rate={rateFrom}
        />
        <Select
          selectData={rateData}
          position={1}
          isActive={isActiveTo}
          handleClickEvent={handleClickEvent}
          toggle={toggleTo}
          setInputRate={setInputRateTo}
          rate={rateTo}
        />
      </div>
    </div>
  );
}
