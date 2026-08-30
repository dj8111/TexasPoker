import React from 'react';
import { BookOpen, Grid, Zap, HelpCircle, Wrench, Brain, Share2, Globe } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

export type TabType = 'course' | 'matrix' | 'drills' | 'quiz' | 'toolbox' | 'mental';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  completedLessonsCount: number;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  completedLessonsCount,
  lang,
  setLang,
  onOpenShare
}) => {
  const t = TRANSLATIONS[lang];

  const tabs = [
    { id: 'course', label: t.nav.course, icon: BookOpen, tag: `${completedLessonsCount}/5` },
    { id: 'matrix', label: t.nav.matrix, icon: Grid, tag: 'GTO' },
    { id: 'drills', label: t.nav.drills, icon: Zap, tag: '5s' },
    { id: 'quiz', label: t.nav.quiz, icon: HelpCircle, tag: 'Quiz' },
    { id: 'toolbox', label: t.nav.toolbox, icon: Wrench, tag: 'Tools' },
    { id: 'mental', label: t.nav.mental, icon: Brain, tag: 'Live' }
  ] as const;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(11, 15, 25, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 24px'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Top Tier: Title on the Left, Share & Language Switcher on the Right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          {/* Brand Logo & Title (Left) */}
          <div
            onClick={() => setActiveTab('course')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)',
                fontSize: '22px'
              }}
            >
              ♠️
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                  {t.brand.title}
                </span>
                <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  {t.brand.badge}
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                {t.brand.sub}
              </span>
            </div>
          </div>

          {/* Utility Tools (Right): Share Platform + Language Switcher on the same line as Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Share Button */}
            <button
              onClick={onOpenShare}
              className="btn-secondary"
              style={{
                padding: '8px 14px',
                fontSize: '0.85rem',
                gap: '6px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
              title={t.nav.share}
            >
              <Share2 size={16} color="#10b981" />
              <span>{t.nav.share}</span>
            </button>

            {/* Language Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                padding: '3px'
              }}
            >
              <Globe size={15} style={{ color: '#9ca3af', marginLeft: '8px', marginRight: '4px' }} />
              {(
                [
                  { id: 'zh-TW', label: '繁中' },
                  { id: 'en', label: 'EN' },
                  { id: 'zh-CN', label: '简中' }
                ] as const
              ).map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLang(l.id)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: lang === l.id ? 800 : 500,
                    backgroundColor: lang === l.id ? '#10b981' : 'transparent',
                    color: lang === l.id ? '#ffffff' : '#9ca3af',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Tier: Navigation Feature Tabs */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '10px'
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  color: isActive ? '#34d399' : '#9ca3af',
                  border: isActive ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.tag && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      backgroundColor: isActive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#ffffff' : '#9ca3af'
                    }}
                  >
                    {tab.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
