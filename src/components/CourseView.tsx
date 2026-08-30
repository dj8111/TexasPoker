import React, { useState } from 'react';
import { COURSE_CHAPTERS } from '../data/pokerData';
import { CheckCircle, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface CourseViewProps {
  completedLessons: string[];
  toggleLessonComplete: (id: string) => void;
  lang: Language;
}

export const CourseView: React.FC<CourseViewProps> = ({ completedLessons, toggleLessonComplete, lang }) => {
  const t = TRANSLATIONS[lang].course;
  const [activeChapterId, setActiveChapterId] = useState<string>(COURSE_CHAPTERS[0].id);

  const activeChapter = COURSE_CHAPTERS.find((c) => c.id === activeChapterId) || COURSE_CHAPTERS[0];
  const isCompleted = completedLessons.includes(activeChapter.id);

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 32px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(17, 24, 39, 0.8) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">{t.badge}</span>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              {t.progress}：{completedLessons.length} / {COURSE_CHAPTERS.length}
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
            {t.title}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', maxWidth: '750px' }}>
            {t.desc}
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ minWidth: '220px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '6px' }}>
            <span>{t.completionRate}</span>
            <span style={{ fontWeight: 700, color: '#34d399' }}>
              {Math.round((completedLessons.length / COURSE_CHAPTERS.length) * 100)}%
            </span>
          </div>
          <div style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${(completedLessons.length / COURSE_CHAPTERS.length) * 100}%`,
                height: '100%',
                backgroundColor: '#10b981',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Syllabus + Chapter Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Syllabus List */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ padding: '8px 12px', fontSize: '0.85rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t.syllabusTitle}
          </div>

          {COURSE_CHAPTERS.map((chap) => {
            const isDone = completedLessons.includes(chap.id);
            const isCurrent = chap.id === activeChapterId;
            return (
              <div
                key={chap.id}
                onClick={() => setActiveChapterId(chap.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: isCurrent ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  border: isCurrent ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: isCurrent ? '#34d399' : '#6b7280', fontWeight: 600 }}>
                    LEVEL {chap.level} • {chap.levelTitle}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isCurrent ? '#ffffff' : '#d1d5db', marginTop: '2px' }}>
                    {chap.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.75rem', color: '#9ca3af' }}>
                    <Clock size={12} />
                    <span>{chap.readTime}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLessonComplete(chap.id);
                  }}
                  style={{
                    background: 'transparent',
                    color: isDone ? '#10b981' : '#4b5563',
                    padding: '4px',
                    borderRadius: '6px',
                    display: 'flex'
                  }}
                  title={isDone ? t.markIncomplete : t.markComplete}
                >
                  <CheckCircle size={20} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Chapter Content Viewer */}
        <div className="glass-panel" style={{ padding: '36px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span className="badge badge-emerald">LEVEL {activeChapter.level}</span>
            <span className="badge badge-cyan">{activeChapter.category}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9ca3af', fontSize: '0.85rem', marginLeft: 'auto' }}>
              <Clock size={14} />
              <span>{activeChapter.readTime}</span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '16px', color: '#ffffff' }}>
            {activeChapter.title}
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#9ca3af', marginBottom: '24px', lineHeight: 1.6, borderLeft: '3px solid #10b981', paddingLeft: '16px' }}>
            {activeChapter.summary}
          </p>

          {/* Key Takeaways Box */}
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '32px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 700, fontSize: '0.95rem', marginBottom: '12px' }}>
              <Sparkles size={18} />
              <span>{t.keyTakeawaysTitle}</span>
            </div>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#e5e7eb', fontSize: '0.92rem' }}>
              {activeChapter.keyTakeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </div>

          {/* Detailed Content */}
          <div
            style={{
              color: '#d1d5db',
              fontSize: '1rem',
              lineHeight: 1.8,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            dangerouslySetInnerHTML={{
              __html: activeChapter.content
                .replace(/### (.*)/g, '<h3 style="font-size:1.3rem; margin-top:24px; margin-bottom:8px; color:#ffffff; font-weight:700;">$1</h3>')
                .replace(/#### (.*)/g, '<h4 style="font-size:1.1rem; margin-top:16px; margin-bottom:6px; color:#34d399; font-weight:600;">$1</h4>')
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#ffffff;">$1</strong>')
                .replace(/- (.*)/g, '<li style="margin-left: 20px;">$1</li>')
            }}
          />

          {/* Complete Lesson Action */}
          <div
            style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <button
              onClick={() => toggleLessonComplete(activeChapter.id)}
              className={isCompleted ? 'btn-secondary' : 'btn-primary'}
            >
              <CheckCircle size={18} />
              <span>{isCompleted ? t.markIncomplete : t.markComplete}</span>
            </button>

            {/* Next Chapter Link */}
            {COURSE_CHAPTERS.findIndex((c) => c.id === activeChapter.id) < COURSE_CHAPTERS.length - 1 && (
              <button
                onClick={() => {
                  const currentIndex = COURSE_CHAPTERS.findIndex((c) => c.id === activeChapter.id);
                  setActiveChapterId(COURSE_CHAPTERS[currentIndex + 1].id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-secondary"
              >
                <span>{t.nextChapter}</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
