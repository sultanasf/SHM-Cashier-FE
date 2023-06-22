import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionControl from "./transactionControl";

function TransactionTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchBy, setSearchBy] = useState("jenis_mobil");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/shm-cashier");
      setData(response.data.result);
      setFilteredData(response.data.result);
      console.info(response.status);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatCurrencyLayanan = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  const formatCurrencyRupiah = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(amount);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      if (searchBy === "jenis_mobil") {
        return item.detail_transaksi.mobil.jenis_mobil
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else if (searchBy === "plat_nomor") {
        return item.detail_transaksi.mobil.plat_nomor
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else if (searchBy === "layanan") {
        const searchValue = item.detail_transaksi.detail_kerusakan
          .map((detail) => detail.kerusakan.toLowerCase())
          .join(", ");
        return searchValue.includes(searchTerm.toLowerCase());
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const handleStatusSelesaiChange = async (transaksiId, statusSelesai) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/shm-cashier/edit-status",
        {
          transaksiId,
          statusSelesai,
        }
      );
      console.log(response.data);
      const updatedData = data.map((item) => {
        if (item.transaksi_id === transaksiId) {
          return {
            ...item,
            detail_transaksi: {
              ...item.detail_transaksi,
              status_selesai: statusSelesai,
            },
          };
        }
        return item;
      });
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusPembayaranChange = async (
    transaksiId,
    statusPembayaran
  ) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/shm-cashier/edit-status",
        {
          transaksiId,
          statusPembayaran,
        }
      );
      console.log(response.data);
      const updatedData = data.map((item) => {
        if (item.transaksi_id === transaksiId) {
          return {
            ...item,
            detail_transaksi: {
              ...item.detail_transaksi,
              status_pembayaran: statusPembayaran,
            },
          };
        }
        return item;
      });
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TransactionControl
        searchBy={searchBy}
        searchTerm={searchTerm}
        onSearchByChange={handleSearchByChange}
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
      />
      <table className="table table-striped table-bordered border-black table-sm">
        <thead className="text-center">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tanggal</th>
            <th scope="col">Jenis Mobil</th>
            <th scope="col">Plat Nomor</th>
            <th scope="col">Layanan</th>
            <th scope="col">Total Harga</th>
            <th scope="col">Status Selesai</th>
            <th scope="col">Pembayaran</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {filteredData.map((item) => (
            <tr key={item.transaksi_id}>
              <td scope="row">{item.transaksi_id}</td>
              <td>{formatDate(item.detail_transaksi.tanggal)}</td>
              <td>{item.detail_transaksi.mobil.jenis_mobil}</td>
              <td>{item.detail_transaksi.mobil.plat_nomor}</td>
              <td>
                {item.detail_transaksi.detail_kerusakan.map((detail, index) => (
                  <li className="list-group-item" key={index}>
                    {detail.kerusakan} :{" "}
                    {formatCurrencyLayanan(detail.harga_perbaikan)}
                  </li>
                ))}
              </td>
              <td>{formatCurrencyRupiah(item.detail_transaksi.total_harga)}</td>
              <td>
                <select
                  value={item.detail_transaksi.status_selesai}
                  onChange={(e) =>
                    handleStatusSelesaiChange(item.transaksi_id, e.target.value)
                  }
                >
                  <option value="Selesai">Selesai</option>
                  <option value="Belum">Belum</option>
                </select>
              </td>
              <td>
                <select
                  value={item.detail_transaksi.status_pembayaran}
                  onChange={(e) =>
                    handleStatusPembayaranChange(
                      item.transaksi_id,
                      e.target.value
                    )
                  }
                >
                  <option value="Lunas">Lunas</option>
                  <option value="Belum">Belum</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TransactionTable;
