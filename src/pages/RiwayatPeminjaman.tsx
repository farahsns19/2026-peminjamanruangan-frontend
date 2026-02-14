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

export default function RiwayatPeminjaman() {
    const [data, setData] = useState<Peminjaman[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua");


    useEffect(() => {
        fetch("http://localhost:5133/api/PeminjamanRuangan")
            .then((res) => res.json())
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            color: "#666",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}>Loading data riwayat...
        </div>
    );

    // Filter: hanya status Disetujui / Ditolak
    const riwayat = data.filter(
        (item) => item.status !== "Menunggu"
    );

    // Filter berdasarkan search dan status
    const hasilFilter = riwayat.filter((item) => {
        const matchSearch =
            item.namaPeminjam.toLowerCase().includes(search.toLowerCase()) ||
            item.ruangan.toLowerCase().includes(search.toLowerCase()) ||
            item.nrp.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
            filterStatus === "Semua" ? true : item.status === filterStatus;

        return matchSearch && matchStatus;
    });

    // Fungsi untuk mendapatkan warna status
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
            default:
                return {
                    bg: "#f59e0b20",
                    text: "#92400e",
                    border: "#f59e0b",
                };
        }
    };

    return (
        <div style={{ padding: "20px 0" }}>
            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "15px",
            }}>
                <div>
                    <h2 style={{
                        color: "#14532d",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}>
                        <span style={{ fontSize: "28px" }}>Riwayat Peminjaman Ruangan</span>
                    </h2>
                    <p style={{ color: "#666", margin: "5px 0 0 0" }}>
                        Menampilkan peminjaman yang sudah diproses (Disetujui/Ditolak)
                    </p>
                </div>


            </div>

            {/* Filter & Search Section */}
            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                marginBottom: "20px",
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                alignItems: "center",
            }}>
                {/* Search Box */}
                <div style={{ flex: 1, minWidth: "250px" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                        color: "#14532d",
                        fontSize: "14px",
                    }}>
                        Cari Peminjaman
                    </label>
                    <input
                        type="text"
                        placeholder="Cari berdasarkan Nama, Ruangan, atau NRP..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "10px 15px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "2px solid #e2e8f0",
                            fontSize: "14px",
                            transition: "border-color 0.2s",
                            outline: "none",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#16a34a"}
                        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    />
                </div>

                {/* Filter Status */}
                <div style={{ minWidth: "200px" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                        color: "#14532d",
                        fontSize: "14px",
                    }}>
                        Filter Status
                    </label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                            padding: "10px 15px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "2px solid #e2e8f0",
                            fontSize: "14px",
                            backgroundColor: "white",
                            cursor: "pointer",
                            outline: "none",
                        }}
                    >
                        <option value="Semua">Semua Status</option>
                        <option value="Disetujui">Disetujui</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                </div>

                {/* Info Hasil Filter */}
                <div style={{
                    backgroundColor: "#f3f4f6",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    color: "#4b5563",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                }}>
                    Menampilkan {hasilFilter.length} dari {riwayat.length} data
                </div>
            </div>

            {/* Tabel Riwayat */}
            {hasilFilter.length === 0 ? (
                <div style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    textAlign: "center",
                    color: "#666",
                }}>
                    <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔍</div>
                    <h3 style={{ color: "#14532d", margin: "0 0 10px 0" }}>
                        Tidak Ada Data yang Cocok
                    </h3>
                    <p>Coba ubah kata kunci pencarian atau filter status.</p>
                </div>
            ) : (
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
                                <th style={{ padding: "15px", textAlign: "center" }}>Detail</th>
                            </tr>
                        </thead>

                        <tbody>
                            {hasilFilter.map((item, index) => {
                                const statusStyle = getStatusStyle(item.status);

                                return (
                                    <tr
                                        key={item.id}
                                        style={{
                                            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                                            borderBottom: "1px solid #eee",
                                            transition: "background-color 0.2s",
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0fdf4"}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor =
                                            index % 2 === 0 ? "#f9f9f9" : "white"
                                        }
                                    >
                                        <td style={{ padding: "12px", fontWeight: "bold" }}>
                                            <td>{index + 1}</td>
                                        </td>
                                        <td style={{ padding: "12px", fontWeight: "500" }}>
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
                                        <td style={{ padding: "12px", fontSize: "13px" }}>
                                            {item.jamMulai} - {item.jamSelesai}
                                        </td>
                                        <td style={{
                                            padding: "12px",
                                            maxWidth: "250px",
                                            color: "#4b5563",
                                            fontStyle: item.keperluan ? "normal" : "italic",
                                        }}>
                                            {item.keperluan || "-"}
                                        </td>
                                        <td style={{ padding: "12px" }}>
                                            <span style={{
                                                padding: "5px 10px",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                backgroundColor: statusStyle.bg,
                                                color: statusStyle.text,
                                                border: `1px solid ${statusStyle.border}`,
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "4px",
                                            }}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px", textAlign: "center" }}>
                                            <Link
                                                to={`/detail/${item.id}`}
                                                style={{
                                                    padding: "6px 12px",
                                                    backgroundColor: "#3b82f6",
                                                    color: "white",
                                                    textDecoration: "none",
                                                    borderRadius: "6px",
                                                    fontSize: "12px",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                    transition: "background-color 0.2s",
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Footer Tabel */}
                    <div style={{
                        padding: "15px",
                        borderTop: "1px solid #eee",
                        backgroundColor: "#f9f9f9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "13px",
                        color: "#666",
                    }}>
                        <div>
                            <span>Total {hasilFilter.length}
                            </span> data ditampilkan
                        </div>
                        <div>
                            {search && (
                                <span>
                                    Filter aktif: "{search}"
                                </span>
                            )}
                            {filterStatus !== "Semua" && (
                                <span style={{ marginLeft: search ? "10px" : "0" }}>
                                    Status: {filterStatus}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}