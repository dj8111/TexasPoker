import React, { useState } from 'react';
import { POSTFLOP_SCENARIOS, PostflopScenario } from '../data/pokerData';
import { PokerCard } from './PokerCard';
import { ChevronRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ScenarioQuizProps {
  lang: Language;
}

export const ScenarioQuiz: React.FC<ScenarioQuizProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].quiz;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const scenario: PostflopScenario = POSTFLOP_SCENARIOS[currentIndex % POSTFLOP_SCENARIOS.length];

  const handleNext = () => {
    setSelectedOption(null);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 28px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-cyan">{t.badge}</span>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              {t.scenarioCount} {currentIndex + 1} / {POSTFLOP_SCENARIOS.length}
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px' }}>
            {t.title}
          </h2>
        </div>
      </div>

      {/* Scenario Game Board */}
      <div
        className="glass-panel"
        style={{
          padding: '32px',
          background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
          borderRadius: '20px',
          marginBottom: '24px'
        }}
      >
        {/* Context Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
            {t.stage}: {scenario.stage}
          </span>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.88rem' }}>
            <span style={{ color: '#9ca3af' }}>{t.hero}: <strong style={{ color: '#ffffff' }}>{scenario.heroPosition}</strong></span>
            <span style={{ color: '#9ca3af' }}>{t.villain}: <strong style={{ color: '#ffffff' }}>{scenario.villainPosition}</strong></span>
            <span style={{ color: '#9ca3af' }}>{t.pot}: <strong style={{ color: '#f59e0b' }}>{scenario.potSize.toLocaleString()}</strong></span>
          </div>
        </div>

        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', color: '#ffffff' }}>
          {scenario.title}
        </h3>

        {/* Board Cards & Hole Cards */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            background: 'rgba(0,0,0,0.35)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '28px'
          }}
        >
          {/* Community Board */}
          <div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px', textAlign: 'center' }}>
              {t.communityBoard}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {scenario.board.map((card, idx) => (
                <PokerCard key={idx} card={card} size="md" />
              ))}
            </div>
          </div>

          {/* Hero Hand */}
          <div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px', textAlign: 'center' }}>
              {t.heroHand}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <PokerCard card={scenario.heroHand[0]} size="md" />
              <PokerCard card={scenario.heroHand[1]} size="md" />
            </div>
          </div>
        </div>

        {/* Villain Action Prompt */}
        <div
          style={{
            padding: '14px 20px',
            borderRadius: '12px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            fontSize: '0.95rem',
            fontWeight: 600,
            marginBottom: '28px'
          }}
        >
          {t.villainActionTitle}{scenario.villainAction}
        </div>

        {/* Action Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {scenario.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedOption(idx)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? opt.isGTO
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'rgba(239, 68, 68, 0.15)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected
                    ? opt.isGTO
                      ? '1px solid #10b981'
                      : '1px solid #ef4444'
                    : '1px solid var(--border-subtle)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>
                    {opt.label}
                  </div>
                  {selectedOption !== null && (
                    <span className={`badge ${opt.isGTO ? 'badge-emerald' : 'badge-ruby'}`}>
                      {opt.frequency}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#d1d5db', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                    {opt.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Scenario Button */}
        {selectedOption !== null && (
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleNext} className="btn-gold">
              <span>{t.nextBtn}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
