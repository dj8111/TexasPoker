import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Clock, DollarSign, PieChart, Plus, Trash2, Play, Pause, RotateCcw } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface TournamentRecord {
  id: string;
  name: string;
  date: string;
  buyIn: number;
  payout: number;
  itm: boolean;
  notes?: string;
}

interface ToolboxViewProps {
  lang: Language;
}

// 每一盲注級別的時長（秒）
const LEVEL_DURATION_SEC = 900; // 15 分鐘

/** 驗證 localStorage 讀出的 MTT 記錄是否符合安全格式 */
function isValidTournamentRecords(data: unknown): data is TournamentRecord[] {
  if (!Array.isArray(data)) return false;
  return data.every(
    (r) =>
      r !== null &&
      typeof r === 'object' &&
      typeof r.id === 'string' &&
      typeof r.name === 'string' &&
      typeof r.date === 'string' &&
      typeof r.buyIn === 'number' &&
      typeof r.payout === 'number' &&
      typeof r.itm === 'boolean'
  );
}

export const ToolboxView: React.FC<ToolboxViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].toolbox;
  const [activeTool, setActiveTool] = useState<'odds' | 'spr' | 'tracker' | 'clock'>('odds');

  // 1. Odds Calculator State
  const [potSize, setPotSize] = useState<number>(1000);
  const [betSize, setBetSize] = useState<number>(500);

  const totalPotAfterCall = potSize + betSize + betSize;
  const requiredEquity = totalPotAfterCall > 0 ? ((betSize / totalPotAfterCall) * 100).toFixed(1) : '0';
  const oddsRatio = betSize > 0 ? ((potSize + betSize) / betSize).toFixed(1) : '0';

  // 2. SPR Calculator State
  const [sprStack, setSprStack] = useState<number>(20000);
  const [sprPot, setSprPot] = useState<number>(4500);
  const sprValue = sprPot > 0 ? (sprStack / sprPot).toFixed(2) : '0';

  // 3. Tournament Bankroll Tracker State
  const [records, setRecords] = useState<TournamentRecord[]>(() => {
    const saved = localStorage.getItem('poker_academy_mtt_records');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 安全驗證：檢查資料結構是否正確，防止惡意修改 localStorage
        if (isValidTournamentRecords(parsed)) {
          return parsed;
        }
        // 結構不符時清除損毀的資料
        localStorage.removeItem('poker_academy_mtt_records');
      } catch (e) {
        // JSON 解析失敗時清除損毀的資料
        localStorage.removeItem('poker_academy_mtt_records');
      }
    }
    return [
      { id: '1', name: 'APT Taipei Warm-up', date: '2026-08-15', buyIn: 500, payout: 1850, itm: true },
      { id: '2', name: 'WPT Prime Deepstack', date: '2026-08-20', buyIn: 1100, payout: 0, itm: false }
    ];
  });

  const [tourName, setTourName] = useState('');
  const [tourBuyIn, setTourBuyIn] = useState('');
  const [tourPayout, setTourPayout] = useState('');

  const saveRecords = (newRecords: TournamentRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem('poker_academy_mtt_records', JSON.stringify(newRecords));
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = tourName.trim();
    if (!trimmedName || !tourBuyIn) return;

    const buyInNum = parseFloat(tourBuyIn) || 0;
    const payoutNum = parseFloat(tourPayout) || 0;

    // 資安防護：窍計們實際的預期範圍
    if (buyInNum < 0 || buyInNum > 10_000_000) return;
    if (payoutNum < 0 || payoutNum > 100_000_000) return;

    const newRec: TournamentRecord = {
      id: Date.now().toString(),
      name: trimmedName,
      date: new Date().toISOString().split('T')[0],
      buyIn: buyInNum,
      payout: payoutNum,
      itm: payoutNum > 0
    };

    saveRecords([newRec, ...records]);
    setTourName('');
    setTourBuyIn('');
    setTourPayout('');
  };

  const handleDeleteRecord = (id: string) => {
    saveRecords(records.filter((r) => r.id !== id));
  };

  const totalBuyIn = records.reduce((sum, r) => sum + r.buyIn, 0);
  const totalPayout = records.reduce((sum, r) => sum + r.payout, 0);
  const netProfit = totalPayout - totalBuyIn;
  const roi = totalBuyIn > 0 ? ((netProfit / totalBuyIn) * 100).toFixed(1) : '0';
  const itmCount = records.filter((r) => r.itm).length;
  const itmRate = records.length > 0 ? ((itmCount / records.length) * 100).toFixed(1) : '0';

  // 4. Tournament Clock State
  const BLIND_LEVELS = [
    { level: 1, sb: 100, bb: 200, ante: 200 },
    { level: 2, sb: 200, bb: 400, ante: 400 },
    { level: 3, sb: 300, bb: 600, ante: 600 },
    { level: 4, sb: 500, bb: 1000, ante: 1000 },
    { level: 5, sb: 1000, bb: 2000, ante: 2000 },
    { level: 6, sb: 1500, bb: 3000, ante: 3000 }
  ];
  const [levelIndex, setLevelIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(LEVEL_DURATION_SEC);
  const [isClockRunning, setIsClockRunning] = useState(false);
  const clockIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isClockRunning) {
      clockIntervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setLevelIndex((idx) => (idx + 1 < BLIND_LEVELS.length ? idx + 1 : idx));
            return LEVEL_DURATION_SEC;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (clockIntervalRef.current) clearInterval(clockIntervalRef.current);
    }
    return () => {
      if (clockIntervalRef.current) clearInterval(clockIntervalRef.current);
    };
  }, [isClockRunning]);

  const formatClockTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Tool Navigation */}
      <div
        className="glass-panel"
        style={{
          padding: '12px 20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        {[
          { id: 'odds', label: t.oddsTab, icon: Calculator },
          { id: 'spr', label: t.sprTab, icon: PieChart },
          { id: 'tracker', label: t.trackerTab, icon: DollarSign },
          { id: 'clock', label: t.clockTab, icon: Clock }
        ].map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 600,
                backgroundColor: isActive ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: isActive ? '#34d399' : '#9ca3af',
                border: isActive ? '1px solid #10b981' : '1px solid transparent',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={18} />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Pot Odds Tool */}
      {activeTool === 'odds' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
            {t.oddsTitle}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '28px' }}>
            {t.oddsDesc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '8px' }}>
                {t.currentPot}
              </label>
              <input
                type="number"
                value={potSize}
                onChange={(e) => setPotSize(Math.max(0, parseFloat(e.target.value) || 0))}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '8px' }}>
                {t.betToCall}
              </label>
              <input
                type="number"
                value={betSize}
                onChange={(e) => setBetSize(Math.max(0, parseFloat(e.target.value) || 0))}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{t.requiredEquity}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                {requiredEquity}%
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{t.oddsRatio}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                {oddsRatio} : 1
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{t.callSuggestion}</div>
              <div style={{ fontSize: '1rem', color: '#e5e7eb', marginTop: '6px', lineHeight: 1.5 }}>
                &gt; {requiredEquity}% <span style={{ color: '#34d399', fontWeight: 700 }}>+EV</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SPR Tool */}
      {activeTool === 'spr' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
            {t.sprTitle}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '28px' }}>
            {t.sprDesc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '8px' }}>
                {t.effectiveStack}
              </label>
              <input
                type="number"
                value={sprStack}
                onChange={(e) => setSprStack(Math.max(0, parseFloat(e.target.value) || 0))}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '8px' }}>
                {t.flopPot}
              </label>
              <input
                type="number"
                value={sprPot}
                onChange={(e) => setSprPot(Math.max(1, parseFloat(e.target.value) || 1))}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{t.sprIndex}</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                  {sprValue}
                </div>
              </div>

              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
                <span className={`badge ${parseFloat(sprValue) <= 3 ? 'badge-ruby' : parseFloat(sprValue) <= 7 ? 'badge-gold' : 'badge-emerald'}`}>
                  {parseFloat(sprValue) <= 3 ? t.sprLow : parseFloat(sprValue) <= 7 ? t.sprMed : t.sprHigh}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tournament Tracker Tool */}
      {activeTool === 'tracker' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
            {t.trackerTitle}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '24px' }}>
            {t.trackerDesc}
          </p>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.totalEvents}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>{records.length}</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.netProfit}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: netProfit >= 0 ? '#34d399' : '#f87171' }}>
                {netProfit >= 0 ? `+$${netProfit.toLocaleString()}` : `-$${Math.abs(netProfit).toLocaleString()}`}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.roi}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: parseFloat(roi) >= 0 ? '#34d399' : '#f87171' }}>
                {roi}%
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.itmRate}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f59e0b' }}>
                {itmRate}% ({itmCount}/{records.length})
              </div>
            </div>
          </div>

          {/* Add Record Form */}
          <form onSubmit={handleAddRecord} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 120px', gap: '12px', marginBottom: '28px' }}>
            <input
              type="text"
              placeholder={t.formName}
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
              maxLength={100}
              style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
            <input
              type="number"
              placeholder={t.formBuyin}
              value={tourBuyIn}
              onChange={(e) => setTourBuyIn(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
            <input
              type="number"
              placeholder={t.formPayout}
              value={tourPayout}
              onChange={(e) => setTourPayout(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              <span>{t.recordBtn}</span>
            </button>
          </form>

          {/* Records Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: '#9ca3af', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>{t.tableDate}</th>
                  <th style={{ padding: '10px' }}>{t.tableName}</th>
                  <th style={{ padding: '10px' }}>{t.tableBuyin}</th>
                  <th style={{ padding: '10px' }}>{t.tablePayout}</th>
                  <th style={{ padding: '10px' }}>{t.tableResult}</th>
                  <th style={{ padding: '10px' }}>{t.tableAction}</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '10px', color: '#9ca3af' }}>{rec.date}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{rec.name}</td>
                    <td style={{ padding: '10px' }}>${rec.buyIn}</td>
                    <td style={{ padding: '10px', color: rec.payout > 0 ? '#34d399' : '#9ca3af' }}>
                      ${rec.payout}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span className={`badge ${rec.itm ? 'badge-emerald' : 'badge-ruby'}`}>
                        {rec.itm ? 'ITM' : 'BUST'}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <button
                        onClick={() => handleDeleteRecord(rec.id)}
                        style={{ background: 'transparent', color: '#ef4444', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Blinds Clock Tool */}
      {activeTool === 'clock' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
            {t.clockTitle}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '28px' }}>
            {t.clockDesc}
          </p>

          <div
            style={{
              background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0.5) 70%)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '560px',
              margin: '0 auto 32px'
            }}
          >
            <div className="badge badge-gold" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
              {t.level} {BLIND_LEVELS[levelIndex].level}
            </div>

            <div style={{ fontSize: '4.5rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff', letterSpacing: '2px' }}>
              {formatClockTime(secondsLeft)}
            </div>

            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '12px' }}>
              {BLIND_LEVELS[levelIndex].sb.toLocaleString()} / {BLIND_LEVELS[levelIndex].bb.toLocaleString()}
            </div>
            <div style={{ fontSize: '1rem', color: '#f59e0b', marginTop: '4px' }}>
              {t.ante}: {BLIND_LEVELS[levelIndex].ante.toLocaleString()}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsClockRunning(!isClockRunning)}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '1.1rem' }}
            >
              {isClockRunning ? <Pause size={20} /> : <Play size={20} />}
              <span>{isClockRunning ? t.pauseBtn : t.startBtn}</span>
            </button>

            <button
              onClick={() => {
                setIsClockRunning(false);
                setSecondsLeft(LEVEL_DURATION_SEC);
              }}
              className="btn-secondary"
            >
              <RotateCcw size={18} />
              <span>{t.resetBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
