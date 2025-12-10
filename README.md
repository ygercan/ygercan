- 👋 Hi, I’m @ygercan
- 👀 I’m interested in frontend dev, 
- 🌱 I’m currently learning html, css, js, react, vue.js
- 💞️ I’m looking to collaborate on ...
- 📫 How to reach me ...

<!---
ygercan/ygercan is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->


moon-photo-assistant/
│
├─ assets/                 # Görseller, ikonlar, AR modelleri
│
├─ src/
│   ├─ components/         # Tekrar kullanılacak UI bileşenleri
│   │   ├─ Header.js
│   │   ├─ BottomBar.js
│   │   ├─ CalendarGraph.js
│   │   └─ PhotoCard.js
│   │
│   ├─ screens/            # Ekranlar
│   │   ├─ HomeScreen.js       # Kamera Yardımcısı
│   │   ├─ PlanningScreen.js   # Planlama
│   │   ├─ LibraryScreen.js    # Çekim Kütüphanesi
│   │   └─ InfoScreen.js       # Ay Bilgi ve İpuçları
│   │
│   ├─ navigation/         # React Navigation ayarları
│   │   └─ AppNavigator.js
│   │
│   ├─ utils/              # Yardımcı fonksiyonlar (Ay konumu, faz hesaplama)
│   │   └─ moonUtils.js
│   │
│   └─ App.js              # Uygulama giriş noktası
│
├─ package.json
└─ README.md


[Home / Kamera Yardımcısı]
       |
       |-- (Alt bar: Kütüphane) --> [Çekim Kütüphanesi]
       |                                 |
       |                                 |-- (Fotoğraf seç) --> [Fotoğraf Detayları]
       |                                                         |
       |                                                         |-- (Not ekle / kaydet)
       |
       |-- (Alt bar: Ay fazı detay butonu) --> [Ay Bilgi ve İpuçları]
       |
       |-- (Planlama butonu / Menü) --> [Planlama Ekranı]
       |                                 |
       |                                 |-- (Gelecek gün seçimi) --> Detay bilgiler (azimut, yükseklik, önerilen çekim saati)
       |
       |-- (Push Notification) --> Kullanıcıya uyarı / yönlendirme
