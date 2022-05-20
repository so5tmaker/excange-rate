import React from "react";

function Header({ headerData }: { headerData: any }) {
  console.log(headerData);
  return (
    <div className='wrapper'>
      <div className='select'>{`USD ${headerData[0]}`}</div>
      <div className='select'>{`EUR ${headerData[1]}`}</div>
    </div>
  );
}

export default Header;
