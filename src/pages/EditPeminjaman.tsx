import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function EditPeminjaman() {
    const { id } = useParams();
    const navigate = useNavigate();

    // State form
    const [namaPeminjam, setNamaPeminjam] = useState("");
    const [nrp, setNrp] = useState("");
    const [ruangan, setRuangan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jamMulai, setJamMulai] = useState("");
    const [jamSelesai, setJamSelesai] = useState("");
    const [keperluan, setKeperluan] = useState("");
    const [status, setStatus] = useState("Menunggu");

    // Ambil data lama dulu
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:5133/api/PeminjamanRuangan/${id}`
            );

            if (response.ok) {
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
        }

        fetchData();
    }, [id]);

    // Submit Update
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
        );

        if (response.ok) {
            alert("Data berhasil diperbarui!");
            navigate("/");
        } else {
            alert("Update gagal!");
        }
    }

    // Styling input biar tidak nulis berulang
    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginTop: "8px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    };

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                fontFamily: "Arial",
            }}
        >
            {/* Card Container */}
            <div
                style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Edit Peminjaman Ruangan
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Nama */}
                    <label>Nama Peminjam</label>
                    <input
                        style={inputStyle}
                        value={namaPeminjam}
                        onChange={(e) => setNamaPeminjam(e.target.value)}
                        placeholder="Masukkan Nama"
                    />

                    <label>NRP</label>
                    <input
                        style={inputStyle}
                        value={nrp}
                        onChange={(e) => setNrp(e.target.value)}
                        placeholder="Masukkan NRP"
                    />

                    <label>Ruangan</label>
                    <input
                        style={inputStyle}
                        value={ruangan}
                        onChange={(e) => setRuangan(e.target.value)}
                        placeholder="Contoh: HH-301"
                    />

                    <label>Tanggal</label>
                    <input
                        style={inputStyle}
                        type="date"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                    />

                    <label>Jam Mulai</label>
                    <input
                        style={inputStyle}
                        type="time"
                        value={jamMulai}
                        onChange={(e) => setJamMulai(e.target.value)}
                    />

                    <label>Jam Selesai</label>
                    <input
                        style={inputStyle}
                        type="time"
                        value={jamSelesai}
                        onChange={(e) => setJamSelesai(e.target.value)}
                    />

                    <label>Keperluan</label>
                    <input
                        style={inputStyle}
                        value={keperluan}
                        onChange={(e) => setKeperluan(e.target.value)}
                        placeholder="Contoh: Rapat UKM"
                    />

                    <label>Status</label>
                    <select
                        style={inputStyle}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Disetujui">Disetujui</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <button
                            type="submit"
                            style={{
                                padding: "10px 18px",
                                background: "#14532d",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                marginRight: "10px",
                            }}
                        >
                            💾 Simpan Perubahan
                        </button>

                        <Link
                            to="/"
                            style={{
                                padding: "10px 18px",
                                background: "#999",
                                color: "white",
                                borderRadius: "8px",
                                textDecoration: "none",
                            }}
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
