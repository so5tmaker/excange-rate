import React from "react";

function Header({ headerData }: { headerData: any }) {
  const divRates =
    headerData.length === 0 ? (
      <div className='select'>Завантаження курсів...</div>
    ) : (
      <>
        <div className='select'>{`USD ${headerData[0]}`}</div>
        <div className='select'>{`EUR ${headerData[1]}`}</div>
      </>
    );

  return (
    <>
      <h2>Українська гривня</h2>
      <div className='header'>{divRates}</div>
    </>
  );
}

export default Header;
