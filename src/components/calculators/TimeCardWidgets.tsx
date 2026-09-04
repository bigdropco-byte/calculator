'use client';

import React, { useState } from 'react';
import { calculateTimecardHours, calculateDateDifference } from '@/lib/calculators/dateTimeEngines';
import { calculateLeadTime, calculateHotelStay } from '@/lib/calculators/specializedTimeEngines';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Clock, Briefcase, Calendar, DollarSign, Hotel, Truck, Plus, Trash2 } from 'lucide-react';

// ==========================================
// 1. TIME CARD CALCULATOR
// ==========================================
interface ShiftRow {
  day: string;
  inTime: string;
  outTime: string;
  lunchMins: number;
}

export const TimeCardCalculatorWidget: React.FC = () => {
  const [shifts, setShifts] = useState<ShiftRow[]>([
    { day: 'Mon', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
    { day: 'Tue', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
    { day: 'Wed', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
    { day: 'Thu', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
    { day: 'Fri', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
  ]);
  const [hourlyWage, setHourlyWage] = useState<number>(22.5);

  const updateShift = (index: number, field: keyof ShiftRow, val: any) => {
    setShifts(prev => prev.map((s, i) => (i === index ? { ...s, [field]: val } : s)));
  };

  const addWeekend = () => {
    if (shifts.length === 5) {
      setShifts(prev => [
        ...prev,
        { day: 'Sat', inTime: '09:00', outTime: '14:00', lunchMins: 0 },
        { day: 'Sun', inTime: '00:00', outTime: '00:00', lunchMins: 0 },
      ]);
    }
  };

  const card = calculateTimecardHours(
    shifts.map(s => ({
      inTime: s.inTime,
      outTime: s.outTime,
      unpaidLunchMinutes: s.lunchMins,
    })),
    hourlyWage
  );

  const getResultText = () => {
    return `Weekly Time Card: ${card.totalHoursFormatted} total hours (${card.regularHours.toFixed(2)} regular, ${card.overtimeHours.toFixed(2)} overtime). Gross earnings: $${card.grossPay.toFixed(2)}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Hourly Base Rate ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={hourlyWage || ''}
                  onChange={e => setHourlyWage(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold text-sm w-36"
                />
              </div>
            </div>
          </div>

          {shifts.length === 5 && (
            <button
              type="button"
              onClick={addWeekend}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-end"
            >
              <Plus className="w-3.5 h-3.5" /> Include Sat & Sun
            </button>
          )}
        </div>

        {/* Timesheet Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                <th className="pb-2">Day</th>
                <th className="pb-2">Clock In</th>
                <th className="pb-2">Clock Out</th>
                <th className="pb-2">Lunch (Min)</th>
                <th className="pb-2 text-right">Daily Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shifts.map((s, idx) => {
                const shiftDetail = card.shiftBreakdowns[idx];
                return (
                  <tr key={s.day} className="hover:bg-slate-50/70">
                    <td className="py-2.5 font-bold text-slate-800">{s.day}</td>
                    <td className="py-2.5">
                      <input
                        type="time"
                        value={s.inTime}
                        onChange={e => updateShift(idx, 'inTime', e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-900"
                      />
                    </td>
                    <td className="py-2.5">
                      <input
                        type="time"
                        value={s.outTime}
                        onChange={e => updateShift(idx, 'outTime', e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-900"
                      />
                    </td>
                    <td className="py-2.5">
                      <input
                        type="number"
                        min="0"
                        max="180"
                        value={s.lunchMins}
                        onChange={e => updateShift(idx, 'lunchMins', Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-900">
                      {shiftDetail ? `${shiftDetail.hours.toFixed(2)} hrs` : '0.00 hrs'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Results summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 bg-indigo-50/70 border border-indigo-100 rounded-xl">
          <div>
            <span className="text-[11px] font-semibold text-indigo-800 uppercase block">Total Hours</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-mono">
              {card.totalHoursDecimal.toFixed(2)}
            </p>
            <span className="text-xs text-slate-500">{card.totalHoursFormatted}</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-indigo-800 uppercase block">Regular (≤40h)</span>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
              {card.regularHours.toFixed(2)}
            </p>
            <span className="text-xs text-slate-500">${(card.regularHours * hourlyWage).toFixed(2)}</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-indigo-800 uppercase block">Overtime (1.5x)</span>
            <p className="text-2xl sm:text-3xl font-bold text-amber-600 font-mono">
              {card.overtimeHours.toFixed(2)}
            </p>
            <span className="text-xs text-slate-500">${(card.overtimeHours * hourlyWage * 1.5).toFixed(2)}</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-indigo-800 uppercase block">Gross Pay</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
              ${card.grossPay.toFixed(2)}
            </p>
            <span className="text-xs text-slate-500">before taxes</span>
          </div>
        </div>

        <CalculatorActions
          resultText={getResultText()}
          onReset={() => {
            setShifts([
              { day: 'Mon', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
              { day: 'Tue', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
              { day: 'Wed', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
              { day: 'Thu', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
              { day: 'Fri', inTime: '08:30', outTime: '17:00', lunchMins: 30 },
            ]);
            setHourlyWage(22.5);
          }}
        />
      </div>
    </div>
  );
};

// ==========================================
// 2. PAYROLL HOURS CALCULATOR
// ==========================================
export const PayrollHoursCalculatorWidget: React.FC = () => {
  const [hours, setHours] = useState<number>(44);
  const [minutes, setMinutes] = useState<number>(15);
  const [hourlyRate, setHourlyRate] = useState<number>(28);
  const [otThreshold, setOtThreshold] = useState<number>(40);
  const [otRateMultiplier, setOtRateMultiplier] = useState<number>(1.5);

  const totalDecimalHours = hours + minutes / 60;
  const regularHours = Math.min(totalDecimalHours, otThreshold);
  const overtimeHours = Math.max(0, totalDecimalHours - otThreshold);

  const regularPay = regularHours * hourlyRate;
  const overtimePay = overtimeHours * hourlyRate * otRateMultiplier;
  const grossPay = regularPay + overtimePay;

  const getResultText = () => {
    return `Payroll Summary: ${totalDecimalHours.toFixed(2)} decimal hours (${regularHours.toFixed(2)} reg + ${overtimeHours.toFixed(2)} OT). Total Gross Pay: $${grossPay.toFixed(2)}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Total Hours
              </label>
              <input
                type="number"
                min="0"
                value={hours}
                onChange={e => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Minutes
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={e => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Hourly Pay Rate ($/hr)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={hourlyRate || ''}
              onChange={e => setHourlyRate(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                OT Weekly Threshold
              </label>
              <input
                type="number"
                min="0"
                value={otThreshold}
                onChange={e => setOtThreshold(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Overtime Multiplier
              </label>
              <select
                value={otRateMultiplier}
                onChange={e => setOtRateMultiplier(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
              >
                <option value={1.5}>1.5x (Time and a half)</option>
                <option value={2.0}>2.0x (Double time)</option>
                <option value={1.0}>1.0x (Straight time)</option>
              </select>
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setHours(44);
              setMinutes(15);
              setHourlyRate(28);
              setOtThreshold(40);
              setOtRateMultiplier(1.5);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Total Gross Payroll
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-700 font-mono tracking-tight">
                ${grossPay.toFixed(2)}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Decimal Hours: <strong>{totalDecimalHours.toFixed(2)} hrs</strong> ({hours}h {minutes}m)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Regular Earnings</span>
                <p className="text-xl font-bold text-slate-900">${regularPay.toFixed(2)}</p>
                <span className="text-[11px] text-slate-400">{regularHours.toFixed(2)} hrs</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Overtime Earnings</span>
                <p className="text-xl font-bold text-amber-600">${overtimePay.toFixed(2)}</p>
                <span className="text-[11px] text-slate-400">{overtimeHours.toFixed(2)} hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. HOTEL DAYS CALCULATOR
// ==========================================
export const HotelDaysCalculatorWidget: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState<string>(today);
  const [checkOutDate, setCheckOutDate] = useState<string>(nextWeek);
  const [ratePerNight, setRatePerNight] = useState<number>(175);
  const [taxRate, setTaxRate] = useState<number>(14); // 14% tax & resort fees

  const res = calculateHotelStay(checkInDate, checkOutDate, ratePerNight, taxRate);

  const getResultText = () => {
    return `Hotel Stay: ${res.nights} nights / ${res.hotelDays} calendar days (${checkInDate} to ${checkOutDate}). Total cost: $${res.totalCost.toFixed(2)} ($${res.roomSubtotal.toFixed(2)} room + $${res.taxesAndFees.toFixed(2)} taxes/fees).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={e => setCheckInDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={e => setCheckOutDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Nightly Room Rate ($/night)
            </label>
            <input
              type="number"
              min="0"
              value={ratePerNight || ''}
              onChange={e => setRatePerNight(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Taxes & Resort Fees (%)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              step="0.5"
              value={taxRate || ''}
              onChange={e => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setCheckInDate(today);
              setCheckOutDate(nextWeek);
              setRatePerNight(175);
              setTaxRate(14);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Total Stay Duration & Cost
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {res.nights} <span className="text-xl font-bold text-indigo-800">nights</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                {res.hotelDays} calendar days (Check-out morning: {res.checkoutDay})
              </p>
            </div>

            <div className="mt-6 p-4 bg-white border border-indigo-200 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Room Subtotal ({res.nights} nights @ ${ratePerNight}):</span>
                <span className="font-bold text-slate-900">${res.roomSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Taxes & Fees ({taxRate}%):</span>
                <span className="font-bold text-slate-900">${res.taxesAndFees.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm">
                <span className="font-bold text-slate-800">Total Est. Stay:</span>
                <span className="font-extrabold text-emerald-600">${res.totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. LEAD TIME CALCULATOR
// ==========================================
export const LeadTimeCalculatorWidget: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const [orderDate, setOrderDate] = useState<string>(today);
  const [mfgDays, setMfgDays] = useState<number>(10);
  const [transitDays, setTransitDays] = useState<number>(4);
  const [bufferDays, setBufferDays] = useState<number>(2);

  const res = calculateLeadTime(orderDate, mfgDays, transitDays, bufferDays);

  const getResultText = () => {
    return `Supply Chain Lead Time: ${res.totalLeadDays} total days (${mfgDays}d mfg + ${transitDays}d transit + ${bufferDays}d buffer). Estimated arrival: ${res.estimatedArrival} (${res.arrivalDayOfWeek}).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Order Placement Date
            </label>
            <input
              type="date"
              value={orderDate}
              onChange={e => setOrderDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Manufacturing / Production Days
            </label>
            <input
              type="number"
              min="0"
              value={mfgDays || ''}
              onChange={e => setMfgDays(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Shipping & Transit Days
            </label>
            <input
              type="number"
              min="0"
              value={transitDays || ''}
              onChange={e => setTransitDays(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Quality Inspection / Buffer Days
            </label>
            <input
              type="number"
              min="0"
              value={bufferDays || ''}
              onChange={e => setBufferDays(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setOrderDate(today);
              setMfgDays(10);
              setTransitDays(4);
              setBufferDays(2);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Estimated Delivery Date
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">
                {res.estimatedArrival}
              </div>
              <div className="mt-1 text-base font-semibold text-indigo-700">
                {res.arrivalDayOfWeek}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Total turnaround: <strong>{res.totalLeadDays} calendar days</strong>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="p-2.5 bg-white border border-indigo-200 rounded-lg text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Production</span>
                <p className="text-lg font-bold text-slate-900">{mfgDays}d</p>
              </div>
              <div className="p-2.5 bg-white border border-indigo-200 rounded-lg text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Transit</span>
                <p className="text-lg font-bold text-slate-900">{transitDays}d</p>
              </div>
              <div className="p-2.5 bg-white border border-indigo-200 rounded-lg text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Buffer</span>
                <p className="text-lg font-bold text-slate-900">{bufferDays}d</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
