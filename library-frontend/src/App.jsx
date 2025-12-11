import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<BooksList />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="*" element={<BooksList />} />
      </Routes>
    </Router>
  );
}

export default App;
