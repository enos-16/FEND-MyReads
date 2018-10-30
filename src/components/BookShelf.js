import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.shelf.books.map(book => (
                <li key={book.id}>
                  <Book book={book} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
