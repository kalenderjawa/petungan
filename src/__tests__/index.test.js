import {
  tabelKonstantaKonversiTahunJawa,
  tabelKonstantaKonversiTahunMasehi,
  cariTahunReferensi,
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
    expect(cariTahunReferensi(tabelKonstantaKonversiTahunJawa(), 1555)?.konstan).toBe(78);
  });
  it("Konstanta Konversi Tahun Jawa 2000 adalah 65", () => {
    expect(cariTahunReferensi(tabelKonstantaKonversiTahunJawa(), 2000)?.konstan).toBe(65);
  });
  it("Konstanta Konversi Tahun Jawa 3288 adalah 28", () => {
    expect(cariTahunReferensi(tabelKonstantaKonversiTahunJawa(), 3288)?.konstan).toBe(28);
  });
});
