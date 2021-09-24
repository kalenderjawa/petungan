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

describe("Test Cari Tahun Referensi", () => {
  it("konstanta konversi tahun masehi", () => {
    expect(cariTahunReferensi(tabelKonstantaKonversiTahunJawa(), 2000)?.konstan).toBe(68);
  });
});
