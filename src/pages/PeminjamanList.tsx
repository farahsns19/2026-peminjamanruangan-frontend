import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Peminjaman = {
    id: number;
    namaPeminjam: string;
    nrp: string;
    ruangan: string;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    keperluan: string;
    status: string;
};

export default function PeminjamanList() {
    const [data, setData] = useState<Peminjaman[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5133/api/PeminjamanRuangan")
            .then((res) => res.json())
            .then((result) => {
                console.log("DATA API:", result);
                setData(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setLoading(false);
            });
    }, []);

    // Fungsi untuk mendapatkan style status (tanpa icon)
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Disetujui":
                return {
                    bg: "#22c55e20",
                    text: "#166534",
                    border: "#22c55e",
                };
            case "Ditolak":
                return {
                    bg: "#ef444420",
                    text: "#991b1b",
                    border: "#ef4444",
                };
            case "Menunggu":
                return {
                    bg: "#f59e0b20",
                    text: "#92400e",
                    border: "#f59e0b",
                };
            default:
                return {
                    bg: "#6b728020",
                    text: "#374151",
                    border: "#6b7280",
                };
        }
    };

    async function handleDelete(id: number) {
        const yakin = window.confirm("Yakin mau menghapus data ini?");
        if (!yakin) return;

        const response = await fetch(
            `http://localhost:5133/api/PeminjamanRuangan/${id}`,
            { method: "DELETE" }
        );

        if (response.ok) {
            alert("Data berhasil dihapus!");
            window.location.reload();
        } else {
            alert("Gagal menghapus data.");
        }
    }

    async function handleUpdateStatus(item: Peminjaman, statusBaru: string) {
        const response = await fetch(
            `http://localhost:5133/api/PeminjamanRuangan/${item.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    namaPeminjam: item.namaPeminjam,
                    nrp: item.nrp,
                    ruangan: item.ruangan,
                    tanggal: item.tanggal,
                    jamMulai: item.jamMulai,
                    jamSelesai: item.jamSelesai,
                    keperluan: item.keperluan,
                    status: statusBaru,
                }),
            }
        );

        if (response.ok) {
            alert("Status berhasil diperbarui!");
            window.location.reload();
        } else {
            alert("Gagal update status.");
        }
    }

    if (loading) {
        return (
            <div style={{
                textAlign: "center",
                padding: "40px",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                color: "#666",
            }}>
                Loading data peminjaman...
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                textAlign: "center",
                color: "#666",
            }}>
                <h3 style={{ color: "#14532d", margin: "0 0 10px 0" }}>
                    Belum Ada Data Peminjaman
                </h3>
                <p>Silakan tambah peminjaman baru melalui form di atas.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header Sederhana */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "15px",
            }}>
                <div>
                    <h2>
                        <span style={{ fontSize: "28px" }}>Daftar Peminjaman Ruangan</span>
                    </h2>
                    <p style={{ color: "#666", margin: "5px 0 0 0" }}>
                        Menampilkan daftar peminjaman
                    </p>
                </div>


            </div>

            {/* Tabel Peminjaman */}
            <div style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                overflow: "hidden",
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                }}>
                    <thead>
                        <tr style={{
                            backgroundColor: "#14532d",
                            color: "white",
                        }}>
                            <th style={{ padding: "15px", textAlign: "center" }}>No</th>
                            <th style={{ padding: "15px", textAlign: "center" }}>Nama</th>
                            <th style={{ padding: "15px", textAlign: "center" }}>NRP</th>
                            <th style={{ padding: "15px", textAlign: "center" }}>Ruangan</th>
                            <th style={{ padding: "15px", textAlign: "center" }}>Tanggal</th>
                            <th style={{ padding: "15px", textAlign: "center" }}>Jam</th>
                            <th style={{ padding: "15px", textAlign: "center" }}>Keperluan</th>
                            <th style={{ padding: "15px", textAlign: "center" }}>Status</th>
                            <th style={{ padding: "15px", textAlign: "center" }} colSpan={3}>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => {
                            const statusStyle = getStatusStyle(item.status);

                            return (
                                <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                                    {/* ✅ No urut */}
                                    <td style={{ padding: "10px", fontWeight: "bold" }}>
                                        {index + 1}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        {item.namaPeminjam}
                                    </td>
                                    <td style={{ padding: "12px", color: "#4b5563" }}>
                                        {item.nrp}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        <span style={{
                                            backgroundColor: "#e2e8f0",
                                            padding: "4px 8px",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                        }}>
                                            {item.ruangan}
                                        </span>
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        {item.jamMulai} - {item.jamSelesai}
                                    </td>
                                    <td style={{
                                        padding: "12px",
                                        maxWidth: "200px",
                                        color: "#4b5563",
                                    }}>
                                        {item.keperluan}
                                    </td>

                                    {/* Status dengan Badge Berwarna (tanpa icon) */}
                                    <td style={{ padding: "12px" }}>
                                        <select
                                            value={item.status}
                                            onChange={(e) => handleUpdateStatus(item, e.target.value)}
                                            style={{
                                                padding: "6px 10px",
                                                borderRadius: "20px",
                                                border: "none",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                backgroundColor: statusStyle.bg,
                                                color: statusStyle.text,
                                                width: "120px",
                                            }}
                                        >
                                            <option value="Menunggu" style={{ backgroundColor: "#f59e0b20", color: "#92400e" }}>Menunggu</option>
                                            <option value="Disetujui" style={{ backgroundColor: "#22c55e20", color: "#22c55e" }}>Disetujui</option>
                                            <option value="Ditolak" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>Ditolak</option>
                                        </select>
                                    </td>

                                    {/* Kolom Aksi */}
                                    <td style={{ padding: "8px", textAlign: "center" }}>
                                        <Link
                                            to={`/detail/${item.id}`}
                                            style={{
                                                padding: "6px 12px",
                                                backgroundColor: "#3b82f6",
                                                color: "white",
                                                textDecoration: "none",
                                                borderRadius: "6px",
                                                fontSize: "12px",
                                                display: "inline-block",
                                            }}
                                        >
                                            Detail
                                        </Link>
                                    </td>

                                    <td style={{ padding: "8px", textAlign: "center" }}>
                                        <Link
                                            to={`/edit/${item.id}`}
                                            style={{
                                                padding: "6px 12px",
                                                backgroundColor: "#eab308",
                                                color: "white",
                                                textDecoration: "none",
                                                borderRadius: "6px",
                                                fontSize: "12px",
                                                display: "inline-block",
                                            }}
                                        >
                                            Edit
                                        </Link>
                                    </td>

                                    <td style={{ padding: "8px", textAlign: "center" }}>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            style={{
                                                padding: "6px 12px",
                                                backgroundColor: "#ef4444",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "12px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div style={{
                    padding: "15px",
                    borderTop: "1px solid #eee",
                    backgroundColor: "#f9f9f9",
                    fontSize: "13px",
                    color: "#666",
                }}>
                    Total {data.length} data peminjaman
                </div>
            </div>
        </div >
    );
}