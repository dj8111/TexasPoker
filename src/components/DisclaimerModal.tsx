import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface DisclaimerModalProps {
  lang: Language;
  onAccept?: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ lang, onAccept }) => {
  const t = TRANSLATIONS[lang].disclaimer;
  const [isOpen, setIsOpen] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem('poker_academy_disclaimer_agreed');
    if (!agreed) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    if (!hasAgreed) return;
    localStorage.setItem('poker_academy_disclaimer_agreed', 'true');
    setIsOpen(false);
    if (onAccept) onAccept();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 8, 15, 0.94)',
        backdropFilter: 'blur(14px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '32px',
          borderRadius: '20px',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          boxShadow: '0 25px 60px -15px rgba(239, 68, 68, 0.25)',
          background: 'linear-gradient(180deg, #161c2d 0%, #0b0f19 100%)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div
            style={{
              padding: '10px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              display: 'flex'
            }}
          >
            <ShieldAlert size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 800 }}>
              {t.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              {t.subtitle}
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.45)',
            padding: '18px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.9rem',
            color: '#d1d5db',
            maxHeight: '260px',
            overflowY: 'auto',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}
        >
          <p style={{ marginBottom: '12px', fontWeight: 600, color: '#f87171' }}>
            {t.header}
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>{t.point1Title}</strong>：{t.point1Desc}
            </li>
            <li>
              <strong>{t.point2Title}</strong>：{t.point2Desc}
            </li>
            <li>
              <strong>{t.point3Title}</strong>：{t.point3Desc}
            </li>
            <li>
              <strong>{t.point4Title}</strong>：{t.point4Desc}
            </li>
          </ul>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            marginBottom: '24px',
            padding: '12px',
            background: hasAgreed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            border: hasAgreed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
            transition: 'all 0.2s'
          }}
        >
          <input
            type="checkbox"
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)}
            style={{ width: '18px', height: '18px', marginTop: '2px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.88rem', color: '#e5e7eb' }}>
            {t.agreeCheckbox}
          </span>
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={handleConfirm}
            disabled={!hasAgreed}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              opacity: hasAgreed ? 1 : 0.5,
              cursor: hasAgreed ? 'pointer' : 'not-allowed'
            }}
          >
            <CheckCircle2 size={20} />
            {t.confirmBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
