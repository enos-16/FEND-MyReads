import React from "react";
// import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";
import * as BooksUtils from "./BooksUtils";
import "./App.css";
import BookCase from "./components/BookCase";

class App extends React.Component {
  state = {
    /*
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  componentDidMount = () => {
    if (this.state.newBook) {
      this.refreshAllBooks();
    }
  };

  refreshAllBooks = () => {
    // Get the books currently on the shelves and update the state with the returned, sorted list
    BooksAPI.getAll().then(list => {
      this.setState({
        books: BooksUtils.sortAllBooks(list),
        newBook: false
      });
    });
  };

  changeShelf = (book, shelf) => {
    // Make the call to the service to update the shelf for the selected book to the new shelf
    BooksAPI.update(book, shelf).then(response => {
      // Update the state of the book. Start with a copy of the list of books
      let newList = this.state.books.slice(0);

      // Look for the book in the list. It may not be there
      const books = newList.filter(listBook => listBook.id === book.id);
      if (books.length) {
        // Update thebook that's already on the shelf
        books[0].shelf = shelf;
      } else {
        // Add the book to the shelf and sort the list of books again
        newList.push(book);
        newList = BooksUtils.sortAllBooks(newList);
      }
      // Update the state of the newList
      this.setState({ books: newList });
    });
  };

  render() {
    return (
      <BookCase
        books={this.state.books}
        onRefreshAllBooks={this.refreshAllBooks}
        onChangeShelf={this.changeShelf}
      />
    );
  }
}

export default App;
