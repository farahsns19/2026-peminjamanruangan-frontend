import { useEffect, useState } from "react";

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

    if (loading) {
        return <p>Loading data peminjaman...</p>;
    }

    if (data.length === 0) {
        return <p>Belum ada data peminjaman.</p>;
    }

    return (
        <div>
            <table
                border={1}
                cellPadding={10}
                style={{ borderCollapse: "collapse", marginTop: "20px" }}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>NRP</th>
                        <th>Ruangan</th>
                        <th>Tanggal</th>
                        <th>Jam</th>
                        <th>Keperluan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>


                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.namaPeminjam}</td>
                            <td>{item.nrp}</td>
                            <td>{item.ruangan}</td>
                            <td>{item.tanggal}</td>
                            <td>
                                {item.jamMulai} - {item.jamSelesai}
                            </td>
                            <td>{item.keperluan}</td>
                            <td>{item.status}</td>

                            {/* Kolom khusus Detail */}
                            <td>
                                <a href={`/detail/${item.id}`}>Detail</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
