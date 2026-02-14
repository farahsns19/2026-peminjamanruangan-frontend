import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";

import PeminjamanList from "./pages/PeminjamanList";
import TambahPeminjaman from "./pages/TambahPeminjaman";
import DetailPeminjaman from "./pages/DetailPeminjaman";
import EditPeminjaman from "./pages/EditPeminjaman";
import RiwayatPeminjaman from "./pages/RiwayatPeminjaman";

function App() {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
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
