import PeminjamanList from "./pages/PeminjamanList";
import TambahPeminjaman from "./pages/TambahPeminjaman";

function App() {
  return (
    <div>
      <h1>Sistem Peminjaman Ruangan Kampus</h1>

      <TambahPeminjaman />

      <hr />

      <PeminjamanList />
    </div>
  );
}

export default App;
