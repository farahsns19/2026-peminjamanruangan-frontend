import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav
            style={{
                backgroundColor: "#14532d",
                padding: "15px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
        >
            {/* Logo */}
            <h2
                style={{
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <span style={{ fontSize: "28px" }}></span>
                <span style={{ fontSize: "20px", fontWeight: "600" }}>
                    Sistem Peminjaman Ruangan
                </span>
            </h2>

            {/* Menu */}
            <div style={{ display: "flex", gap: "25px" }}>
                <Link
                    to="/"
                    style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "5px" }}
                >
                    <span></span> Home
                </Link>

                <Link
                    to="/riwayat"
                    style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "5px" }}
                >
                    <span></span> Riwayat
                </Link>

                <Link
                    to="/tambah"
                    style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "5px" }}
                >
                    <span></span> Tambah
                </Link>
            </div>
        </nav>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
};
