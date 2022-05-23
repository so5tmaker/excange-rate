import { useEffect, useState } from "react";
import { useInput } from "../hooks/useInput";
import { useToggle } from "../hooks/useToggle";
import { getRate } from "../api/api";
import { Select } from "./Select";

export function Selects() {
  const [isActiveFrom, toggleFrom] = useToggle();
  const [isActiveTo, toggleTo] = useToggle();
  const [currencyFrom, setInputFrom] = useInput("");
  const [currencyTo, setInputTo] = useInput("");
  const [rateFrom, setRateFrom] = useInput("");
  const [rateTo, setRateTo] = useInput("");

  const currencies = ["uah", "eur", "usd"];
  const setFns = {
    setCurrencies: [setInputFrom, setInputTo],
    setRates: [setRateFrom, setRateTo],
  };
  const initialRates = {
    currencies: [currencyFrom, currencyTo],
    rates: [rateFrom, rateTo],
  };
  const [dataRates, setDataRates] = useState(initialRates);

  useEffect(() => {
    const locCurrencies = [currencyFrom, currencyTo];
    const localRates = [rateFrom, rateTo];

    setDataRates({
      currencies: locCurrencies,
      rates: localRates,
    });
  }, [currencyFrom, currencyTo, rateFrom, rateTo]);

  const handleClick = async (item: string, position: number, toggleFn: any) => {
    const { setCurrencies, setRates } = setFns;
    const { rates } = dataRates;
    const opposite = position === 0 ? 1 : 0;
    let firstRate: number = Number(rates[position]);
    firstRate = firstRate === 0 ? 1 : firstRate;
    setCurrencies[position](item);
    const localItems = currencies.filter((i) => i !== item);
    let oppositeItem = localItems[opposite];
    setCurrencies[opposite](oppositeItem);
    let { data: rate } = await getRate(item, oppositeItem);
    setRates[position](firstRate);
    setRates[opposite]((rate * firstRate).toFixed(2));
    toggleFn();
  };

  const handleRate = async (currentRate: string, position: number) => {
    const { setRates } = setFns;
    const { currencies: locCurrencies } = dataRates;
    const opposite = position === 0 ? 1 : 0;
    let localRate: number = Number(currentRate);
    localRate = Number.isNaN(localRate) ? 0 : localRate;
    let oppositeItem = locCurrencies[opposite];
    const item = locCurrencies[position];
    oppositeItem = !oppositeItem ? item : oppositeItem;
    let { data: rate } = await getRate(item, oppositeItem);
    setRates[position](localRate);
    setRates[opposite]((rate * localRate).toFixed(2));
  };

  return (
    <div className='container'>
      <Select
        selPosition={0}
        selRate={rateFrom}
        selCurrency={currencyFrom}
        selToggle={toggleFrom}
        selOnClick={handleClick}
        selOnChange={handleRate}
        selIsActive={isActiveFrom}
      />
      <Select
        selPosition={1}
        selRate={rateTo}
        selCurrency={currencyTo}
        selToggle={toggleTo}
        selOnClick={handleClick}
        selOnChange={handleRate}
        selIsActive={isActiveTo}
      />
    </div>
  );
}
