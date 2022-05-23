export function Select({
  selPosition,
  selRate,
  selCurrency,
  selToggle,
  selOnClick,
  selOnChange,
  selIsActive,
}: {
  selPosition: number;
  selRate: number;
  selCurrency: string;
  selToggle: any;
  selOnClick: any;
  selOnChange: any;
  selIsActive: boolean;
}) {
  const currencies = ["uah", "eur", "usd"];

  const liNames = (position: number, toggle: any, currency: string) =>
    currencies.map((item) => {
      let active = "";
      if (currency !== "") {
        active = item.includes(currency) ? " list__item--selected" : "";
      }
      return (
        <li
          key={item}
          className={"list__item" + active}
          onClick={() => selOnClick(item, position, toggle)}
        >
          {item}
        </li>
      );
    });

  return (
    <>
      <div className='select currencies'>
        <input
          className='input-rate'
          value={selRate}
          onChange={(e) => selOnChange(e.target.value, selPosition)}
          onClick={() => selToggle(false)}
        />
        <div className='options'>
          <div className='input' onClick={() => selToggle()}>
            {!selCurrency ? "Натисніть, щоб вибрати..." : selCurrency}
          </div>
          {selIsActive && (
            <ul className='list'>
              {liNames(selPosition, selToggle, selCurrency)}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
