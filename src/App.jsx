import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { DebtorProfile } from "./components/DebtorProfile";
import { UserList } from "./components/UserList";
import {DebtorsProvider} from "./DebtorsContext";

function App() {
  return (
    <DebtorsProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/debtor-profile" element={<DebtorProfile />} />
          <Route path="/user-list" element={<UserList />} />
        </Routes>
      </Router>
    </DebtorsProvider>
  );
}

export default App;
