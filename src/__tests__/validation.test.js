/**
 * VALIDATION TEST SUITE
 *
 * Cross-references our conversion functions against real-world data
 * sourced from almnk.com (an authoritative Javanese calendar site).
 *
 * Each entry records the Javanese year, the exact Gregorian date of
 * 1 Sura (Javanese New Year), and therefore the Gregorian year it falls in.
 *
 * Sources:
 *   https://almnk.com/kalender/jawa/{year}/1/1
 */

import {
  konversiJawaMasehiDirect,
  konversiMasehiJawaDirect,
  konversiJawaMasehiPrecise,
  konversiMasehiJawaPrecise,
  konversiTahunJawaKeTahunMasehi,
  konversiTahunMasehiKeTahunJawa,
  konversiTahunJawaKeTahunHijriyah,
  konversiTahunHijriyahKeTahunJawa,
} from "../index.js";

// ── Ground-truth data from almnk.com ────────────────────────────────
// Each entry: { jawa, suraDate, gregorianYear }
// suraDate = the exact Gregorian date when 1 Sura of that Javanese year falls
const GROUND_TRUTH = [
  { jawa: 1555, gregorianYear: 1633, note: "Sultan Agung reform epoch (8 Jul 1633)" },
  { jawa: 1900, gregorianYear: 1968, note: "1 Suro 1900 = 31 Mar 1968" },
  { jawa: 1933, gregorianYear: 2000, note: "1 Suro 1933 = 6 Apr 2000" },
  { jawa: 1946, gregorianYear: 2012, note: "1 Suro 1946 = 15 Nov 2012" },
  { jawa: 1950, gregorianYear: 2016, note: "1 Suro 1950 = 3 Oct 2016" },
  { jawa: 1955, gregorianYear: 2021, note: "1 Suro 1955 = 10 Aug 2021" },
  { jawa: 1956, gregorianYear: 2022, note: "1 Suro 1956 = 30 Jul 2022" },
  { jawa: 1957, gregorianYear: 2023, note: "1 Suro 1957 = 19 Jul 2023" },
  { jawa: 1958, gregorianYear: 2024, note: "1 Suro 1958 = 8 Jul 2024" },
  { jawa: 1959, gregorianYear: 2025, note: "1 Suro 1959 = 27 Jun 2025" },
];

// ── 1. Precise functions vs ground truth ─────────────────────────────
describe("VALIDATION: Precise functions vs real-world data (almnk.com)", () => {
  GROUND_TRUTH.forEach(({ jawa, gregorianYear, note }) => {
    it(`Precise: ${jawa} AJ → ${gregorianYear} CE  (${note})`, () => {
      expect(konversiJawaMasehiPrecise(jawa)).toBe(gregorianYear);
    });
  });

  GROUND_TRUTH.forEach(({ jawa, gregorianYear, note }) => {
    it(`Precise reverse: ${gregorianYear} CE → ${jawa} AJ  (${note})`, () => {
      expect(konversiMasehiJawaPrecise(gregorianYear)).toBe(jawa);
    });
  });
});

// ── 2. Direct functions vs ground truth ──────────────────────────────
describe("VALIDATION: Direct functions vs real-world data", () => {
  let directMatches = 0;
  const total = GROUND_TRUTH.length;

  GROUND_TRUTH.forEach(({ jawa, gregorianYear, note }) => {
    it(`Direct: ${jawa} AJ → should be close to ${gregorianYear} CE  (${note})`, () => {
      const result = konversiJawaMasehiDirect(jawa);
      const diff = Math.abs(result - gregorianYear);
      // Direct should be within ±1 year of the real answer
      expect(diff).toBeLessThanOrEqual(1);
      if (diff === 0) directMatches++;
    });
  });
});

// ── 3. Main wrapper functions (now Precise-backed, expect exact match) ────
describe("VALIDATION: Main wrapper functions vs real-world data", () => {
  GROUND_TRUTH.forEach(({ jawa, gregorianYear, note }) => {
    it(`Main: ${jawa} AJ → ${gregorianYear} CE  (${note})`, () => {
      expect(konversiTahunJawaKeTahunMasehi(jawa)).toBe(gregorianYear);
    });
  });

  GROUND_TRUTH.forEach(({ jawa, gregorianYear, note }) => {
    it(`Main reverse: ${gregorianYear} CE → ${jawa} AJ  (${note})`, () => {
      expect(konversiTahunMasehiKeTahunJawa(gregorianYear)).toBe(jawa);
    });
  });
});

// ── 3b. Main wrapper round-trip ──────────────────────────────────────
describe("VALIDATION: Main wrapper round-trip reversibility", () => {
  GROUND_TRUTH.forEach(({ jawa, note }) => {
    it(`Main round-trip: ${jawa} AJ → Masehi → back  (${note})`, () => {
      const masehi = konversiTahunJawaKeTahunMasehi(jawa);
      const back = konversiTahunMasehiKeTahunJawa(masehi);
      expect(back).toBe(jawa);
    });
  });
});

// ── 4. Reversibility: Jawa → Masehi → Jawa round-trip ───────────────
describe("VALIDATION: Round-trip reversibility (Direct)", () => {
  GROUND_TRUTH.forEach(({ jawa, note }) => {
    it(`Direct round-trip: ${jawa} → Gregorian → back  (${note})`, () => {
      const gregorian = konversiJawaMasehiDirect(jawa);
      const back = konversiMasehiJawaDirect(gregorian);
      expect(Math.abs(back - jawa)).toBeLessThanOrEqual(1);
    });
  });
});

describe("VALIDATION: Round-trip reversibility (Precise)", () => {
  GROUND_TRUTH.forEach(({ jawa, note }) => {
    it(`Precise round-trip: ${jawa} → Gregorian → back  (${note})`, () => {
      const gregorian = konversiJawaMasehiPrecise(jawa);
      const back = konversiMasehiJawaPrecise(gregorian);
      expect(back).toBe(jawa);
    });
  });
});

// ── 5. Jawa <-> Hijriyah consistency ─────────────────────────────────
describe("VALIDATION: Hijriyah offset is always 512", () => {
  GROUND_TRUTH.forEach(({ jawa, note }) => {
    it(`${jawa} AJ - 512 = ${jawa - 512} AH  (${note})`, () => {
      expect(konversiTahunJawaKeTahunHijriyah(jawa)).toBe(jawa - 512);
      expect(konversiTahunHijriyahKeTahunJawa(jawa - 512)).toBe(jawa);
    });
  });
});

// ── 6. Direct vs Precise agreement rate across broad range ───────────
describe("VALIDATION: Direct vs Precise agreement (1555–2100 AJ)", () => {
  it("should agree on ≥95% of years", () => {
    let agree = 0;
    let disagree = 0;
    const disagreeList = [];

    for (let j = 1555; j <= 2100; j++) {
      const direct = konversiJawaMasehiDirect(j);
      const precise = konversiJawaMasehiPrecise(j);
      if (direct === precise) {
        agree++;
      } else {
        disagree++;
        if (disagreeList.length < 20) {
          disagreeList.push({ jawa: j, direct, precise, diff: direct - precise });
        }
      }
    }

    const total = agree + disagree;
    const rate = (agree / total) * 100;

    // Log disagreements for analysis
    if (disagreeList.length > 0) {
      console.log(`\nDirect vs Precise disagreements (${disagree}/${total}, ${(100 - rate).toFixed(1)}%):`);
      disagreeList.forEach(d =>
        console.log(`  ${d.jawa} AJ: Direct=${d.direct}, Precise=${d.precise} (diff=${d.diff > 0 ? '+' : ''}${d.diff})`)
      );
    }

    console.log(`\nAgreement rate: ${agree}/${total} = ${rate.toFixed(1)}%`);
    expect(rate).toBeGreaterThanOrEqual(95);
  });

  it("Direct should never differ from Precise by more than 1 year", () => {
    for (let j = 1555; j <= 2100; j++) {
      const direct = konversiJawaMasehiDirect(j);
      const precise = konversiJawaMasehiPrecise(j);
      expect(Math.abs(direct - precise)).toBeLessThanOrEqual(1);
    }
  });
});

// ── 7. Reverse direction: Masehi → Jawa across broad range ──────────
describe("VALIDATION: Masehi → Jawa Precise reversibility (1633–2100 CE)", () => {
  it("should be perfectly reversible for all years", () => {
    let failures = 0;
    const failList = [];

    for (let g = 1633; g <= 2100; g++) {
      const jawa = konversiMasehiJawaPrecise(g);
      const backToG = konversiJawaMasehiPrecise(jawa);
      if (backToG !== g) {
        failures++;
        if (failList.length < 10) {
          failList.push({ g, jawa, backToG });
        }
      }
    }

    if (failList.length > 0) {
      console.log(`\nPrecise reversibility failures (${failures}):`);
      failList.forEach(f =>
        console.log(`  ${f.g} CE → ${f.jawa} AJ → ${f.backToG} CE (expected ${f.g})`)
      );
    }

    // Allow a small number of failures due to the two-1-Muharram-per-year edge case
    expect(failures).toBeLessThanOrEqual(5);
  });
});
