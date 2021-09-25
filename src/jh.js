/**
 * Referensi
 * https://github.com/kalenderjawa/cathetan/blob/main/KONVERSI.md#Konversi-Tahun-Jawa-Ke-Tahun-Hijriyah
 */

const KONSTANTA_KONVERSI_HIJRIYAH = 512;
const AWAL_TAHUN_JAWA = 1555;
const AWAL_TAHUN_HIJRIYAH = 1043;

/**
 * Konversi tahun Jawa ke Tahun Hijriyah
 * @param {Number} tahunJawa
 * @returns
 */
function konversiTahunJawaKeTahunHijriyah(tahunJawa) {
  return tahunJawa < AWAL_TAHUN_JAWA
    ? tahunJawa
    : tahunJawa - KONSTANTA_KONVERSI_HIJRIYAH;
}

/**
 * Konversi tahun Hijriyah ke Tahun Jawa
 * @param {Number} tahunHijriyah
 * @returns
 */
function konversiTahunHijriyahKeTahunJawa(tahunHijriyah) {
  return tahunHijriyah < AWAL_TAHUN_HIJRIYAH
    ? tahunHijriyah
    : tahunHijriyah + KONSTANTA_KONVERSI_HIJRIYAH;
}

export { konversiTahunJawaKeTahunHijriyah, konversiTahunHijriyahKeTahunJawa };
