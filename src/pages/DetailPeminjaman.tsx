import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    if (!data) return <p>Loading detail...</p>;

    return (
        <div>
            <h2>Detail Peminjaman Ruangan</h2>

            <p><b>Nama:</b> {data.namaPeminjam}</p>
            <p><b>NRP:</b> {data.nrp}</p>
            <p><b>Ruangan:</b> {data.ruangan}</p>
            <p><b>Tanggal:</b> {data.tanggal}</p>
            <p><b>Jam Mulai:</b> {data.jamMulai}</p>
            <p><b>Jam Selesai:</b> {data.jamSelesai}</p>
            <p><b>Keperluan:</b> {data.keperluan}</p>
            <p><b>Status:</b> {data.status}</p>

            <a href="/">⬅ Kembali</a>
        </div>
    );
}
