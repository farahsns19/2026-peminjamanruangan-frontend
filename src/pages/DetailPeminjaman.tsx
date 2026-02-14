import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetailPeminjaman() {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchDetail() {
            const response = await fetch(
                `http://localhost:5133/api/PeminjamanRuangan/${id}`
            );

            if (response.ok) {
                const hasil = await response.json();
                setData(hasil);
            }
        }

        fetchDetail();
    }, [id]);

    if (!data) return <p style={{ textAlign: "center" }}>Loading detail...</p>;

    // Badge warna status
    function getStatusColor(status: string) {
        if (status === "Disetujui") return "green";
        if (status === "Ditolak") return "red";
        return "orange";
    }

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "20px",
                fontFamily: "Arial",
            }}
        >
            {/* Card Container */}
            <div
                style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "25px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Detail Peminjaman Ruangan
                </h2>

                {/* Status Badge */}
                <p style={{ textAlign: "center" }}>
                    <span
                        style={{
                            padding: "6px 14px",
                            borderRadius: "20px",
                            backgroundColor: getStatusColor(data.status),
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        {data.status}
                    </span>
                </p>

                <hr style={{ margin: "20px 0" }} />

                {/* Detail Fields */}
                <p>
                    <b>Nama Peminjam:</b> {data.namaPeminjam}
                </p>
                <p>
                    <b>NRP:</b> {data.nrp}
                </p>
                <p>
                    <b>Ruangan:</b> {data.ruangan}
                </p>
                <p>
                    <b>Tanggal:</b> {data.tanggal}
                </p>
                <p>
                    <b>Jam Mulai:</b> {data.jamMulai}
                </p>
                <p>
                    <b>Jam Selesai:</b> {data.jamSelesai}
                </p>
                <p>
                    <b>Keperluan:</b> {data.keperluan}
                </p>

                {/* Tombol Kembali */}
                <div style={{ marginTop: "25px", textAlign: "center" }}>
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            padding: "10px 18px",
                            background: "#14532d",
                            color: "white",
                            borderRadius: "8px",
                        }}
                    >
                        ⬅ Kembali
                    </Link>
                </div>
            </div>
        </div>
    );
}
