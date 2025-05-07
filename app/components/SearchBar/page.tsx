"use client";

import React, { useState, useEffect } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import "./searchBar.css";

type Book = {
  id: string;
  title: string;
  author: string;
  imageLink?: string;
};

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Book[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchTerm}`
        )
          .then((res) => res.json())
          .then((data) => {
            setResults(data);
          })
          .catch((err) => {
            console.error("Search error:", err);
            setResults([]);
          });
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div id="__next">
      <div className="wrapper">
        <div className="search__background">
          <div className="search__wrapper">
            <figure><img src="logo" alt="" /></figure>
            <div className="search__content">
              <div className="search">
                <div className="search__input--wrapper">
                  <input
                    className="search__input"
                    placeholder="Search for books by title or author"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="search__icon" onClick={() => setSearchTerm("")}>
                    {searchTerm.trim() ? (
                      <IoMdClose /> 
                    ) : (
                      <HiMiniMagnifyingGlass /> 
                    )}
                  </div>
                </div>
              </div>
            </div>
            {searchTerm.trim() && (
              <div className="search__books--wrapper">
                {results.length > 0 ? (
                  results.map((book) => (
                    <div key={book.id} className="search__book">
                      <Link className="search__book--link" href={`/book/${book.id}`}>
                        <figure
                          className="book__image--wrapper"
                          style={{
                            height: "80px",
                            width: "80px",
                            minWidth: "80px",
                          }}
                        >
                          <img
                            className="book__image"
                            src={book.imageLink || "/assets/default-book.png"}
                            alt={book.title || "Book Image"}
                          />
                        </figure>
                        <div>
                          <div className="search__book--title">{book.title}</div>
                          <div className="search__book--author">{book.author}</div>
                          <div className="search__book--duration">
                            <div className="recommended__book--details">
                              <div className="recommended__book--details-icon">
                                <svg 
                                className="search__delete--icon" 
                                stroke="currentColor" 
                                fill="currentColor" 
                                strokeWidth="0" 
                                viewBox="0 0 24 24" 
                                height="1em"
                                width="1em" 
                                xmlns="http://www.w3.org/2000/svg">…
                                </svg>
                              </div>
                              <div className="recommended__book--details-text">
                                04:52
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No books found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}