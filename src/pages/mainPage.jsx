import TransactionTable from "../components/transactionTable";

function MainPage() {
  return (
    <>
      <p className="text-center mb-3 mt-4 display-5 text-center fw-semibold">
        SHM Cashier
      </p>
      <div className="container pt-3 justify-content-center align-content-center align-items-center col-lg-10 col-md-12 col-sm-12">
        <TransactionTable />
      </div>
    </>
  );
}

export default MainPage;
