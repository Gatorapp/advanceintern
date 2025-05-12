"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Recomended from "../components/Recomended/page";
import Suggested from "../components/Suggested/page";
import "../for-you/for-you.css";
import { FaPlayCircle } from "react-icons/fa";
import Sidebar from "../components/SideBar/page";
import "../components/SearchBar/searchbar.css";
import SearchBar from "../components/SearchBar/page";

export default function Page() {

  interface Book {
    audioLength: string;
    id: number;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRatings: number;
    averageRating: number;
    keyIdeas: number;
    type: string;
    status: string;
    subscriptionRequired: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
}

const [books, setBooks] = useState<Book[]>([]);



useEffect(() => {
    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected")
        .then((response) => response.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error("Error fetching books:", error));
}, []);
return (
  <div id="__next">
  <div className="wrapper">
    <div className="sidebar__overlay sidebar__overlay--hidden" ></div>
    <div className="sidebar sidebar--closed">
      <Sidebar />
    </div>
    <SearchBar />
    <div className="row">
      <div className="container">                 
        <div className="for-you__wrapper">
                      <h1 className="for-you__title">Selected just for you</h1>                      
                          {books.map((book, index) => (
                              <div key={index} className="selected__book">
                                  <div className="selected__book--sub-title">
                                      {book.subTitle}
                                  </div>
                                  <div className="selected__book--line"></div>
                                  <div className="selected__book--content">                                      
                                          <figure className="book__image--wrapper">
                                              <img className="book__image" src={book.imageLink} alt={book.title} />
                                          </figure>
                                          <div className="selected__book--text">
                                            <div className="selected__book--title">
                                              <h4>{book.title}</h4>
                                            </div>
                                            <div className="selected__book--author">
                                              {book.author} 
                                            </div>
                                              <div className="selected__book--duration-wrapper">
                                               <div className="selected__book--icon">
                                               <FaPlayCircle  />
                                               </div>   
                                               <div className="selected__book--duration">3 mins 23 secs</div>
                                              </div>                                                  
                                          </div>                                      
                                  </div>
                              </div>
                          ))}                      
                  </div>
                  <div>  
                    <Recomended />                      
                  </div>
                  <div>                     
                    <Suggested />                      
                  </div>
              </div>
          </div>
      </div>
  </div>

);
}