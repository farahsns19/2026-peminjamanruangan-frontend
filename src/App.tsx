import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";

import PeminjamanList from "./pages/PeminjamanList";
import TambahPeminjaman from "./pages/TambahPeminjaman";
import DetailPeminjaman from "./pages/DetailPeminjaman";
import EditPeminjaman from "./pages/EditPeminjaman";
import RiwayatPeminjaman from "./pages/RiwayatPeminjaman";

function App() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
        backgroundColor: "rgba(255,255,255,0.63)",
        borderRadius: "18px",
        padding: "30px",
        boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
      }}
    >
      {/* ✅ Navbar tetap di atas */}
      <Navbar />

      {/* ✅ Konten halaman dibungkus card putih */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "30px auto",
          backgroundColor: "rgba(255,255,255,0.92)",
          borderRadius: "18px",
          padding: "30px",
          boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
        }}
      >
        <Routes>
          {/* Home */}
          <Route path="/" element={<PeminjamanList />} />

          {/* Tambah */}
          <Route path="/tambah" element={<TambahPeminjaman />} />

          {/* Riwayat */}
          <Route path="/riwayat" element={<RiwayatPeminjaman />} />

          {/* Detail */}
          <Route path="/detail/:id" element={<DetailPeminjaman />} />

          {/* Edit */}
          <Route path="/edit/:id" element={<EditPeminjaman />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
