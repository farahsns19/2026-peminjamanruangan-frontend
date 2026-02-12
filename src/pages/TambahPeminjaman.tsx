// Halaman form untuk Tambah Peminjaman Ruangan
import { useState } from "react"; // simpan data sementara 

export default function TambahPeminjaman() { // componen
    const [namaPeminjam, setNamaPeminjam] = useState(""); // state untuk input form
    const [nrp, setNrp] = useState("");
    const [ruangan, setRuangan] = useState("");
    const [keperluan, setKeperluan] = useState("");
    const [jamMulai, setJamMulai] = useState("");
    const [jamSelesai, setJamSelesai] = useState("");
    const [tanggal, setTanggal] = useState("");


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const dataBaru = {
            namaPeminjam,
            nrp,
            ruangan,
            tanggal,
            jamMulai,
            jamSelesai,
            keperluan,
            status: "Menunggu",
        };

        const response = await fetch(
            "http://localhost:5133/api/PeminjamanRuangan",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataBaru),
            }
        );

        if (response.ok) {
            alert("Peminjaman berhasil ditambahkan!");
            window.location.reload(); // otomatis refresh
        } else {
            alert("Gagal menambahkan data.");
        }
    }

    return (
        <div style={{ marginBottom: "30px" }}>
            <h2>Tambah Peminjaman Ruangan</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Nama Peminjam"
                        value={namaPeminjam}
                        onChange={(e) => setNamaPeminjam(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder="NRP"
                        value={nrp}
                        onChange={(e) => setNrp(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder="Ruangan"
                        value={ruangan}
                        onChange={(e) => setRuangan(e.target.value)}
                    />
                </div>

                <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                />

                <input
                    type="time"
                    value={jamMulai}
                    onChange={(e) => setJamMulai(e.target.value)}
                />

                <input
                    type="time"
                    value={jamSelesai}
                    onChange={(e) => setJamSelesai(e.target.value)}
                />


                <div>
                    <input
                        placeholder="Keperluan"
                        value={keperluan}
                        onChange={(e) => setKeperluan(e.target.value)}
                    />
                </div>

                <button type="submit">Simpan</button>
            </form>
        </div>
    );
}
