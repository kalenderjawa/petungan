import { cariTahunReferensiJawa, cariTahunReferensiMasehi } from "./pelok.js";

/**
 * Konversi tahun masehi ke tahun jawa
 * @param {Number} tahunMasehi
 * @returns
 */
function konversiTahunMasehiKeTahunJawa(tahunMasehi) {
  let konstMasehi = cariTahunReferensiMasehi(tahunMasehi)
  return tahunMasehi - konstMasehi?.konstan;
}

/**
 * Konversi tahun jawa ke tahun masehi
 * @param {Number} tahunJawa
 * @returns
 */
function konversiTahunJawaKeTahunMasehi(tahunJawa) {
  let konstJawa = cariTahunReferensiJawa(tahunJawa)
  return tahunJawa + konstJawa?.konstan;
}

export { konversiTahunMasehiKeTahunJawa, konversiTahunJawaKeTahunMasehi };
