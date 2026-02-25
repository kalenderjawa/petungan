/**
 * @kalenderjawa/petungan v2.1.0
 *
 * Konversi tahun Kalender Jawa <-> Masehi <-> Hijriyah.
 *
 * Engine utama: Precise (JDN / kalender Islam sipil) — 100% akurat
 * Fallback    : Direct (continuous drift formula) — ~98% akurat
 *
 * Tervalidasi terhadap data kalender Jawa di almnk.com (1555–2100 AJ).
 */

// PRIMARY API - Precise (JDN-based) conversion functions
export {
  konversiJawaMasehiDirect,
  konversiMasehiJawaDirect,
  konversiJawaMasehiPrecise,
  konversiMasehiJawaPrecise,
  JAVANESE_CALENDAR_CONSTANTS,
} from "./pelok.js";

// MAIN CONVERSION FUNCTIONS - Improved with new algorithm
export {
  konversiTahunJawaKeTahunMasehi,
  konversiTahunMasehiKeTahunJawa,
} from "./jm.js";

export {
  konversiTahunJawaKeTahunHijriyah,
  konversiTahunHijriyahKeTahunJawa,
} from "./jh.js";

// LEGACY API - Maintained for backward compatibility (DEPRECATED)
export {
  tabelKonstantaKonversiTahunJawa,
  tabelKonstantaKonversiTahunMasehi,
  cariTahunReferensi,
} from "./pelok.js";
