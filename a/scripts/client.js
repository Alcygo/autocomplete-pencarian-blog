const ably = new Ably.Realtime('vf2ATw.2xYwMw:B_uvc4u0Bky4ojHXx9WSHPR5-67w_ydaR3D47On1s0w'); 
const channel = ably.channels.get('example-channel');

// Fungsi untuk mengakses situs dengan AllOrigins
function fetchData() {
  const inputUrl = document.getElementById("urlInput").value;

  // Format URL API AllOrigins
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(inputUrl)}`;

  // Ambil data dari AllOrigins menggunakan fetch
  fetch(proxyUrl)
    .then(response => response.json()) // parsing hasil jadi JSON
    .then(data => {
      // Menampilkan hasil di iframe menggunakan srcdoc
      document.getElementById("viewer").srcdoc = data.contents;

      // Kirim pesan real-time ke Ably tentang konten yang berhasil diambil
      channel.publish('content-fetched', { url: inputUrl, success: true });
    })
    .catch(err => {
      // Jika ada error, tampilkan pesan error di iframe
      document.getElementById("viewer").srcdoc = `<p>Error: ${err.message}</p>`;

      // Kirim pesan error ke Ably
      channel.publish('content-fetched', { url: inputUrl, success: false, error: err.message });
    });
}

// Fungsi untuk mendengarkan pesan dari Ably
function listenForAblyMessages() {
  channel.subscribe('content-fetched', (message) => {
    console.log('Pesan diterima dari Ably:', message.data);

    // Lakukan sesuatu berdasarkan pesan real-time (misalnya tampilkan status)
    if (message.data.success) {
      alert('Konten berhasil diambil!');
    } else {
      alert(`Gagal mengambil konten: ${message.data.error}`);
    }
  });
}

// Panggil fungsi listenForAblyMessages saat halaman dimuat
window.onload = listenForAblyMessages;
