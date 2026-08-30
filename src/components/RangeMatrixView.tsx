import React, { useState, useMemo } from 'react';
import { Position, StackDepth, ScenarioType, getPreflopRange, getHandLabel } from '../data/pokerData';
import { Filter } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface RangeMatrixViewProps {
  lang: Language;
}

export const RangeMatrixView: React.FC<RangeMatrixViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].matrix;

  const [position, setPosition] = useState<Position>('BTN');
  const [stackDepth, setStackDepth] = useState<StackDepth>('40bb');
  const [scenario, setScenario] = useState<ScenarioType>('RFI');
  const [hoveredHand, setHoveredHand] = useState<string | null>(null);

  const rangeMap = useMemo(() => {
    return getPreflopRange(position, stackDepth, scenario);
  }, [position, stackDepth, scenario]);

  // Calculate total combinations in range
  const stats = useMemo(() => {
    let totalCombos = 0;
    let raiseCombos = 0;
    let callCombos = 0;

    for (let r = 0; r < 13; r++) {
      for (let c = 0; c < 13; c++) {
        const hand = getHandLabel(r, c);
        const detail = rangeMap[hand];
        const numCombos = r === c ? 6 : r < c ? 4 : 12; // Pairs: 6, Suited: 4, Offsuit: 12

        totalCombos += numCombos;
        if (detail.action === 'raise' || detail.action === 'raise-allin') {
          raiseCombos += numCombos * (detail.frequency / 100);
        } else if (detail.action === 'call') {
          callCombos += numCombos * (detail.frequency / 100);
        } else if (detail.action === 'mixed') {
          raiseCombos += numCombos * 0.5;
          callCombos += numCombos * 0.5;
        }
      }
    }

    const playedCombos = raiseCombos + callCombos;
    const playPercentage = ((playedCombos / totalCombos) * 100).toFixed(1);

    return {
      totalCombos,
      playedCombos: Math.round(playedCombos),
      playPercentage,
      raisePercentage: ((raiseCombos / totalCombos) * 100).toFixed(1),
      callPercentage: ((callCombos / totalCombos) * 100).toFixed(1)
    };
  }, [rangeMap]);

  const scenarioLabels = {
    RFI: t.scenarios.rfi,
    vs3Bet: t.scenarios.vs3bet,
    PushFold: t.scenarios.pushfold
  };

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Controls Header */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 28px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-emerald">{t.badge}</span>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{t.sub}</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            {t.title}
          </h2>
        </div>

        {/* Position Selectors */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          {/* Position */}
          <div>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
              {t.heroPos}
            </span>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px' }}>
              {(['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as Position[]).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    backgroundColor: position === pos ? '#10b981' : 'transparent',
                    color: position === pos ? '#ffffff' : '#9ca3af',
                    transition: 'all 0.15s'
                  }}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* Stack Depth */}
          <div>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
              {t.stackDepth}
            </span>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px' }}>
              {(['100bb', '40bb', '20bb', '12bb', '8bb'] as StackDepth[]).map((depth) => (
                <button
                  key={depth}
                  onClick={() => setStackDepth(depth)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    backgroundColor: stackDepth === depth ? '#f59e0b' : 'transparent',
                    color: stackDepth === depth ? '#ffffff' : '#9ca3af',
                    transition: 'all 0.15s'
                  }}
                >
                  {depth}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario */}
          <div>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
              {t.scenario}
            </span>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px' }}>
              {[
                { id: 'RFI', label: scenarioLabels.RFI },
                { id: 'vs3Bet', label: scenarioLabels.vs3Bet },
                { id: 'PushFold', label: scenarioLabels.PushFold }
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setScenario(sc.id as ScenarioType)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    backgroundColor: scenario === sc.id ? '#6366f1' : 'transparent',
                    color: scenario === sc.id ? '#ffffff' : '#9ca3af',
                    transition: 'all 0.15s'
                  }}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Matrix Grid + Statistics Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 680px) 1fr', gap: '28px', alignItems: 'start' }}>
        {/* Left: 13x13 Grid */}
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(10, 14, 23, 0.95)'
          }}
        >
          {/* Action Legend */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', backgroundColor: '#ef4444' }} />
              <span>{t.legend.raise}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', backgroundColor: '#b91c1c', border: '1px solid #f59e0b' }} />
              <span>{t.legend.allin}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', backgroundColor: '#10b981' }} />
              <span>{t.legend.call}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'linear-gradient(135deg, #ef4444 50%, #10b981 50%)' }} />
              <span>{t.legend.mixed}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', backgroundColor: '#1f2937' }} />
              <span style={{ color: '#6b7280' }}>{t.legend.fold}</span>
            </div>
          </div>

          {/* 13x13 Matrix */}
          <div className="matrix-grid">
            {Array.from({ length: 13 }).map((_, row) =>
              Array.from({ length: 13 }).map((_, col) => {
                const hand = getHandLabel(row, col);
                const detail = rangeMap[hand] || { action: 'fold', frequency: 100 };
                const actionClass = `action-${detail.action}`;
                const isHovered = hoveredHand === hand;

                return (
                  <div
                    key={hand}
                    onMouseEnter={() => setHoveredHand(hand)}
                    onMouseLeave={() => setHoveredHand(null)}
                    className={`matrix-cell ${actionClass}`}
                    style={{
                      border: isHovered ? '2px solid #ffffff' : undefined,
                      transform: isHovered ? 'scale(1.2)' : undefined,
                      zIndex: isHovered ? 20 : 1
                    }}
                  >
                    <span>{hand}</span>
                  </div>
                );
              })
            )}
          </div>

          <div style={{ marginTop: '14px', fontSize: '0.78rem', color: '#9ca3af' }}>
            {t.matrixTip}
          </div>
        </div>

        {/* Right: Detailed Hand Inspector & Range Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Range Summary Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Filter size={18} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {position} @ {stackDepth} ({scenarioLabels[scenario]}) {t.statsTitle}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.totalFreq}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>
                  {stats.playPercentage}%
                </div>
                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                  {stats.playedCombos} / {stats.totalCombos} {t.combosCount}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.raiseFreq}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f87171', marginTop: '2px' }}>
                  {stats.raisePercentage}%
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.callFreq}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>
                  {stats.callPercentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Hover Inspector Card */}
          <div
            className="glass-panel"
            style={{
              padding: '24px',
              border: hoveredHand ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
              background: hoveredHand ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(17, 24, 39, 0.9) 100%)' : undefined
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#9ca3af' }}>
                {t.inspectorTitle}
              </span>
              {hoveredHand && (
                <span className="badge badge-gold" style={{ fontSize: '0.9rem', padding: '4px 12px' }}>
                  {hoveredHand}
                </span>
              )}
            </div>

            {hoveredHand ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                    {t.suggestedAction}
                    <span
                      style={{
                        color:
                          rangeMap[hoveredHand]?.action === 'raise' || rangeMap[hoveredHand]?.action === 'raise-allin'
                            ? '#ef4444'
                            : rangeMap[hoveredHand]?.action === 'call'
                            ? '#10b981'
                            : rangeMap[hoveredHand]?.action === 'mixed'
                            ? '#f59e0b'
                            : '#6b7280',
                        marginLeft: '8px'
                      }}
                    >
                      {rangeMap[hoveredHand]?.action.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.88rem', color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>{t.execFreq}{rangeMap[hoveredHand]?.frequency}%</div>
                  {rangeMap[hoveredHand]?.ev !== undefined && (
                    <div>{t.theoryEV}+{rangeMap[hoveredHand]?.ev} BB</div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#6b7280', fontSize: '0.9rem' }}>
                {t.inspectorEmpty}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
