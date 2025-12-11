// import React from "react";
// import BooksList from "./components/BooksList";

// function App() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Library Management System</h1>
//       <BooksList />
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";

function App() {
  return (
    <Router>
      <div>
        <h1>Library Management System</h1>
        <Routes>
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="*" element={<BooksList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
