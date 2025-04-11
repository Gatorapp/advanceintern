"use client";

import Sidebar from '@/app/components/SideBar/page';
import React, { useEffect, useState } from 'react';
import { FaRegClock, FaRegStar } from "react-icons/fa";
import { TbBulb } from "react-icons/tb";
import { MdMicNone } from "react-icons/md";
import { SlBookOpen } from "react-icons/sl";
import './book.css';
import { useRouter } from 'next/navigation';
import { CiBookmark } from 'react-icons/ci';
import { IoBookmark } from "react-icons/io5";
import SearchBar from '@/app/components/SearchBar/page';

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Book = ({ params }: BookPageProps) => {
  const [id, setId] = useState<string | null>(null);
  interface Book {
    id: string; // Added id property
    title: string;
    author: string;
    subTitle: string;
    averageRating: number;
    totalRating: number;
    duration: string;
    type: string;
    keyIdeas: number;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
    imageLink: string;
  }
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedBooks, setSavedBooks] = useState<number[]>([]);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      } catch {
        setError('Failed to resolve params');
      }
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const stored = localStorage.getItem("myLibrary");
    if (stored) {
      const library = JSON.parse(stored);
      setSavedBooks(library.map((b: Book) => b.id));
    }
  }, []);


  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      try {
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!book) {
    return <p>No book details available.</p>;
  }



  const handleAddToLibrary = (book: Book) => {
    if (typeof window === "undefined") return; 
  
    const existing = localStorage.getItem("myLibrary");
    let library: Book[] = existing ? JSON.parse(existing) : [];
  
    if (savedBooks.includes(book.id)) {
      library = library.filter((b) => b.id !== book.id);
      setSavedBooks((prev) => prev.filter((id) => id !== book.id));
    } else {
      library.push(book);
      setSavedBooks((prev) => [...prev, book.id]);
    }
  
    localStorage.setItem("myLibrary", JSON.stringify(library));
  };
  



  return (
    <div id='__next'>
      <div className="wrapper">
        <div className="page__layout">
          <Sidebar />
          <div className="content__wrapper">
            <div className="row">
              <SearchBar />
              <div className="container">
                <div className="inner__wrapper">
                  <div className="inner__book">
                    <div className="inner-book__title">{book.title}</div>
                    <div className="inner-book__author">{book.author}</div>
                    <div className="inner-book__sub--title">{book.subTitle}</div>
                    <div className="inner-book__wrapper">
                      <div className="inner-book__description--wrapper">
                        <div className="inner-book__description">
                          <FaRegStar className="inner-book__icon" />
                          <div className="inner-book__overall--rating">{book.averageRating}</div>
                          <div className="inner-book__total--rating">({book.totalRating} ratings)</div>
                        </div>
                        <div className="inner-book__description">
                          <FaRegClock className='inner-book__icon' />
                          <div className="inner-book__duration">{book.duration}</div>
                        </div>
                        <div className="inner-book__description">
                          <MdMicNone className="inner-book__icon" />
                          <div className="inner-type">{book.type}</div>
                        </div>
                        <div className="inner-book__description">
                          <TbBulb className="inner-book__icon" />
                          <div className="inner-book__key--ideas">{book.keyIdeas} Key Ideas</div>
                        </div>
                      </div>
                    </div>
                    <div className="inner-book__read--btn-wrapper">
                      <button
                        className="inner-book__read--btn"
                        onClick={() => router.push(`/player/${id}`)}
                      >
                        <SlBookOpen className="inner-book__read--icon" />
                        <div className="inner-book__read--text">Read</div>
                      </button>
                      <button
                        className="inner-book__read--btn"
                        onClick={() => router.push(`/player/${id}`)}
                      >
                        <MdMicNone className="inner-book__icon" />
                        <div className="inner-book__read--text">Listen</div>
                      </button>
                    </div>
                      {savedBooks.includes(book.id) ? (
                    <div className="inner-book__bookmark">
                          <IoBookmark className="inner-book__icon"/>
                        <button className="saved-btn" onClick={() => handleAddToLibrary(book)}>
                          <div className="inner-book__bookmark--text">Saved in My Library</div>
                        </button>
                    </div>
                      ) : (
                        <div className="inner-book__bookmark">  
                          <CiBookmark className="inner-book__icon" />
                        <button className="add-to-library-btn" onClick={() => handleAddToLibrary(book)}>
                         <div className="inner-book__bookmark--text">Add to My Library</div> 
                        </button>
                      </div>  
                      )}

                    <h2 className="inner-book__secondary--title">What&apos;s it about?</h2>
                    <div className="inner-book__tags--wrapper">
                      {book.tags.map((tag: string, index: number) => (
                        <div key={index} className="inner-book__tag">{tag}</div>
                      ))}
                    </div>
                    <div className="inner-book__book--description">
                      <p>{book.bookDescription}</p>
                    </div>
                    <h2 className="inner-book__secondary--title">About the Author</h2>
                    <div className="inner-book__author--description">
                      <p>{book.authorDescription}</p>
                    </div>
                  </div>
                  <div className="inner-book--img-wrapper">
                    <figure className="book__image--wrapper">
                      <img className='book__image' src={book.imageLink} alt={book.title} />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;