import { describe, it, expect } from 'vitest';
import {
  calculateWordCount,
  calculateKoreanCharacters,
  calculateJapaneseCharacters,
  calculateTwitterCharacters,
  calculateChineseCharacters,
  calculateShippingBoxSize,
  calculateBoxPacking,
  calculateMovingPacking,
  calculateAsq,
  calculateAgeDifference,
  calculateVideoSpeed,
} from '../textAndPackingEngines';

describe('Text and Packaging Engines', () => {
  it('calculates word and character counts', () => {
    const res = calculateWordCount('Hello world! This is a test sentence.');
    expect(res.words).toBe(7);
    expect(res.charactersWithSpaces).toBe(37);
    expect(res.readingTimeMinutes).toBeGreaterThan(0);
  });

  it('calculates Korean characters and bytes', () => {
    const res = calculateKoreanCharacters('안녕하세요 Hello 123');
    expect(res.hangulSyllables).toBe(5);
    expect(res.englishLetters).toBe(5);
    expect(res.numbers).toBe(3);
    expect(res.utf8Bytes).toBeGreaterThan(res.euckrBytes);
  });

  it('calculates Japanese Kanji, Hiragana and Katakana', () => {
    const res = calculateJapaneseCharacters('日本語のテストです。');
    expect(res.kanjiCount).toBe(3);
    expect(res.hiraganaCount).toBe(3);
    expect(res.katakanaCount).toBe(3);
    expect(res.genkoYoshiSheets).toBe(1);
  });

  it('calculates Twitter/X character limits and weights', () => {
    const res = calculateTwitterCharacters('Check this out: https://example.com/test');
    expect(res.urlCount).toBe(1);
    expect(res.weightedLength).toBe(16 + 23); // 16 chars + 23 url
    expect(res.isOverLimit).toBe(false);
  });

  it('calculates Chinese Hanzi characters and reading time', () => {
    const res = calculateChineseCharacters('这是一个测试句子。');
    expect(res.chineseHanziCharacters).toBe(8);
    expect(res.punctuationCount).toBe(1);
  });

  it('calculates shipping box dimensional weight and oversize', () => {
    const res = calculateShippingBoxSize({
      length: 20,
      width: 15,
      height: 10,
      actualWeightLbs: 12,
    });
    expect(res.cubicInches).toBe(3000);
    expect(res.fedexUpsDimWeightLbs).toBe(Math.ceil(3000 / 139));
    expect(res.isOversize).toBe(false);
  });

  it('calculates 3D box packing into a container', () => {
    const res = calculateBoxPacking({
      containerLength: 20,
      containerWidth: 20,
      containerHeight: 20,
      itemLength: 5,
      itemWidth: 5,
      itemHeight: 5,
    });
    expect(res.maxPackedCount).toBe(64); // 4 * 4 * 4 = 64
    expect(res.utilizationPercent).toBe(100);
  });

  it('calculates moving supplies', () => {
    const res = calculateMovingPacking({
      homeType: '2bed',
      numberOfPeople: 2,
      lifestyleDensity: 'average',
    });
    expect(res.totalBoxes).toBeGreaterThan(60);
    expect(res.tapeRolls).toBeGreaterThan(3);
  });

  it('calculates ASQ-3 age and interval with prematurity', () => {
    const res = calculateAsq({
      mode: 'asq3_age',
      birthDate: '2024-01-01',
      screeningDate: '2024-07-01', // ~6 months
      gestationalWeeks: 34, // 6 weeks premature
    });
    expect(res.isPrematureAdjusted).toBe(true);
    expect(res.recommendedInterval).toBeDefined();
  });

  it('calculates age difference and half-age-plus-seven rule', () => {
    const res = calculateAgeDifference({
      birthDate1: '1990-05-15',
      birthDate2: '1995-08-20',
    });
    expect(res.years).toBe(5);
    expect(res.halfAgePlusSevenCheck).toBeDefined();
  });

  it('calculates video speedup savings', () => {
    const res = calculateVideoSpeed({
      hours: 1,
      minutes: 0,
      seconds: 0,
      playbackSpeed: 1.5,
    });
    expect(res.percentageSaved).toBeCloseTo(33.3, 1);
    expect(res.timeSavedSeconds).toBe(1200); // 3600 - 2400 = 1200s (20m)
  });
});
