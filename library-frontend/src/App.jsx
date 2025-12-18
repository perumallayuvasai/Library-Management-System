import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import MembersList from "./components/MembersList";
import AddMember from "./components/AddMember";
import EditMember from "./components/EditMember";
import IssueBook from "./components/IssueBook";
import LoansList from "./components/LoansList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/members" element={<MembersList />} />
        <Route path="/members/add" element={<AddMember />} />
        <Route path="/members/edit/:id" element={<EditMember />} />

        <Route path="/books" element={<BooksList />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />

        <Route path="*" element={<BooksList />} />

        <Route path="/issue" element={<IssueBook />} />
        <Route path="/loans" element={<LoansList />} />
      </Routes>
    </Router>
  );
}

export default App;
