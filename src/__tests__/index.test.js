import {
  tabelKonstantaKonversiTahunJawa,
  tabelKonstantaKonversiTahunMasehi,
  cariTahunReferensi,
  cariTahunReferensiJawa,
  cariTahunReferensiMasehi,
  konversiTahunJawaKeTahunHijriyah,
  konversiTahunHijriyahKeTahunJawa,
  konversiTahunJawaKeTahunMasehi,
  konversiTahunMasehiKeTahunJawa,
} from "../index.js";


describe("Tabel Konstanta Konversi Tahun", () => {
  it("Cek jumlah data konstanta Jawa", () => {
    expect(tabelKonstantaKonversiTahunJawa().length).toBe(78);
  });

  it("Cek jumlah data konstanta Masehi", () => {
    expect(tabelKonstantaKonversiTahunMasehi().length).toBe(78);
  });
});

describe("Test Cari Konstanta Konversi Tahun Referensi Jawa", () => {
  it("Konstanta Konversi Tahun Jawa 1555 adalah 78", () => {
    expect(
      cariTahunReferensi(tabelKonstantaKonversiTahunJawa(), 1555)?.konstan
    ).toBe(78);
  });
  it("Konstanta Konversi Tahun Jawa 2000 adalah 65", () => {
    expect(
      cariTahunReferensi(tabelKonstantaKonversiTahunJawa(), 2000)?.konstan
    ).toBe(65);
  });
  it("Konstanta Konversi Tahun Jawa 3288 adalah 28", () => {
    expect(
      cariTahunReferensi(tabelKonstantaKonversiTahunJawa(), 3288)?.konstan
    ).toBe(28);
  });
});

describe("Test Cari Konstanta Konversi Tahun Referensi Masehi", () => {
  it("Konstanta Konversi Tahun Jawa 1633 adalah 78", () => {
    expect(
      cariTahunReferensi(tabelKonstantaKonversiTahunMasehi(), 1633)?.konstan
    ).toBe(78);
  });
  it("Konstanta Konversi Tahun Jawa 2022 adalah 67", () => {
    expect(
      cariTahunReferensi(tabelKonstantaKonversiTahunMasehi(), 2022)?.konstan
    ).toBe(67);
  });
  it("Konstanta Konversi Tahun Jawa 2890 adalah 42", () => {
    expect(
      cariTahunReferensi(tabelKonstantaKonversiTahunMasehi(), 2890)?.konstan
    ).toBe(42);
  });
});

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

describe("Test konversi Jawa ke Masehi", () => {
  it("Konversi Tahun Jawa 1955 ke Masehi adalah 2022", () => {
    expect(konversiTahunJawaKeTahunMasehi(1955)).toBe(2022);
  });

  it("Konversi Tahun Jawa 1555 ke Tahun Masehi adalah 1603", () => {
    expect(konversiTahunJawaKeTahunMasehi(1555)).toBe(1633);
  });
});
