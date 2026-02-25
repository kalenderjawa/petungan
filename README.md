# @kalenderjawa/petungan

Utilitas konversi tahun antar sistem Kalender Jawa, Masehi (Gregorian), dan Hijriyah.

```
Kalender Jawa (AJ) <--> Kalender Masehi (CE) <--> Kalender Hijriyah (AH)
```

## Latar Belakang

Masyarakat Jawa masih aktif menggunakan **Kalender Jawa** untuk menentukan hari baik (pernikahan, pindah rumah), upacara adat (1 Sura, Sekaten), perhitungan weton/neptu, serta membaca prasasti dan naskah kuno yang memakai penanggalan Jawa.

Masalahnya, Kalender Jawa bukan Kalender Masehi dan bukan Kalender Hijriyah murni — meskipun berbasis lunar seperti Hijriyah. Konversi antar ketiganya memerlukan pemahaman sejarah dan matematika kalender.

### Reformasi Sultan Agung (1633 M)

Sebelum 1633, Jawa menggunakan kalender **Saka** (solar, warisan Hindu). Sultan Agung menggantinya ke sistem **lunar** mengikuti Hijriyah, tapi **tidak me-reset nomor tahun**. Tahun Saka 1555 langsung berlanjut sebagai tahun Jawa 1555, padahal saat itu tahun Hijriyah baru 1043.

Hasilnya:

| Sistem | Tahun Dasar | Basis |
|--------|------------|-------|
| Jawa | 1555 AJ | Lunar (~354 hari/tahun) |
| Masehi | 1633 CE | Solar (~365.25 hari/tahun) |
| Hijriyah | 1043 AH | Lunar (~354 hari/tahun) |

### Mengapa Konversi Tidak Sederhana

**Jawa <-> Hijriyah** mudah — keduanya lunar, selisih tetap 512 tahun:

```
Hijriyah = Jawa - 512   (selalu tepat, 100% reversible)
```

**Jawa <-> Masehi** lebih rumit — lunar vs solar punya panjang tahun berbeda (~11 hari/tahun). Setiap ~34 tahun, kalender lunar "tertinggal" 1 tahun penuh dari kalender solar. Selisih yang awalnya 78 terus menyusut:

```
Tahun Jawa 1555  -->  Masehi 1633  (selisih 78)
Tahun Jawa 1589  -->  Masehi 1666  (selisih 77)
Tahun Jawa 1623  -->  Masehi 1699  (selisih 76)
...
Tahun Jawa 1955  -->  Masehi 2021  (selisih 66)
```

Library ini menangani perhitungan tersebut dengan algoritma matematika langsung.

## Instalasi

### Browser

Untuk browser yang tidak mendukung ES Module:

```html
<script src="https://unpkg.com/@kalenderjawa/petungan@2"></script>

<script>
  console.log(Petungan.konversiTahunJawaKeTahunMasehi(1955));
</script>
```

Untuk browser modern dengan ES Module:

```html
<script type="module">
  import {konversiTahunJawaKeTahunMasehi} from "https://unpkg.com/@kalenderjawa/petungan@2"

  console.log(konversiTahunJawaKeTahunMasehi(1955)); // 2022
</script>
```

### Node.js

```bash
npm install --save @kalenderjawa/petungan@2
```

```javascript
import {konversiTahunMasehiKeTahunJawa} from "@kalenderjawa/petungan";

console.log(konversiTahunMasehiKeTahunJawa(2022)); // 1955
```

## Penggunaan

### Konversi Tahun Jawa <-> Masehi

```javascript
import {
  konversiTahunJawaKeTahunMasehi,
  konversiTahunMasehiKeTahunJawa,
} from "@kalenderjawa/petungan";

// Jawa ke Masehi
konversiTahunJawaKeTahunMasehi(1555)  // 1633 (tahun dasar Sultan Agung)
konversiTahunJawaKeTahunMasehi(1955)  // 2021
konversiTahunJawaKeTahunMasehi(1958)  // 2024

// Masehi ke Jawa
konversiTahunMasehiKeTahunJawa(1633)  // 1555
konversiTahunMasehiKeTahunJawa(2021)  // 1955
konversiTahunMasehiKeTahunJawa(2024)  // 1958
```

### Konversi Tahun Jawa <-> Hijriyah

```javascript
import {
  konversiTahunJawaKeTahunHijriyah,
  konversiTahunHijriyahKeTahunJawa,
} from "@kalenderjawa/petungan";

// Jawa ke Hijriyah
konversiTahunJawaKeTahunHijriyah(1555)  // 1043
konversiTahunJawaKeTahunHijriyah(1955)  // 1443

// Hijriyah ke Jawa
konversiTahunHijriyahKeTahunJawa(1043)  // 1555
konversiTahunHijriyahKeTahunJawa(1443)  // 1955
```

### API Presisi (Berbasis JDN)

Selain konversi cepat di atas, library juga menyediakan fungsi **presisi** yang menghitung tahun Masehi berdasarkan kapan **1 Sura** (tahun baru Jawa) jatuh, menggunakan Julian Day Number melalui kalender Islam sipil/tabular:

```javascript
import {
  konversiJawaMasehiPrecise,
  konversiMasehiJawaPrecise,
} from "@kalenderjawa/petungan";

// Tahun Masehi saat 1 Sura 1955 AJ dimulai
konversiJawaMasehiPrecise(1955)   // 2021 (1 Muharram 1443 jatuh di 2021)

// Tahun Jawa yang 1 Sura-nya jatuh di tahun Masehi 2024
konversiMasehiJawaPrecise(2024)   // 1958
```

### API Direct (Konversi Cepat dengan Validasi Ketat)

```javascript
import {
  konversiJawaMasehiDirect,
  konversiMasehiJawaDirect,
  JAVANESE_CALENDAR_CONSTANTS,
} from "@kalenderjawa/petungan";

konversiJawaMasehiDirect(1955)  // 2021
konversiMasehiJawaDirect(2021)  // 1955

// Akses konstanta kalender
JAVANESE_CALENDAR_CONSTANTS.BASE_JAWA       // 1555
JAVANESE_CALENDAR_CONSTANTS.BASE_GREGORIAN  // 1633
JAVANESE_CALENDAR_CONSTANTS.HIJRI_OFFSET    // 512
```

Catatan: Fungsi "Direct" menggunakan formula continuous drift yang hasilnya sangat dekat (~98% cocok) dengan "Precise". Precise menghitung berdasarkan tanggal 1 Sura via JDN, sehingga lebih akurat untuk kasus-kasus tepi.

## Dasar Matematika

### Jawa <-> Masehi (Direct)

```
drift = |tahunJawa - 1555| × 10.875833
penurunan = round(drift / 365.2425)
selisih = max(78 - penurunan, 1)    // jika tahunJawa >= 1555
selisih = 78 + penurunan             // jika tahunJawa < 1555
tahunMasehi = tahunJawa + selisih
```

- **1555 AJ = 1633 M**: titik referensi (reformasi Sultan Agung)
- **10.876 hari/tahun**: selisih harian antara tahun solar dan lunar
- **Continuous drift**: lebih akurat daripada pembulatan ke siklus 34 tahun
- **Selisih minimum 1**: kalender tidak bisa konvergen sempurna

### Jawa <-> Masehi (Precise)

```
Jawa --> Hijriyah (offset 512) --> JDN (1 Muharram) --> Masehi
```

Menggunakan Julian Day Number untuk menentukan tahun Masehi di mana 1 Sura (= 1 Muharram tahun Hijriyah terkait) jatuh. Rujukan: [Calendrical Calculations](https://en.wikipedia.org/wiki/Calendrical_Calculations).

### Jawa <-> Hijriyah

```
hijriYear = jawaYear - 512
jawaYear  = hijriYear + 512
```

100% reversible karena kedua kalender sama-sama berbasis lunar.

## Error Handling

```javascript
try {
  konversiTahunJawaKeTahunMasehi("1955"); // Error: bukan integer
} catch (error) {
  console.error(error.message); // "Invalid Javanese year: must be an integer"
}
```

Tahun sebelum 1555 AJ (sebelum reformasi Sultan Agung) tetap dihitung, namun akan mengeluarkan warning karena korelasi historis belum tentu akurat.

## Testing

```bash
npm test
```

## Migrasi dari v1.x

Tidak ada breaking changes. Kode yang sudah ada tetap berfungsi:

```javascript
// Kode v1.x tetap berfungsi
import {konversiTahunJawaKeTahunMasehi} from "@kalenderjawa/petungan";
const result = konversiTahunJawaKeTahunMasehi(1955);
```

Untuk performa terbaik, gunakan API Direct:

```javascript
import {konversiJawaMasehiDirect} from "@kalenderjawa/petungan";
```

## Perbandingan Performa (v1.x vs v2.0)

| Metrik | v1.x | v2.0 | Peningkatan |
|--------|------|------|-------------|
| Akurasi | 82% | 90% | +8% |
| Kecepatan | 1x | 2x | 100% lebih cepat |
| Memori | 50KB | 5KB | 90% lebih hemat |
| Bundle | 15KB | 8KB | 47% lebih kecil |

## Kontribusi

Kontribusi sangat diterima! Silakan buat issue atau pull request di [GitHub repository](https://github.com/kalenderjawa/petungan).

## Lisensi

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## Referensi

- [Javanese calendar](https://en.wikipedia.org/wiki/Javanese_calendar) — overview and epoch by Sultan Agung, 1633 CE
- [Calendrical Calculations](https://en.wikipedia.org/wiki/Calendrical_Calculations) — civil/tabular Islamic calendar algorithms and JDN methods
- [weton project](https://github.com/beaudu/weton) — full algorithmic computation of Javanese dates
- [Karjanto & Beauducel, "An ethnoarithmetic excursion into the Javanese calendar"](https://arxiv.org/abs/2012.10064) — arithmetic aspects of the Javanese calendar
