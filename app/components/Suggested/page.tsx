import React, { useEffect, useState } from 'react';
import { FaClock, FaRegStar } from 'react-icons/fa';
import "../Suggested/suggested.css";

const Suggested = () => {
  interface Book {
    id: string;
    link?: string;
    imageLink: string;
    title: string;
    author: string;
    subTitle: string;
    duration: string;
    averageRating: number;
  }
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section id='suggested'>
      <div className="for-you__title">Suggested Books</div>
        <div className="for-you__sub--title">We think you&#39;ll like these</div>
        <div className="for-you__recommended--books">
        {books.map((book) => (
          <a 
            key={book.id} 
            href={`/book/${book.id}`} 
            className='for-you__recommended--book-link'
          >
            <figure className="book__image--wrapper">
              <img className='book__image' src={book.imageLink} alt={book.title} />
            </figure>
            <div className="recommended__book--title">{book.title}</div>
            <div className="recommended__book--author">{book.author}</div>
            <div className="recommended__book--sub-title">{book.subTitle}</div>
            <div className="recommended__book--details-wrapper">
              <div className="recommended__book--details">
                <div className="recommended__book--details-icon"><FaClock /></div>
                <div className="recommended__book--details-text">{book.duration}</div>
              </div>
              <div className="recommended__book--details">
                <div className="recommended__book--details-icon"><FaRegStar /></div>
                <div className="recommended__book--details-text">{book.averageRating}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Suggested;