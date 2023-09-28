import React, { useState, useEffect, useRef } from "react";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import { useAppSelector, useAppDispatch } from "./hook";
import CardGrid from "./components/CardGrid/CardGrid";
import { Spin } from "antd";
import { fetchBooks, updateBooks } from "./store/bookSlice";
import Button from "./components/Button/Button";
import "./App.scss";

function App() {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSorting, setSelectedSorting] = useState("relevance");
  const books = useAppSelector((state) => state.books.list);
  const totalItems = useAppSelector((state) => state.books.totalItems);
  const [text, setText] = useState("");
  const [startIndex, setStartIndex] = useState(1);
  const [maxResults] = useState(30);
  const loading = useAppSelector((state) => state.books.loading);
  const cardGridRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (text.trim() !== "") {
      setStartIndex(1);
      const result = await dispatch(
        fetchBooks({
          startIndex: 1,
          maxResults,
          query: text,
          orderBy: selectedSorting,
          category: selectedCategory,
        })
      );
      if (fetchBooks.fulfilled.match(result)) {
        dispatch(updateBooks(result.payload.items));
      }
    }
  };

  const handleSortingChange = async (sorting: string) => {
    setSelectedSorting(sorting);
    setStartIndex(1);

    const result = await dispatch(
      fetchBooks({
        startIndex: 1,
        maxResults,
        query: text,
        orderBy: sorting,
        category: selectedCategory,
      })
    );

    if (fetchBooks.fulfilled.match(result)) {
      dispatch(updateBooks(result.payload.items));
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);

    const filteredBooks = books.filter((book) =>
      category === "all" ? true : book.volumeInfo.categories?.includes(category)
    );

    await dispatch(updateBooks(filteredBooks));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (text.trim() !== "") {
        setStartIndex(1);
        await dispatch(
          fetchBooks({
            startIndex: 1,
            maxResults,
            query: text,
            orderBy: selectedSorting,
            category: selectedCategory,
          })
        );

        if (cardGridRef.current) {
          (cardGridRef.current as HTMLElement).scrollTop =
            scrollPositionRef.current;
        }
      }
    };

    fetchData();
  }, [selectedSorting]);

  const handleLoadMore = async () => {
    if (text.trim() !== "" && startIndex < totalItems) {
      const newStartIndex = startIndex + maxResults;
      setStartIndex(newStartIndex);

      const currentScrollPosition = window.scrollY;

      await dispatch(
        fetchBooks({
          startIndex: newStartIndex,
          maxResults,
          query: text,
          orderBy: selectedSorting,
          category: selectedCategory,
        })
      );

      window.scrollTo(0, currentScrollPosition);
    }
  };

  return (
    <>
      <SearchHeader
        value={text}
        onChange={setText}
        onSubmit={handleSearchSubmit}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedSorting={selectedSorting}
        onSortingChange={handleSortingChange}
      />
      {loading && (
        <div className="empty-state">
          <Spin size="large" />
        </div>
      )}
      {books.length === 0 && text.trim() === "" && (
        <div className="empty-state">
          <img src="book.svg" alt="Logo" />
          <p>Введите запрос для начала поиска</p>
        </div>
      )}
      {!loading && books.length > 0 && (
        <CardGrid ref={cardGridRef} books={books} totalCount={totalItems} />
      )}
      {books.length > 0 && books.length < totalItems && (
        <div className="button_container">
          <Button onClick={handleLoadMore} />
        </div>
      )}
      {!loading && books.length === 0 && text.trim() !== "" && (
        <div className="empty-state">
          <img src="book.svg" alt="Logo" />
          <p>Ничего не найдено</p>
        </div>
      )}
    </>
  );
}

export default App;
