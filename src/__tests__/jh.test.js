/**
 * Test untuk konversi Jawa ke Hijriyah dan sebaliknya
 */

import { 
  konversiTahunJawaKeTahunHijriyah,
  konversiTahunHijriyahKeTahunJawa,
} from "../index.js";

describe("Test Konversi Jawa Ke Hijriyah", () => {
  it("Konversi Tahun Jawa 1555 adalah 1043", () => {
    expect(konversiTahunJawaKeTahunHijriyah(1555)).toBe(1043);
  });
  it("Konversi Tahun Jawa 1955 adalah 1443", () => {
    expect(konversiTahunJawaKeTahunHijriyah(1955)).toBe(1443);
  });
  it("Konversi Tahun Jawa 2500 adalah 1500", () => {
    expect(konversiTahunJawaKeTahunHijriyah(1500)).toBe(1500);
  });
});

describe("Test konversi Hijriyah ke Jawa", () => {
  it("Konversi Tahun Hijriyah 1403 adalah 1915", () => {
    expect(konversiTahunHijriyahKeTahunJawa(1403)).toBe(1915);
  });

  it("Konversi Tahun Hijriyah 1443 adalah 1955", () => {
    expect(konversiTahunHijriyahKeTahunJawa(1443)).toBe(1955);
  });
});
