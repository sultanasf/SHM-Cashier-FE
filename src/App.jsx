import BtnControl from "./components/btnControl";
import TransactionTable from "./components/transactionTable";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

function App() {
  return (
    <>
      <h1 className="text-center py-2">SHM Cashier</h1>
      <div className="container pt-3 justify-content-center align-content-center align-items-center col-lg-10 col-md-12 col-sm-12">
        <TransactionTable />
      </div>
    </>
  );
}

export default App;
