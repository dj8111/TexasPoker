import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { CourseView } from './components/CourseView';
import { RangeMatrixView } from './components/RangeMatrixView';
import { PushFoldTrainer } from './components/PushFoldTrainer';
import { ScenarioQuiz } from './components/ScenarioQuiz';
import { ToolboxView } from './components/ToolboxView';
import { MentalGameView } from './components/MentalGameView';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ShareModal } from './components/ShareModal';
import { ShieldAlert } from 'lucide-react';
import { Language, TRANSLATIONS } from './i18n/translations';

export const App: React.FC = () => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('poker_academy_lang');
    if (saved === 'zh-TW' || saved === 'en' || saved === 'zh-CN') {
      return saved as Language;
    }
    return 'zh-TW'; // Default
  });

  const [activeTab, setActiveTab] = useState<TabType>('course');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('poker_academy_completed_lessons');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 安全驗證：確保解析結果是字串陣列，防止惡意 localStorage 注入
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
          return parsed;
        }
        // 型別不符時清除損毀的資料
        localStorage.removeItem('poker_academy_completed_lessons');
      } catch (e) {
        // JSON 解析失敗時清除損毀的資料
        localStorage.removeItem('poker_academy_completed_lessons');
      }
    }
    return ['lvl1-pot-odds'];
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('poker_academy_lang', newLang);
  };

  const toggleLessonComplete = (id: string) => {
    setCompletedLessons((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('poker_academy_completed_lessons', JSON.stringify(next));
      return next;
    });
  };

  const t = TRANSLATIONS[lang];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* First-visit Disclaimer Modal */}
      <DisclaimerModal lang={lang} />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        lang={lang}
      />

      {/* Top Permanent Warning Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)',
          color: '#fef2f2',
          padding: '8px 16px',
          fontSize: '0.82rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          zIndex: 60
        }}
      >
        <ShieldAlert size={16} />
        <span>{t.warningBanner}</span>
      </div>

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedLessonsCount={completedLessons.length}
        lang={lang}
        setLang={setLang}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'course' && (
          <CourseView
            completedLessons={completedLessons}
            toggleLessonComplete={toggleLessonComplete}
            lang={lang}
          />
        )}
        {activeTab === 'matrix' && <RangeMatrixView lang={lang} />}
        {activeTab === 'drills' && <PushFoldTrainer lang={lang} />}
        {activeTab === 'quiz' && <ScenarioQuiz lang={lang} />}
        {activeTab === 'toolbox' && <ToolboxView lang={lang} />}
        {activeTab === 'mental' && <MentalGameView lang={lang} />}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#070a12',
          borderTop: '1px solid var(--border-subtle)',
          padding: '40px 24px 28px',
          marginTop: '60px',
          color: '#9ca3af',
          fontSize: '0.85rem'
        }}
      >
        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}
        >
          {/* Brand & Purpose */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>♠️ {t.brand.title} {t.brand.badge}</span>
            </div>
            <p style={{ lineHeight: 1.6, color: '#6b7280' }}>
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Legal & Compliance Notice */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
              {t.footer.complianceTitle}
            </h4>
            <p style={{ lineHeight: 1.6, color: '#9ca3af' }}>
              {t.footer.complianceDesc}
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
              {t.footer.shortcutsTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => { setActiveTab('matrix'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ background: 'transparent', textAlign: 'left', color: '#9ca3af', padding: 0 }}
              >
                • {t.matrix.title} (13x13 GTO Matrix)
              </button>
              <button
                onClick={() => { setActiveTab('drills'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ background: 'transparent', textAlign: 'left', color: '#9ca3af', padding: 0 }}
              >
                • {t.drills.title} (Push/Fold Drills)
              </button>
              <button
                onClick={() => { setActiveTab('toolbox'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ background: 'transparent', textAlign: 'left', color: '#9ca3af', padding: 0 }}
              >
                • {t.toolbox.oddsTitle} (Pot Odds & SPR)
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#6b7280'
          }}
        >
          <div>
            {t.footer.copyright}
          </div>
          <div>
            {t.footer.tagline}
          </div>
        </div>
      </footer>
    </div>
  );
};
