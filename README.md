# Petungan (Perhitungan)

Utilitas untuk pengkonversian penanggalan Jawa ke sistem penanggalan Gregorian (Masehi) dan Hijriyah.

## Instalasi

Utilitas ini didesain supaya bisa di pakai pada lingkungan browser maupun pada lingkungan node.js

### Browser

Untuk browser yang tidak mendukung ES Module, bisa dipakai _library_ versi `petungan.browser.min.js`

```html
<script src="https://unpkg.com/@kalenderjawa/petungan"></script>

<script>
  console.log(Petungan);
</script>
```

Sedangkan untuk browser modern yang kebanyakan sudah mendukung ES Module maka pakailah _library_ versi ESM

```javascript
<script type="module">
  import {konversiTahunJawaKeTahunMasehi} from
  "https://unpkg.com/@kalenderjawa/petungan"

  console.log(konversiTahunJawaKeTahunMasehi(1955))
</script>
```

### Node.js

```bash
npm install --save @kalenderjawa/petungan
```

`import` *library* ke kode

```javascript
import {konversiTahunMasehiKeTahunJawa} from "@kalenderjawa/petungan";

let tahunMasehi = 1955;
let tauhnJawa = konversiTahunMasehiKeTahunJawa(tahunMasehi);
```

## Kalender Jawa - Kalender Masehi

### Konversi Tahun Jawa Ke Tahun Masehi

**`konversiTahunJawaKeTahunMasehi(tahunJawa)`**

Pengkonversian dari tahun Jawa ke tahun Masehi.

Sebagai contoh:

```javascript
let tahunMasehi = konversiTahunJawaKeTahunMasehi(1955);

console.log(tahunMasehi); // 2022
```

Perubahan tahun Jawa ke tahun Masehi berdasarkan konstanta tabel yang didapat dari API `tabelKonstantaKonversiTahunJawa()`

### Konversi Tahun Masehi Ke Tahun Jawa

**`konversiTahunMasehiKeTahunJawa(tahunMasehi)`**

Pengkonversian dari tahun Masehi ke tahun Jawa.

Sebagai contoh:

```javascript
let tahunJawa = konversiTahunMasehiKeTahunJawa(2022);

console.log(tahunJawa); // 1955
```

Perubahan tahun Masehi ke tahun Jawa berdasarkan konstanta tabel yang didapat dari API `tabelKonstantaKonversiTahunMasehi()`
