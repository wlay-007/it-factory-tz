import React from "react";
import Style from "./SearchHeader.module.scss";

interface Props {
  value: string;
  onChange: (str: string) => void;
  onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSorting: string;
  onSortingChange: (sorting: string) => void;
}

const Header: React.FunctionComponent<Props> = ({
  value,
  onChange,
  onSubmit,
  selectedCategory,
  onCategoryChange,
  selectedSorting,
  onSortingChange,
}) => {
  return (
    <header className={Style.header}>
      <form onSubmit={onSubmit} className={Style.search_input}>
        <input
          type="text"
          placeholder="Поиск книг"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className={Style.custom_select1}>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="art">Art</option>
            <option value="biography">Biography</option>
            <option value="computers">Computers</option>
            <option value="history">History</option>
            <option value="medical">Medical</option>
            <option value="poetry">Poetry</option>
          </select>
        </div>
        <div className={Style.custom_select2}>
          <select
            value={selectedSorting}
            onChange={(e) => onSortingChange(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <button type="submit">
          <svg
            stroke="black"
            fill="black"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
          </svg>
        </button>
      </form>
    </header>
  );
};

export default Header;
