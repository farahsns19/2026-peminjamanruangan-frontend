const API_URL = "http://localhost:5133/api/PeminjamanRuangan";

// mengaambil semua data peminjaman
export async function getPeminjaman() {
    const response = await fetch(API_URL);
    return response.json();
}
