'use client';

import React, { useState } from 'react';
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
} from '@/lib/calculators/textAndPackingEngines';

// ----------------------------------------------------------------------
// 1. Word Counter Widget
// ----------------------------------------------------------------------
export function WordCounterWidget() {
  const [text, setText] = useState<string>(
    'Antigravity calculators provide lightning-fast mathematical computations directly inside your web browser with zero server latency.'
  );

  const res = calculateWordCount(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Paste or Type Text Below
        </label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste content here..."
          className="w-full text-base p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-sans"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500 font-medium">Words</div>
          <div className="text-3xl font-extrabold text-sky-700 mt-1">{res.words.toLocaleString()}</div>
          <div className="text-[11px] text-sky-600 mt-0.5">{res.paragraphs} paragraphs</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500 font-medium">Characters (all)</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.charactersWithSpaces.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{res.charactersWithoutSpaces.toLocaleString()} no spaces</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <div className="text-xs text-emerald-700 font-medium">Reading Time</div>
          <div className="text-3xl font-extrabold text-emerald-800 mt-1">{res.readingTimeMinutes} m</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">@ 225 wpm</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500 font-medium">Speaking Time</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.speakingTimeMinutes} m</div>
          <div className="text-[11px] text-slate-500 mt-0.5">@ 130 wpm</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Korean Character Counter Widget
// ----------------------------------------------------------------------
export function KoreanCharacterWidget() {
  const [text, setText] = useState<string>(
    '안녕하세요. 빠르고 정확한 한국어 글자수 세기 및 바이트 수 계산기입니다. 자기소개서 글자수 제한을 실시간으로 확인하세요.'
  );

  const res = calculateKoreanCharacters(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          한국어 텍스트 입력 (Korean Text)
        </label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-base p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">공백 포함 글자수</div>
          <div className="text-3xl font-extrabold text-sky-700 mt-1">{res.totalCharacters}</div>
          <div className="text-[11px] text-sky-600 mt-0.5">자</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">공백 제외 글자수</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.charactersWithoutSpaces}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">자</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center">
          <div className="text-xs text-purple-700">EUC-KR 바이트</div>
          <div className="text-3xl font-extrabold text-purple-800 mt-1">{res.euckrBytes}</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Bytes (한글 2B)</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">UTF-8 바이트</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.utf8Bytes}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Bytes (한글 3B)</div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">자소서 글자수 제한 현황 (Job Application Limits)</div>
        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span>500자 기준</span>
              <span className="font-bold">{res.resumeLimits.limit500.count} / 500자 ({res.resumeLimits.limit500.percent}%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${res.resumeLimits.limit500.passed ? 'bg-sky-500' : 'bg-rose-500'}`} style={{ width: `${res.resumeLimits.limit500.percent}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>1,000자 기준</span>
              <span className="font-bold">{res.resumeLimits.limit1000.count} / 1000자 ({res.resumeLimits.limit1000.percent}%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${res.resumeLimits.limit1000.passed ? 'bg-sky-500' : 'bg-rose-500'}`} style={{ width: `${res.resumeLimits.limit1000.percent}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. Japanese Character Counter Widget
// ----------------------------------------------------------------------
export function JapaneseCharacterWidget() {
  const [text, setText] = useState<string>(
    '日本語の文章を入力してください。漢字、ひらがな、カタカナ、原稿用紙の枚数を瞬時に計算します。'
  );

  const res = calculateJapaneseCharacters(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          日本語テキスト入力 (Japanese Text)
        </label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-base p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">総文字数</div>
          <div className="text-3xl font-extrabold text-sky-700 mt-1">{res.totalCharacters}</div>
          <div className="text-[11px] text-sky-600 mt-0.5">文字</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <div className="text-xs text-emerald-700">原稿用紙</div>
          <div className="text-3xl font-extrabold text-emerald-800 mt-1">{res.genkoYoshiSheets}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">枚 (400字詰)</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">漢字 (Kanji)</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.kanjiCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">文字</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">ひらがな / カタカナ</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.hiraganaCount + res.katakanaCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">平: {res.hiraganaCount} / 片: {res.katakanaCount}</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. Twitter / X Character Counter Widget
// ----------------------------------------------------------------------
export function TwitterCharacterWidget() {
  const [text, setText] = useState<string>(
    'Building modern, search-first calculator experiences with zero bloat at https://calculat.dev! 🚀 #webdev #math'
  );

  const res = calculateTwitterCharacters(text);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Tweet Text (X Post)</label>
          <span className={`text-xs font-bold ${res.isOverLimit ? 'text-rose-600' : 'text-slate-500'}`}>
            {res.weightedLength} / {res.maxLimit}
          </span>
        </div>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`w-full text-base p-3 bg-white border rounded-xl focus:ring-2 ${
            res.isOverLimit ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-sky-500'
          }`}
        />
        <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full ${res.isOverLimit ? 'bg-rose-500' : 'bg-sky-500'}`}
            style={{ width: `${Math.min(100, res.percentageUsed)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">Remaining Chars</div>
          <div className={`text-3xl font-extrabold mt-1 ${res.remainingCharacters < 0 ? 'text-rose-600' : 'text-sky-700'}`}>
            {res.remainingCharacters}
          </div>
          <div className="text-[11px] text-sky-600 mt-0.5">{res.percentageUsed}% used</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">URLs (23 Chars ea)</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.urlCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">t.co wrapped</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Emojis</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.emojiCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">2 chars each</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">CJK Characters</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.cjkCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">2 chars each</div>
        </div>
      </div>

      {res.threadSplits.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">Suggested Tweet Thread Breakdown:</div>
          {res.threadSplits.map((split, i) => (
            <div key={i} className="p-2 bg-white rounded border border-amber-200 text-xs text-slate-700">
              {split}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// 5. Chinese Character Counter Widget
// ----------------------------------------------------------------------
export function ChineseCharacterWidget() {
  const [text, setText] = useState<string>(
    '欢迎使用中文汉字计数器。快速统计中文字数、标点符号、英文单词以及千字版面估算。'
  );

  const res = calculateChineseCharacters(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          中文文本输入 (Chinese Text)
        </label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-base p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">中文字数 (汉字)</div>
          <div className="text-3xl font-extrabold text-sky-700 mt-1">{res.chineseHanziCharacters}</div>
          <div className="text-[11px] text-sky-600 mt-0.5">字 (不含标点)</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">总字符数</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.totalCharacters}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">含标点与空格</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <div className="text-xs text-emerald-700">千字数 (版面)</div>
          <div className="text-3xl font-extrabold text-emerald-800 mt-1">{res.thousandCharactersCount}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">千字</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">阅读时长</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.readingTimeMinutes} m</div>
          <div className="text-[11px] text-slate-500 mt-0.5">~350字/分钟</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. Shipping Box Size Widget
// ----------------------------------------------------------------------
export function ShippingBoxSizeWidget() {
  const [l, setL] = useState<number>(20);
  const [w, setW] = useState<number>(14);
  const [h, setH] = useState<number>(12);
  const [wt, setWt] = useState<number>(15);

  const res = calculateShippingBoxSize({
    length: l,
    width: w,
    height: h,
    actualWeightLbs: wt,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Length (in)</label>
          <input type="number" value={l} onChange={(e) => setL(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Width (in)</label>
          <input type="number" value={w} onChange={(e) => setW(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Height (in)</label>
          <input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Actual Wt (lbs)</label>
          <input type="number" value={wt} onChange={(e) => setWt(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">FedEx / UPS Billable</div>
          <div className="text-3xl font-extrabold text-sky-700 mt-1">{res.billableWeightFedexUps} lbs</div>
          <div className="text-[11px] text-sky-600 mt-0.5">DIM: {res.fedexUpsDimWeightLbs} lbs</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">USPS Billable</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.billableWeightUsps} lbs</div>
          <div className="text-[11px] text-slate-500 mt-0.5">DIM: {res.uspsDimWeightLbs} lbs</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Length + Girth</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.lengthPlusGirth}"</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{res.isOversize ? '⚠ Oversize' : 'Standard'}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Cubic Volume</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{res.cubicFeet} ft³</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{res.cubicInches} in³</div>
        </div>
      </div>

      {res.oversizeAlert && (
        <div className="p-4 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-medium">
          ⚠ {res.oversizeAlert}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// 7. Box Packing Widget (3D Item in Container)
// ----------------------------------------------------------------------
export function BoxPackingWidget() {
  const [cl, setCl] = useState<number>(24);
  const [cw, setCw] = useState<number>(18);
  const [ch, setCh] = useState<number>(12);
  const [il, setIl] = useState<number>(6);
  const [iw, setIw] = useState<number>(4);
  const [ih, setIh] = useState<number>(3);

  const res = calculateBoxPacking({
    containerLength: cl,
    containerWidth: cw,
    containerHeight: ch,
    itemLength: il,
    itemWidth: iw,
    itemHeight: ih,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-50 border rounded-xl space-y-2">
          <div className="text-xs font-bold text-slate-700">Master Box / Shipping Container (L × W × H)</div>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" value={cl} onChange={(e) => setCl(Number(e.target.value))} className="text-base p-2 border rounded-lg bg-white" placeholder="L" />
            <input type="number" value={cw} onChange={(e) => setCw(Number(e.target.value))} className="text-base p-2 border rounded-lg bg-white" placeholder="W" />
            <input type="number" value={ch} onChange={(e) => setCh(Number(e.target.value))} className="text-base p-2 border rounded-lg bg-white" placeholder="H" />
          </div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl space-y-2">
          <div className="text-xs font-bold text-slate-700">Item Box / Retail Package (l × w × h)</div>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" value={il} onChange={(e) => setIl(Number(e.target.value))} className="text-base p-2 border rounded-lg bg-white" placeholder="l" />
            <input type="number" value={iw} onChange={(e) => setIw(Number(e.target.value))} className="text-base p-2 border rounded-lg bg-white" placeholder="w" />
            <input type="number" value={ih} onChange={(e) => setIh(Number(e.target.value))} className="text-base p-2 border rounded-lg bg-white" placeholder="h" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">Max Packed Items</div>
          <div className="text-3xl font-extrabold text-sky-700 mt-1">{res.maxPackedCount}</div>
          <div className="text-[11px] text-sky-600 mt-0.5">items fit</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <div className="text-xs text-emerald-700">Space Utilization</div>
          <div className="text-3xl font-extrabold text-emerald-800 mt-1">{res.utilizationPercent}%</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">pack efficiency</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Orientation (X × Y × Z)</div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {res.bestOrientation.itemsX} × {res.bestOrientation.itemsY} × {res.bestOrientation.itemsZ}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">optimal axis</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Wasted Void</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.wastedVolume}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">cu units</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 8. Moving & Packing Calculator Widget
// ----------------------------------------------------------------------
export function MovingPackingWidget() {
  const [home, setHome] = useState<any>('2bed');
  const [people, setPeople] = useState<number>(2);
  const [density, setDensity] = useState<any>('average');

  const res = calculateMovingPacking({
    homeType: home,
    numberOfPeople: people,
    lifestyleDensity: density,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Home Size</label>
          <select value={home} onChange={(e) => setHome(e.target.value)} className="w-full text-base p-2.5 border rounded-lg bg-white">
            <option value="studio">Studio Apartment</option>
            <option value="1bed">1-Bedroom Home</option>
            <option value="2bed">2-Bedroom Home</option>
            <option value="3bed">3-Bedroom Home</option>
            <option value="4bed+">4+ Bedroom Home</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Occupants</label>
          <input type="number" min="1" value={people} onChange={(e) => setPeople(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Lifestyle Density</label>
          <select value={density} onChange={(e) => setDensity(e.target.value)} className="w-full text-base p-2.5 border rounded-lg bg-white">
            <option value="minimalist">Minimalist</option>
            <option value="average">Average Household</option>
            <option value="collector">Collector / Heavily Furnished</option>
          </select>
        </div>
      </div>

      <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl text-center">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Total Moving Boxes Needed</div>
        <div className="text-5xl font-extrabold text-sky-700 my-1">{res.totalBoxes}</div>
        <div className="text-xs text-sky-800 font-medium mt-1">Recommended Vehicle: {res.estimatedTruckSize}</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50 border rounded-xl text-center">
          <div className="text-xs text-slate-500">Small Boxes (1.5 cf)</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.smallBoxes}</div>
          <div className="text-[10px] text-slate-400">books & heavy</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl text-center">
          <div className="text-xs text-slate-500">Medium Boxes (3 cf)</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.mediumBoxes}</div>
          <div className="text-[10px] text-slate-400">kitchen & pots</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl text-center">
          <div className="text-xs text-slate-500">Large Boxes (4.5 cf)</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.largeBoxes}</div>
          <div className="text-[10px] text-slate-400">linens & pillows</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl text-center">
          <div className="text-xs text-slate-500">Wardrobe Boxes</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.wardrobeBoxes}</div>
          <div className="text-[10px] text-slate-400">hanging closets</div>
        </div>
      </div>

      <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-1 text-slate-600">
        <div className="font-semibold text-slate-700">Supplies & Accessories:</div>
        <div>• Packing Tape: <strong>{res.tapeRolls} rolls</strong> (55 yards ea)</div>
        <div>• Bubble Wrap: <strong>{res.bubbleWrapFeet} linear ft</strong></div>
        <div>• Packing Paper: <strong>{res.packingPaperLbs} lbs</strong> for fragile dishware</div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 9. ASQ Calculator Widget (Ages & Stages Questionnaires)
// ----------------------------------------------------------------------
export function AsqWidget() {
  const [bDate, setBDate] = useState<string>('2024-03-15');
  const [sDate, setSDate] = useState<string>('2024-11-15');
  const [gw, setGw] = useState<number>(34);

  const res = calculateAsq({
    mode: 'asq3_age',
    birthDate: bDate,
    screeningDate: sDate,
    gestationalWeeks: gw,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Child Birth Date</label>
          <input type="date" value={bDate} onChange={(e) => setBDate(e.target.value)} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Screening Date</label>
          <input type="date" value={sDate} onChange={(e) => setSDate(e.target.value)} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Weeks of Gestation (&lt;37 premature)</label>
          <input type="number" min="20" max="42" value={gw} onChange={(e) => setGw(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
      </div>

      <div className="p-6 bg-sky-50 border border-sky-100 rounded-2xl text-center">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Recommended ASQ-3 Questionnaire</div>
        <div className="text-4xl sm:text-5xl font-extrabold text-sky-700 my-2">
          {res.recommendedInterval}-Month Interval
        </div>
        <div className="text-xs text-sky-800 font-medium">
          {res.isPrematureAdjusted ? `✓ Adjusted for prematurity (${gw} weeks gestation)` : 'Standard full-term chronological age'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-slate-50 border rounded-xl text-center">
          <div className="text-xs text-slate-500">Chronological Age</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.chronologicalAgeMonths} mo</div>
        </div>
        <div className="p-4 bg-slate-50 border rounded-xl text-center">
          <div className="text-xs text-slate-500">Prematurity-Adjusted Age</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{res.adjustedAgeMonths} mo</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 10. Age Difference Calculator Widget
// ----------------------------------------------------------------------
export function AgeDifferenceWidget() {
  const [d1, setD1] = useState<string>('1992-04-10');
  const [d2, setD2] = useState<string>('1997-09-25');

  const res = calculateAgeDifference({ birthDate1: d1, birthDate2: d2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Person 1 Date of Birth</label>
          <input type="date" value={d1} onChange={(e) => setD1(e.target.value)} className="w-full text-base p-2.5 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Person 2 Date of Birth</label>
          <input type="date" value={d2} onChange={(e) => setD2(e.target.value)} className="w-full text-base p-2.5 border rounded-lg bg-white" />
        </div>
      </div>

      <div className="p-6 bg-sky-50 border border-sky-100 rounded-2xl text-center">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Age Difference</div>
        <div className="text-3xl sm:text-4xl font-extrabold text-sky-700 my-2">
          {res.years} years, {res.months} months, {res.days} days
        </div>
        <div className="text-xs text-sky-800 font-medium">
          {res.olderPerson} is older by {res.totalDays.toLocaleString()} days ({res.totalWeeks.toLocaleString()} weeks)
        </div>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">"Half Your Age Plus Seven" Rule Test:</div>
        <div className="text-sm font-semibold text-slate-900">
          {res.halfAgePlusSevenCheck.explanation}
        </div>
        <div className="text-xs text-slate-500">
          Min acceptable partner age for older person: {res.halfAgePlusSevenCheck.olderPersonMinPartnerAge} years old.
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 11. Video Speed Calculator Widget
// ----------------------------------------------------------------------
export function VideoSpeedWidget() {
  const [h, setH] = useState<number>(1);
  const [m, setM] = useState<number>(30);
  const [s, setS] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1.5);

  const res = calculateVideoSpeed({
    hours: h,
    minutes: m,
    seconds: s,
    playbackSpeed: speed,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Hours</label>
          <input type="number" min="0" value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Minutes</label>
          <input type="number" min="0" max="59" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Seconds</label>
          <input type="number" min="0" max="59" value={s} onChange={(e) => setS(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          <span>Playback Speed</span>
          <span className="font-bold text-sky-600">{speed}x</span>
        </div>
        <div className="flex gap-2 mb-2">
          {[1.25, 1.5, 1.75, 2.0].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setSpeed(preset)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                speed === preset ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {preset}x
            </button>
          ))}
        </div>
        <input
          type="range"
          min="0.5"
          max="3.0"
          step="0.05"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-sky-600"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-center">
          <div className="text-xs text-slate-500">New Watch Time</div>
          <div className="text-2xl font-extrabold text-sky-700 mt-1">{res.newFormatted}</div>
          <div className="text-[11px] text-sky-600 mt-0.5">at {speed}x speed</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <div className="text-xs text-emerald-700">Time Saved</div>
          <div className="text-2xl font-extrabold text-emerald-800 mt-1">{res.timeSavedFormatted}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">{res.percentageSaved}% faster</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center col-span-2 sm:col-span-1">
          <div className="text-xs text-slate-500">Original Duration</div>
          <div className="text-xl font-bold text-slate-800 mt-1">{res.originalFormatted}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">at 1.0x speed</div>
        </div>
      </div>
    </div>
  );
}
