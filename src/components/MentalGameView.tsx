import React, { useState } from 'react';
import { TILT_DATABASE } from '../data/pokerData';
import { Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface MentalGameViewProps {
  lang: Language;
}

export const MentalGameView: React.FC<MentalGameViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].mental;
  const [activeTiltId, setActiveTiltId] = useState<string>(TILT_DATABASE[0].id);

  const activeTilt = TILT_DATABASE.find((t) => t.id === activeTiltId) || TILT_DATABASE[0];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 32px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(17, 24, 39, 0.8) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-cyan">{t.badge}</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
          {t.title}
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginTop: '6px', maxWidth: '800px' }}>
          {t.desc}
        </p>
      </div>

      {/* Grid: Tilt Database + A-Game Checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Tilt Categories */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ padding: '8px 12px', fontSize: '0.85rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>
            {t.categoryTitle}
          </div>

          {TILT_DATABASE.map((tilt) => {
            const isCurrent = tilt.id === activeTiltId;
            return (
              <div
                key={tilt.id}
                onClick={() => setActiveTiltId(tilt.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: isCurrent ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                  border: isCurrent ? '1px solid #6366f1' : '1px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isCurrent ? '#ffffff' : '#d1d5db' }}>
                  {lang === 'en' ? tilt.name : tilt.chineseName}
                </div>
                <div style={{ fontSize: '0.75rem', color: isCurrent ? '#a5b4fc' : '#6b7280', marginTop: '2px' }}>
                  {tilt.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Tilt Deep Dive Card */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span className="badge badge-ruby">Tilt Diagnosis</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              {lang === 'en' ? activeTilt.name : activeTilt.chineseName} ({activeTilt.name})
            </h3>
          </div>

          {/* Trigger */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '6px' }}>
              {t.triggerTitle}
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.2)', color: '#f3f4f6', fontSize: '0.92rem' }}>
              {activeTilt.trigger}
            </div>
          </div>

          {/* Symptom */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', marginBottom: '6px' }}>
              {t.symptomTitle}
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.2)', color: '#f3f4f6', fontSize: '0.92rem' }}>
              {activeTilt.symptom}
            </div>
          </div>

          {/* Remedy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '6px' }}>
              <Sparkles size={16} />
              <span>{t.remedyTitle}</span>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.3)', color: '#ffffff', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {activeTilt.remedy}
            </div>
          </div>

          {/* Live Tournament Rules Checklist */}
          <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', color: '#ffffff' }}>
              {t.checklistTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#d1d5db' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                <span>{lang === 'en' ? 'Get at least 7-8 hours of sleep without severe sleep debt.' : '賽前取得至少 7~8 小時充足睡眠，無宿醉或嚴重睡眠不足'}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                <span>{lang === 'en' ? 'Carry a jacket (cold AC) and a dedicated Hand Protector.' : '隨身攜帶外套（賽場冷氣極強）與壓牌石 (Hand Protector)'}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                <span>{lang === 'en' ? 'Prepare water and low-GI nuts; avoid high-sugar refined carbs.' : '已備好充足的水分與無糖堅果，避免在賽間攝取高糖精緻澱粉'}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                <span>{lang === 'en' ? 'Understand tournament structures: blind duration, ITM bubble level, and bag tag time.' : '明確知曉本日賽制結構（盲注時間、何時進錢圈、何時封袋）'}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
