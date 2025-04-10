"use client"

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar/page';
import SearchBar from '../components/SearchBar/page';
import "./my-library.css";

interface Book {
    id: number;
    title: string;
    author: string;
    imageLink: string;
    subTitle: string;
}

export default function Page() {
    const [library, setLibrary] = useState<Book[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("myLibrary");
        if (stored) {
            setLibrary(JSON.parse(stored));
        }
    }, []);
    return (
        <div id="__next">
            <div className="wrapper">
                <SearchBar />
                <div className="sidebar__overlay sidebar_overlay--hidden"></div>
                <Sidebar />
                <div className="row">
                    <div className="container">
                        <div className="for-you__title">Saved Books</div>
                        <div className='for-you__sub--title'>{library.length} {library.length === 1 ? "item" : "items"}</div>
                        {library.length === 0 ? (
                            <p>No books added yet.</p>
                        ) : (
                            <div className='for-you__recommended--books--wrapper'>
                                {library.map((book) => (
                                        <a href={`/book/${book.id}`} key={book.id} className="for-you__recommended--books-link">
                                            <img src={book.imageLink} alt={book.title} width={100} />
                                            <div>
                                                <div className='recommended__book--title'>{book.title}</div>
                                                <div className='recommended__book--author'>{book.author}</div>
                                                <div className='recommended__book--sub-title'>{book.subTitle}</div>
                                            </div>
                                        </a>
                                ))}
                            </div>
                        )}
                        <div className="for-you__title">Finished</div>
                        <div className="for-you__sub--title">"11" " item" "second"</div>
                        <div className="for-you__recommended--books">books that are finished</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
