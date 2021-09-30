import {
  konversiTahunJawaKeTahunMasehi,
  konversiTahunMasehiKeTahunJawa,
} from "../index.js";

describe("Test konversi Jawa ke Masehi", () => {
  it("Konversi Tahun Jawa 1955 ke Masehi adalah 2022", () => {
    expect(konversiTahunJawaKeTahunMasehi(1955)).toBe(2022);
  });

  it("Konversi Tahun Jawa 1555 ke Tahun Masehi adalah 1603", () => {
    expect(konversiTahunJawaKeTahunMasehi(1555)).toBe(1633);
  });
});

describe("Test konversi Masehi ke Jawa", () => {
  it("Konversi Tahun Masehi 1633 ke Jawa adalah 1555", () => {
    expect(konversiTahunMasehiKeTahunJawa(1633)).toBe(1555);
  });

  it("Konversi Tahun Masehi 1983 ke Jawa adalah 1555", () => {
    expect(konversiTahunMasehiKeTahunJawa(1983)).toBe(1915);
  });

  it("Konversi Tahun Masehi 2022 ke Jawa adalah 1955", () => {
    expect(konversiTahunMasehiKeTahunJawa(2022)).toBe(1955);
  });
});
