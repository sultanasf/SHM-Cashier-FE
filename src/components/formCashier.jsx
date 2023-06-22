import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormCashier() {
  const [tanggal, setTanggal] = useState("");
  const [jenisMobil, setJenisMobil] = useState("");
  const [platNomor, setPlatNomor] = useState("");
  const [statusSelesai, setStatusSelesai] = useState("Belum");
  const [statusPembayaran, setStatusPembayaran] = useState("Belum");
  const [detailKerusakanData, setDetailKerusakanData] = useState([
    { jenisKerusakan: "", hargaPerbaikan: "" },
  ]);

  const navigate = useNavigate();

  const handleTambahDetailKerusakan = () => {
    setDetailKerusakanData([
      ...detailKerusakanData,
      { jenisKerusakan: "", hargaPerbaikan: "" },
    ]);
  };

  const handleJenisKerusakanChange = (index, value) => {
    const updatedData = [...detailKerusakanData];
    updatedData[index].jenisKerusakan = value;
    setDetailKerusakanData(updatedData);
  };

  const handleHargaPerbaikanChange = (index, value) => {
    const updatedData = [...detailKerusakanData];
    updatedData[index].hargaPerbaikan = value;
    setDetailKerusakanData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      tanggal,
      jenisMobil,
      platNomor,
      statusSelesai,
      statusPembayaran,
      detailKerusakanData: detailKerusakanData.map((detail) => ({
        jenisKerusakan: detail.jenisKerusakan,
        hargaPerbaikan: parseFloat(detail.hargaPerbaikan),
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/shm-cashier/",
        requestBody
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-light py-1 px-5 mt-4 mb-4 shadow-lg rounded-4"
      >
        <p className="display-6 text-center mb-3 mt-1">Data Layanan</p>
        <div className="row mb-3">
          <div className="col-6">
            <label className="form-label">Jenis Mobil:</label>
            <input
              type="text"
              className="form-control"
              value={jenisMobil}
              onChange={(e) => setJenisMobil(e.target.value)}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label">Plat Nomor:</label>
            <input
              type="text"
              className="form-control"
              value={platNomor}
              onChange={(e) => setPlatNomor(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label className="form-label">Tanggal:</label>
            <input
              type="date"
              className="form-control"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>
          <div className="col-3">
            <label className="form-label">Status Selesai:</label>
            <div>
              <div className="form-check form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Selesai"
                  checked={statusSelesai === "Selesai"}
                  onChange={() => setStatusSelesai("Selesai")}
                />
                <label className="form-check-label">Selesai</label>
              </div>
              <div className="form-check form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Belum"
                  checked={statusSelesai === "Belum"}
                  onChange={() => setStatusSelesai("Belum")}
                />
                <label className="form-check-label">Belum</label>
              </div>
            </div>
          </div>
          <div className="col-3">
            <label className="form-label">Status Pembayaran:</label>
            <div>
              <div className="form-check form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Lunas"
                  checked={statusPembayaran === "Lunas"}
                  onChange={() => setStatusPembayaran("Lunas")}
                />
                <label className="form-check-label">Lunas</label>
              </div>
              <div className="form-check form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Belum"
                  checked={statusPembayaran === "Belum"}
                  onChange={() => setStatusPembayaran("Belum")}
                />
                <label className="form-check-label">Belum</label>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Detail Layanan:</label>
          {detailKerusakanData.map((detail, index) => (
            <div className="row mb-2" key={index}>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Jenis Layanan"
                  value={detail.jenisKerusakan}
                  onChange={(e) =>
                    handleJenisKerusakanChange(index, e.target.value)
                  }
                  required
                />
              </div>
              <div className="col-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Harga"
                  value={detail.hargaPerbaikan}
                  onChange={(e) =>
                    handleHargaPerbaikanChange(index, e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary mx-auto d-flex px-5"
            onClick={handleTambahDetailKerusakan}
          >
            + Tambah Layanan
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-outline-success d-flex mx-auto px-4 mb-3"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default FormCashier;
