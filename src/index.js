const initTahunJawa = 1555;
const initTahunMasehi = 1633;
const penambah = 33;
const initBilangan = 78;

/**
 * Generator konstanta untuk konversi tahun jawa ke tahun masehi atau sebaliknya.
 * @param {Number} tahun
 * @returns {Array}
 */
function tabelKonstantaKonversiTahun(tahun) {
  let tahunAkhir = tahun + 33;
  let bilangan = initBilangan;

  let konstantaKonversiTahun = [];

  for (let x = 0; x < initBilangan; x++) {
    konstantaKonversiTahun.push({
      konstan: bilangan,
      tahunAwal: tahun,
      tahunAkhir: tahunAkhir,
    });
    bilangan = bilangan - 1;
    tahun = tahunAkhir + 1;
    tahunAkhir = tahun + penambah;
  }

  return konstantaKonversiTahun;
}

function tabelKonstantaKonversiTahunMasehi() {
  return tabelKonstantaKonversiTahun(initTahunMasehi);
}

function tabelKonstantaKonversiTahunJawa() {
  return tabelKonstantaKonversiTahun(initTahunJawa);
}

/**
 * Konversi tahun masehi ke tahun jawa
 * @param {Number} tahun
 * @returns
 */
function konversiTahunMasehiKeTahunJawa(tahun) {
  //TODO
  return tahun;
}

/**
 * Konversi tahun jawa ke tahun masehi
 * @param {Number} tahun
 * @returns
 */
function konversiTahunJawaKeTahunMasehi(tahun) {
  //TODO
  return tahun;
}

/**
 * Konversi tahun Jawa ke Tahun Hijriyah
 * @param {Number} tahun
 * @returns
 */
function konversiTahunJawaKeTahunHijriyah(tahun) {
  //TODO
  return tahun;
}

/**
 *
 * @param {Number} tahun
 * @returns
 */
function konversiTahunHijriyahKeTahunJawa(tahun) {
  //TODO
  return tahun;
}

/**
 * Cari referensi tahun untuk mencari konstanta konversi tahun
 * @param {Number} tahun
 * @param {Array} tabelKonstantaKonversiTahun
 */
function cariTahunReferensi(tabelKonstantaKonversiTahun, tahun) {
  //binary search algorithm
  let awalan = 0;
  let tengah = 0;
  let targetTahunAwal = 0;
  let targetTahunAkhir = 0;
  let akhiran = tabelKonstantaKonversiTahun.length - 1;

  while (awalan <= akhiran) {
    tengah = Math.floor((awalan + akhiran) / 2);
    targetTahunAwal = tabelKonstantaKonversiTahun[tengah].tahunAwal;
    targetTahunAkhir = tabelKonstantaKonversiTahun[tengah].tahunAkhir;

    if (
      (tahun > targetTahunAwal && tahun < targetTahunAkhir) ||
      tahun === targetTahunAwal ||
      tahun === targetTahunAkhir
    ) {
      return tabelKonstantaKonversiTahun[tengah];
    } else if (targetTahunAwal > tahun) {
      akhiran = tengah - 1;
    } else {
      awalan = tengah + 1;
    }
  }
}

export {
  konversiTahunJawaKeTahunMasehi,
  konversiTahunMasehiKeTahunJawa,
  konversiTahunHijriyahKeTahunJawa,
  konversiTahunJawaKeTahunHijriyah,
  tabelKonstantaKonversiTahunJawa,
  tabelKonstantaKonversiTahunMasehi,
  cariTahunReferensi,
};
