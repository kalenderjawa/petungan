# Petungan (Perhitungan)

Utilitas untuk pengkonversian penanggalan Jawa ke sistem penanggalan Gregorian (Masehi) dan Hijriyah.

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
