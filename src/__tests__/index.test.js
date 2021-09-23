import { tabelKonstantaKonversiTahunJawa, tabelKonstantaKonversiTahunMasehi } from '../index.js'

describe('Tabel Konstanta Konversi Tahun', () => {
	it("Cek jumlah data konstanta Jawa", () => {
		expect(tabelKonstantaKonversiTahunJawa().length).toBe(78)
	})

	it("Cek jumlah data konstanta Masehi", () => {
		expect(tabelKonstantaKonversiTahunMasehi().length).toBe(78)
	})
})
