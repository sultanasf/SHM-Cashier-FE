import BtnControl from "./components/btnControl";
import TransactionTable from "./components/transactionTable";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import AddPage from "./pages/addPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
