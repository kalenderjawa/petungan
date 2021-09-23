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

export {
  konversiTahunMasehiKeTahunJawa,
  tabelKonstantaKonversiTahunJawa,
  tabelKonstantaKonversiTahunMasehi,
};
