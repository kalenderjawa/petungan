/**
 * TEST SUITE v2.0.0 - Javanese ↔ Hijri Conversion Tests
 * 
 * IMPROVEMENTS:
 * 1. Added comprehensive input validation tests
 * 2. Added edge case handling tests
 * 3. Added warning message validation for historical years
 * 4. Enhanced test descriptions and documentation
 * 5. Added perfect reversibility validation (100% for Hijri conversions)
 */

import { 
  konversiTahunJawaKeTahunHijriyah,
  konversiTahunHijriyahKeTahunJawa,
  JAVANESE_CALENDAR_CONSTANTS,
} from "../index.js";

describe("ENHANCED: Test Konversi Jawa Ke Hijriyah", () => {
  it("Konversi Tahun Jawa 1555 adalah 1043 (base reference)", () => {
    expect(konversiTahunJawaKeTahunHijriyah(1555)).toBe(1043);
  });
  
  it("Konversi Tahun Jawa 1955 adalah 1443", () => {
    expect(konversiTahunJawaKeTahunHijriyah(1955)).toBe(1443);
  });
  
  it("should handle years before calendar correlation", () => {
    // Years before 1555 AJ should return unchanged (with warning)
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const result = konversiTahunJawaKeTahunHijriyah(1500);
    expect(result).toBe(1500);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Warning: Javanese year 1500 is before calendar standardization')
    );
    
    consoleSpy.mockRestore();
  });
  
  it("should handle modern years correctly", () => {
    expect(konversiTahunJawaKeTahunHijriyah(2000)).toBe(1488);
    expect(konversiTahunJawaKeTahunHijriyah(1958)).toBe(1446); // Current year
  });
  
  it("should throw error for invalid input", () => {
    expect(() => konversiTahunJawaKeTahunHijriyah("1555")).toThrow("Invalid Javanese year: must be an integer");
    expect(() => konversiTahunJawaKeTahunHijriyah(1555.5)).toThrow("Invalid Javanese year: must be an integer");
    expect(() => konversiTahunJawaKeTahunHijriyah(null)).toThrow("Invalid Javanese year: must be an integer");
    expect(() => konversiTahunJawaKeTahunHijriyah(undefined)).toThrow("Invalid Javanese year: must be an integer");
  });
  
  it("should use correct offset constant", () => {
    const offset = JAVANESE_CALENDAR_CONSTANTS.HIJRI_OFFSET;
    expect(offset).toBe(512);
    
    // Verify the calculation
    const jawaYear = 1800;
    const expectedHijri = jawaYear - offset;
    expect(konversiTahunJawaKeTahunHijriyah(jawaYear)).toBe(expectedHijri);
  });
});

describe("ENHANCED: Test konversi Hijriyah ke Jawa", () => {
  it("Konversi Tahun Hijriyah 1043 adalah 1555 (base reference)", () => {
    expect(konversiTahunHijriyahKeTahunJawa(1043)).toBe(1555);
  });

  it("Konversi Tahun Hijriyah 1403 adalah 1915", () => {
    expect(konversiTahunHijriyahKeTahunJawa(1403)).toBe(1915);
  });

  it("Konversi Tahun Hijriyah 1443 adalah 1955", () => {
    expect(konversiTahunHijriyahKeTahunJawa(1443)).toBe(1955);
  });
  
  it("should handle years before calendar correlation", () => {
    // Years before 1043 AH should return unchanged (with warning)
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const result = konversiTahunHijriyahKeTahunJawa(1000);
    expect(result).toBe(1000);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Warning: Hijri year 1000 is before Javanese calendar correlation')
    );
    
    consoleSpy.mockRestore();
  });
  
  it("should handle modern years correctly", () => {
    expect(konversiTahunHijriyahKeTahunJawa(1400)).toBe(1912);
    expect(konversiTahunHijriyahKeTahunJawa(1446)).toBe(1958); // Current year
  });
  
  it("should throw error for invalid input", () => {
    expect(() => konversiTahunHijriyahKeTahunJawa("1443")).toThrow("Invalid Hijri year: must be an integer");
    expect(() => konversiTahunHijriyahKeTahunJawa(1443.5)).toThrow("Invalid Hijri year: must be an integer");
    expect(() => konversiTahunHijriyahKeTahunJawa(NaN)).toThrow("Invalid Hijri year: must be an integer");
  });
});

describe("NEW: Perfect Reversibility Tests", () => {
  const testCases = [
    { jawa: 1555, hijri: 1043, description: "base reference" },
    { jawa: 1600, hijri: 1088, description: "early period" },
    { jawa: 1800, hijri: 1288, description: "middle period" },
    { jawa: 1955, hijri: 1443, description: "modern reference" },
    { jawa: 2000, hijri: 1488, description: "future reference" }
  ];
  
  testCases.forEach(({ jawa, hijri, description }) => {
    it(`should be perfectly reversible for ${description}`, () => {
      // Test Jawa → Hijri → Jawa
      const calculatedHijri = konversiTahunJawaKeTahunHijriyah(jawa);
      const backToJawa = konversiTahunHijriyahKeTahunJawa(calculatedHijri);
      expect(backToJawa).toBe(jawa);
      
      // Test Hijri → Jawa → Hijri
      const calculatedJawa = konversiTahunHijriyahKeTahunJawa(hijri);
      const backToHijri = konversiTahunJawaKeTahunHijriyah(calculatedJawa);
      expect(backToHijri).toBe(hijri);
    });
  });
});

describe("NEW: Mathematical Consistency Tests", () => {
  it("should maintain consistent offset calculation", () => {
    const baseOffset = JAVANESE_CALENDAR_CONSTANTS.BASE_JAWA - JAVANESE_CALENDAR_CONSTANTS.BASE_HIJRI;
    expect(baseOffset).toBe(512);
    
    // Test multiple years to ensure consistent offset
    const testYears = [1555, 1600, 1700, 1800, 1900, 2000];
    
    testYears.forEach(jawaYear => {
      const hijriYear = konversiTahunJawaKeTahunHijriyah(jawaYear);
      const calculatedOffset = jawaYear - hijriYear;
      expect(calculatedOffset).toBe(baseOffset);
    });
  });
  
  it("should handle edge cases at calendar correlation boundary", () => {
    // Test years right at the boundary
    const boundaryJawa = JAVANESE_CALENDAR_CONSTANTS.BASE_JAWA;
    const boundaryHijri = JAVANESE_CALENDAR_CONSTANTS.BASE_HIJRI;
    
    expect(konversiTahunJawaKeTahunHijriyah(boundaryJawa)).toBe(boundaryHijri);
    expect(konversiTahunHijriyahKeTahunJawa(boundaryHijri)).toBe(boundaryJawa);
    
    // Test years just before and after
    expect(konversiTahunJawaKeTahunHijriyah(boundaryJawa + 1)).toBe(boundaryHijri + 1);
    expect(konversiTahunHijriyahKeTahunJawa(boundaryHijri + 1)).toBe(boundaryJawa + 1);
  });
});

describe("NEW: Performance Tests", () => {
  it("should be performant for batch conversions", () => {
    const startTime = performance.now();
    
    // Convert 1000 years in both directions
    for (let i = 1555; i < 2555; i++) {
      konversiTahunJawaKeTahunHijriyah(i);
      konversiTahunHijriyahKeTahunJawa(i - 512);
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Should be very fast (less than 50ms for 2000 conversions)
    expect(duration).toBeLessThan(50);
  });
});
