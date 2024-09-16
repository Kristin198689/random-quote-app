// src/components/Quote.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomQuote } from "../features/quote/quoteSlice";
import styles from "../styles/Quote.module.css";

const Quote = () => {
  const dispatch = useDispatch();
  const { content, author, status, error } = useSelector(
    (state) => state.quote
  );

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const handleNewQuote = () => {
    dispatch(fetchRandomQuote());
  };

  let contentElement;

  if (status === "loading") {
    contentElement = <p className={styles.loading}>Загрузка...</p>;
  } else if (status === "succeeded") {
    contentElement = (
      <>
        <p className={styles.quoteContent}>"{content}"</p>
        <p className={styles.quoteAuthor}>- {author}</p>
      </>
    );
  } else if (status === "failed") {
    contentElement = <p className={styles.error}>Ошибка: {error}</p>;
  }

  return (
    <div className={styles.quoteContainer}>
      {contentElement}
      <button onClick={handleNewQuote} className={styles.newQuoteButton}>
        Новая цитата
      </button>
    </div>
  );
};

export default Quote;
