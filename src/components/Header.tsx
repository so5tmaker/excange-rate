import React from "react";

function Header({ headerData }: { headerData: any }) {
  return (
    <>
      <h2>Ukrainian hryvnia</h2>
      <div className='header'>
        <div className='select'>{`USD ${headerData[0]}`}</div>
        <div className='select'>{`EUR ${headerData[1]}`}</div>
      </div>
    </>
  );
}

export default Header;
