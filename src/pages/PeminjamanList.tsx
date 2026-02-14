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
    {/* Kondisi if else data peminjaman */ }
    if (loading) {
        return <p>Loading data peminjaman...</p>;
    }

    if (data.length === 0) {
        return <p>Belum ada data peminjaman.</p>;
    }

    {/* Membuat fungsi handleDelete */ }
    async function handleDelete(id: number) {
        const yakin = window.confirm("Yakin mau menghapus data ini?");

        if (!yakin) return;

        const response = await fetch(
            `http://localhost:5133/api/PeminjamanRuangan/${id}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            alert("Data berhasil dihapus!");
            window.location.reload();
        } else {
            alert("Gagal menghapus data.");
        }
    }

    {/* Membuat fungsi handleUpdateStatus */ }
    async function handleUpdateStatus(item: Peminjaman, statusBaru: string) {
        const response = await fetch(
            `http://localhost:5133/api/PeminjamanRuangan/${item.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
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
                        <th>Detail</th>
                        <th>Edit</th>
                        <th>Delete</th>
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

                            {/* Mengubah status jadi dropdown */}
                            <td>
                                <select
                                    value={item.status}
                                    onChange={(e) =>
                                        handleUpdateStatus(item, e.target.value)
                                    }
                                >
                                    <option value="Menunggu">Menunggu</option>
                                    <option value="Disetujui">Disetujui</option>
                                    <option value="Ditolak">Ditolak</option>
                                </select>
                            </td>

                            {/* Kolom khusus Detail */}
                            <td>
                                <a href={`/detail/${item.id}`}>Detail</a>
                            </td>

                            {/* Kolom khusus Edit */}
                            <td>
                                <a href={`/edit/${item.id}`}>Edit</a>
                            </td>

                            {/* Kolom khusus Hapus */}
                            <td>
                                <button onClick={() => handleDelete(item.id)}>
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
