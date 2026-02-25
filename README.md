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

Library ini menangani perhitungan tersebut dengan algoritma presisi berbasis Julian Day Number (JDN), tervalidasi 100% akurat terhadap data kalender Jawa di [almnk.com](https://almnk.com).

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

  console.log(konversiTahunJawaKeTahunMasehi(1955)); // 2021
</script>
```

### Node.js

```bash
npm install --save @kalenderjawa/petungan@2
```

```javascript
import {konversiTahunMasehiKeTahunJawa} from "@kalenderjawa/petungan";

console.log(konversiTahunMasehiKeTahunJawa(2021)); // 1955
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

### API Alternatif

Fungsi utama di atas menggunakan algoritma **Precise** (berbasis JDN) secara internal. Jika perlu, Anda juga bisa mengakses kedua engine secara langsung:

```javascript
import {
  // Precise — JDN-based, 100% akurat
  konversiJawaMasehiPrecise,
  konversiMasehiJawaPrecise,
  // Direct — continuous drift formula, ~98% akurat
  konversiJawaMasehiDirect,
  konversiMasehiJawaDirect,
  // Konstanta kalender
  JAVANESE_CALENDAR_CONSTANTS,
} from "@kalenderjawa/petungan";

konversiJawaMasehiPrecise(1955)  // 2021 (100% akurat via JDN)
konversiJawaMasehiDirect(1955)   // 2021 (formula cepat, ~98% cocok)

JAVANESE_CALENDAR_CONSTANTS.BASE_JAWA       // 1555
JAVANESE_CALENDAR_CONSTANTS.BASE_GREGORIAN  // 1633
JAVANESE_CALENDAR_CONSTANTS.HIJRI_OFFSET    // 512
```

| Engine | Akurasi | Metode |
|--------|---------|--------|
| **Precise** (default) | 100% | Julian Day Number via kalender Islam sipil |
| Direct | ~98% | Continuous drift formula (10.876 hari/tahun) |

Direct lebih cepat secara komputasi, tapi perbedaannya negligible. Precise direkomendasikan untuk semua kasus.

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

Tidak ada breaking changes pada nama fungsi. Kode yang sudah ada tetap berfungsi:

```javascript
import {konversiTahunJawaKeTahunMasehi} from "@kalenderjawa/petungan";
const result = konversiTahunJawaKeTahunMasehi(1955); // 2021
```

Perubahan di v2.1: fungsi utama sekarang menggunakan engine **Precise** (100% akurat). Hasil konversi mungkin berbeda ±1 tahun untuk ~1.8% kasus tepi dibanding v2.0 — ini karena hasil sekarang **lebih akurat** sesuai data kalender Jawa asli.

## Perbandingan Versi

| Metrik | v1.x | v2.0 | v2.1 |
|--------|------|------|------|
| Akurasi | ~82% | ~98% (Direct) | **100%** (Precise) |
| Engine | Tabel lookup | Continuous drift | JDN + kalender Islam sipil |
| Validasi | — | — | Tervalidasi vs [almnk.com](https://almnk.com) |
| Bundle | ~15KB | ~8KB | ~8KB |

## Kontribusi

Kontribusi sangat diterima! Silakan buat issue atau pull request di [GitHub repository](https://github.com/kalenderjawa/petungan).

## Lisensi

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## Referensi

- [Javanese calendar](https://en.wikipedia.org/wiki/Javanese_calendar) — overview and epoch by Sultan Agung, 1633 CE
- [Calendrical Calculations](https://en.wikipedia.org/wiki/Calendrical_Calculations) — civil/tabular Islamic calendar algorithms and JDN methods
- [weton project](https://github.com/beaudu/weton) — full algorithmic computation of Javanese dates
- [Karjanto & Beauducel, "An ethnoarithmetic excursion into the Javanese calendar"](https://arxiv.org/abs/2012.10064) — arithmetic aspects of the Javanese calendar
