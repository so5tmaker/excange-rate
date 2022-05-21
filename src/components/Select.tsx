import { useInput } from "../hooks/useInput";

export function Select({
  selectData,
  position,
  isActive,
  handleClickEvent,
  toggle,
  setInputRate,
  rate,
}: {
  selectData: any;
  position: number;
  isActive: boolean;
  handleClickEvent: any;
  toggle: any;
  setInputRate: any;
  rate: number;
}) {
  // const [isActive, toggle] = useToggle();
  const [currency, setInput] = useInput("");
  const currencies = ["uah", "eur", "usd"];

  const liNames = currencies.map((item) => {
    let active = "";
    if (currency !== "") {
      active = item.includes(currency) ? " list__item--selected" : "";
    }
    return (
      <li
        key={item}
        className={"list__item" + active}
        onClick={() => handleClickEvent(item, position, toggle, setInputRate)}
      >
        {item}
      </li>
    );
  });

  return (
    <div className='select'>
      <input
        className='input-rate'
        value={rate}
        onChange={(e) => setInputRate(e.target.value)}
        // placeholder='Click to choose...'
        onClick={() => toggle()}
      />
      <div className='options'>
        <input
          value={selectData[position].item}
          className='input'
          onChange={(e) => setInput(e.target.value)}
          placeholder='Click to choose...'
          onClick={() => toggle()}
        />
        {isActive && <ul className='list'>{liNames}</ul>}
      </div>
    </div>
  );
}
