import { Routes, Route } from "react-router-dom";

import PeminjamanList from "./pages/PeminjamanList";
import TambahPeminjaman from "./pages/TambahPeminjaman";
import DetailPeminjaman from "./pages/DetailPeminjaman";
import EditPeminjaman from "./pages/EditPeminjaman";


function App() {
  return (
    <div>
      <h1>Sistem Peminjaman Ruangan Kampus</h1>

      <Routes>
        {/* HALAMAN UTAMA */}
        <Route
          path="/"
          element={
            <>
              <TambahPeminjaman />
              <hr />
              <PeminjamanList />
            </>
          }
        />

        {/* HALAMAN DETAIL */}
        <Route path="/detail/:id" element={<DetailPeminjaman />} />
        {/* HALAMAN EDIT */}
        <Route path="/edit/:id" element={<EditPeminjaman />} />
      </Routes>
    </div>
  );
}

export default App;
