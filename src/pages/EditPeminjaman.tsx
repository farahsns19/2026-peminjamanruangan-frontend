import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPeminjaman() {
    const { id } = useParams(); // ambil ID dari URL
    const navigate = useNavigate(); // pindah page

    const [namaPeminjam, setNamaPeminjam] = useState(""); // tempat simpan isi form
    const [nrp, setNrp] = useState("");
    const [ruangan, setRuangan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jamMulai, setJamMulai] = useState("");
    const [jamSelesai, setJamSelesai] = useState("");
    const [keperluan, setKeperluan] = useState("");
    const [status, setStatus] = useState("Menunggu");

    // mengambil data lama 
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:5133/api/PeminjamanRuangan/${id}`
            ); // react meminta ke backend

            const data = await response.json();

            setNamaPeminjam(data.namaPeminjam);
            setNrp(data.nrp);
            setRuangan(data.ruangan);
            setTanggal(data.tanggal);
            setJamMulai(data.jamMulai);
            setJamSelesai(data.jamSelesai);
            setKeperluan(data.keperluan);
            setStatus(data.status);
        }

        fetchData();
    }, [id]);

    // submit update
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const dataUpdate = {
            id: Number(id),
            namaPeminjam,
            nrp,
            ruangan,
            tanggal,
            jamMulai,
            jamSelesai,
            keperluan,
            status,
        }; 

        const response = await fetch(
            `http://localhost:5133/api/PeminjamanRuangan/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataUpdate),
            }
        ); // kirim PUT ke backend

        if (response.ok) {
            alert("Data berhasil diperbarui!");
            navigate("/");
        } else {
            alert("Update gagal!");
        }
    }

    return (
        <div>
            <h2>Edit Peminjaman Ruangan</h2>

            <form onSubmit={handleSubmit}>
                <input
                    value={namaPeminjam}
                    onChange={(e) => setNamaPeminjam(e.target.value)}
                    placeholder="Nama"
                />

                <input
                    value={nrp}
                    onChange={(e) => setNrp(e.target.value)}
                    placeholder="NRP"
                />

                <input
                    value={ruangan}
                    onChange={(e) => setRuangan(e.target.value)}
                    placeholder="Ruangan"
                />

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

                <input
                    value={keperluan}
                    onChange={(e) => setKeperluan(e.target.value)}
                    placeholder="Keperluan"
                />

                <button type="submit">Simpan Perubahan</button>
            </form>
        </div>
    );
}
