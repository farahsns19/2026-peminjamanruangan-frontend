import { useState } from "react";

export default function TambahPeminjaman() {
    const [namaPeminjam, setNamaPeminjam] = useState("");
    const [nrp, setNrp] = useState("");
    const [ruangan, setRuangan] = useState("");
    const [keperluan, setKeperluan] = useState("");
    const [jamMulai, setJamMulai] = useState("");
    const [jamSelesai, setJamSelesai] = useState("");
    const [tanggal, setTanggal] = useState("");

    // pesan notifikasi
    const [pesan, setPesan] = useState("");

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
            setPesan("Peminjaman berhasil diajukan!");

            // kosongkan form setelah submit
            setNamaPeminjam("");
            setNrp("");
            setRuangan("");
            setTanggal("");
            setJamMulai("");
            setJamSelesai("");
            setKeperluan("");
        } else {
            setPesan("❌ Gagal menambahkan data.");
        }
    }

    return (
        <div style={{ maxWidth: "700px", margin: "30px auto" }}>
            {/* Judul */}
            <h2
                style={{
                    textAlign: "center",
                    color: "#14532d",
                    marginBottom: "20px",
                }}
            >
                Form Pengajuan Peminjaman Ruangan
            </h2>

            {/* Notifikasi */}
            {pesan && (
                <div
                    style={{
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #86efac",
                        padding: "12px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    {pesan}
                </div>
            )}

            {/* Card Form */}
            <div
                style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "16px",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "grid", gap: "15px" }}
                >
                    {/* Nama */}
                    <InputRow label="Nama" value={namaPeminjam} setValue={setNamaPeminjam} />

                    {/* NRP */}
                    <InputRow label="NRP" value={nrp} setValue={setNrp} />

                    {/* Ruangan */}
                    <InputRow label="Ruangan" value={ruangan} setValue={setRuangan} />

                    {/* Tanggal */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>Tanggal</label>
                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>

                    {/* Jam */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>Jam</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input
                                type="time"
                                value={jamMulai}
                                onChange={(e) => setJamMulai(e.target.value)}
                                style={inputStyle}
                                required
                            />
                            <input
                                type="time"
                                value={jamSelesai}
                                onChange={(e) => setJamSelesai(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    {/* Keperluan */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>Keperluan</label>
                        <textarea
                            value={keperluan}
                            onChange={(e) => setKeperluan(e.target.value)}
                            placeholder="Keperluan peminjaman"
                            style={{
                                ...inputStyle,
                                minHeight: "90px",
                            }}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#14532d",
                            color: "white",
                            padding: "12px",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Ajukan Peminjaman
                    </button>
                </form>
            </div>
        </div>
    );
}

function InputRow({
    label,
    value,
    setValue,
}: {
    label: string;
    value: string;
    setValue: (v: string) => void;
}) {
    return (
        <div style={rowStyle}>
            <label style={labelStyle}>{label}</label>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Masukkan ${label.toLowerCase()}`}
                style={inputStyle}
                required
            />
        </div>
    );
}

const rowStyle = {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    alignItems: "center",
    gap: "10px",
};

const labelStyle = {
    fontWeight: "bold",
    color: "#14532d",
};

const inputStyle = {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    width: "100%",
};
