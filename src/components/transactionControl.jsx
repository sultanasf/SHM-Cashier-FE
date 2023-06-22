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

  const customBoxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";

  return (
    <>
      <div className="row mb-2">
        <div className="col-5 d-flex">
          <div className="dropdown d-flex">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ boxShadow: customBoxShadow }}
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
                className="form-control ms-1"
                type="search"
                placeholder={placeholder}
                aria-label="Search"
                value={searchTerm}
                onChange={onSearchTermChange}
                style={{ boxShadow: customBoxShadow }}
              />
            </form>
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={onSearch}
              style={{ boxShadow: customBoxShadow }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-7 d-flex">
          <div className="ms-auto">
            <a
              href="#"
              className="btn btn-primary"
              style={{ boxShadow: customBoxShadow }}
            >
              + Tambah
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionControl;
