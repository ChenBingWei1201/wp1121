"use client";

import React, { ReactHTMLElement, useState } from "react";

import { ClickAwayListener } from "@mui/material";

import "./SearchBar.css";
import { Separator } from "./separator";

type Data = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
};

type SearchBarProps = {
  placeholder: string;
  data: Data[];
};

const SearchBar = ({ placeholder, data }: SearchBarProps) => {
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [wordEntered, setWordEntered] = useState("");
  const [clickAway, setClickAway] = useState(false);
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter: Data[] = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <form className="mx-5 my-5 w-10/12">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-2xl font-medium text-gray-900 dark:text-white"
      >
        搜尋
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <ClickAwayListener onClickAway={() => setClickAway(true)}>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-2xl text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder={placeholder}
            onChange={handleFilter}
            required
            onClick={() => setClickAway(false)}
          />
        </ClickAwayListener>
      </div>
      {filteredData.length != 0 && !clickAway && (
        <div className="dataResult absolute mt-1 h-36 w-9/12 overflow-hidden overflow-y-auto bg-white shadow-xl">
          {filteredData.slice(0, 15).map((value: Data, key) => {
            return (
              <>
                <a
                  className="flex h-14 w-full items-center text-lg decoration-black hover:bg-slate-200 "
                  href={value.link}
                  target="_blank"
                >
                  <p className="ml-5">{value.title} </p>
                </a>
                <Separator />
              </>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
