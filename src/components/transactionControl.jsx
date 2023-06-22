import React from "react";

function TransactionControl({
  searchBy,
  searchTerm,
  onSearchByChange,
  onSearchTermChange,
  onSearch,
}) {
  let placeholder = "Search";
  if (searchBy === "jenis_mobil") {
    placeholder = "Jenis Mobil";
  } else if (searchBy === "plat_nomor") {
    placeholder = "Plat Nomor";
  } else if (searchBy === "layanan") {
    placeholder = "Layanan";
  }

  return (
    <>
      <div className="row mb-2">
        <div className="col-4 d-flex">
          <div className="dropdown d-flex">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {placeholder}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  value="jenis_mobil"
                  onClick={onSearchByChange}
                >
                  Jenis Mobil
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  value="plat_nomor"
                  onClick={onSearchByChange}
                >
                  Plat Nomor
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  value="layanan"
                  onClick={onSearchByChange}
                >
                  Layanan
                </button>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder={placeholder}
                aria-label="Search"
                value={searchTerm}
                onChange={onSearchTermChange}
              />
            </form>
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={onSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-8 d-flex">
          <div className="ms-auto">
            <button className="btn btn-danger me-1">+ Hapus</button>
            <button className="btn btn-primary">+ Tambah</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionControl;
