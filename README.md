# Petungan (Perhitungan)

Utilitas untuk pengkonversian penanggalan Jawa ke sistem penanggalan Gregorian (Masehi) dan Hijriyah.

## Konversi Kalender Jawa Ke Kalender Masehi

### Konversi Tahun

**`konversiTahunJawaKeTahunMasehi(tahunJawa)`**

Pengkonversian dari tahun Jawa ke tahun Masehi.

Sebagai contoh:

```javascript
let tahunMasehi = konversiTahunJawaKeTahunMasehi(1955);

console.log(tahunMasehi); // 2022
```

Perubahan tahun Jawa ke tahun Masehi berdasarkan konstanta tabel yang didapat dari API `tabelKonstantaKonversiTahunJawa()`
