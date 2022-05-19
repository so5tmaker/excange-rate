import React, { useRef, useState, useEffect } from "react";
import cn from "clsx";
import axios from "axios";

import arrow from "../assets/svg/arrow.svg";
import { useToggle } from "../hooks/useToggle";
import { useInput } from "../hooks/useInput";

export function AutosuggestionSelect() {
  const [isActive, toggle] = useToggle();
  const [character, setInput] = useInput("");
  const nameInput = useRef(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${character}`
        );
        setData(response);
      } catch (error: any) {
        console.error(error.message);
      }
      // setLoading(false);
    };

    fetchData();
  }, [setData]);

  const characters = [
    "Baby Wizard",
    "Scroopy Noopers",
    "Running Bird",
    "Gotron",
  ];

  const handleClickEvent = (item: string) => {
    const curInput: any = nameInput.current;
    if (curInput !== null) {
      curInput.value = item;
    }
  };

  // const liNames1 = data.map((item) => {
  //   let active = "";
  //   if (character !== "") {
  //     active = item.includes(character) ? " list__item--selected" : "";
  //   }
  //   return (
  //     <li
  //       key={item}
  //       className={"list__item" + active}
  //       onClick={() => handleClickEvent(item)}
  //     ></li>
  //   );
  // });

  const liNames = characters.map((item) => {
    let active = "";
    if (character !== "") {
      active = item.includes(character) ? " list__item--selected" : "";
    }
    return (
      <li
        key={item}
        className={"list__item" + active}
        onClick={() => handleClickEvent(item)}
      >
        {item}
      </li>
    );
  });

  return (
    <div className='wrapper'>
      <div className='select'>
        <button
          className={cn("trigger", {
            ["trigger--active"]: isActive,
          })}
          onClick={() => toggle()}
        >
          Find Rick & Morty Characters
          <img src={arrow} alt='chevron down icon' className='arrow' />
        </button>
        {isActive && (
          <div className='options'>
            <input
              className='input'
              ref={nameInput}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type to search...'
            />
            <ul className='list'>{liNames}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
