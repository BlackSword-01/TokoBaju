// script.js

// Fungsi untuk menambah produk ke keranjang
function tambahKeKeranjang(namaProduk, hargaProduk) {
    // Ambil keranjang dari localStorage
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    // Cek apakah produk sudah ada di keranjang
    let produkIndex = keranjang.findIndex(item => item.nama === namaProduk);
    if (produkIndex > -1) {
        // Jika sudah ada, tambahkan jumlahnya
        keranjang[produkIndex].jumlah += 1;
    } else {
        // Jika belum ada, tambahkan sebagai produk baru
        keranjang.push({ nama: namaProduk, harga: hargaProduk, jumlah: 1 });
    }

    // Simpan kembali keranjang ke localStorage
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    alert(namaProduk + " berhasil ditambahkan ke keranjang!");
}

// Fungsi untuk menampilkan daftar produk di halaman keranjang
function tampilkanKeranjang() {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    let keranjangList = document.getElementById("keranjangList");

    keranjangList.innerHTML = "";

    keranjang.forEach((item, index) => {
        keranjangList.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>Rp${item.harga}</td>
                <td>${item.jumlah}</td>
                <td>Rp${item.harga * item.jumlah}</td>
                <td><button onclick="hapusDariKeranjang(${index})" class="btn btn-danger btn-sm">Hapus</button></td>
            </tr>
        `;
    });
}

// Fungsi untuk menghapus produk dari keranjang
function hapusDariKeranjang(index) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    keranjang.splice(index, 1);

    // Simpan perubahan ke localStorage
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    // Tampilkan ulang keranjang
    tampilkanKeranjang();
}

// Fungsi untuk menghitung total harga di keranjang
function hitungTotalHarga() {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    let total = keranjang.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);

    document.getElementById("totalHarga").innerText = "Total: Rp" + total;
}

// Panggil fungsi saat halaman keranjang dimuat
if (window.location.pathname.includes("keranjang.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        tampilkanKeranjang();
        hitungTotalHarga();
    });
}
