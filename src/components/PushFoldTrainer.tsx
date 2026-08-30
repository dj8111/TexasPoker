import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PUSH_FOLD_DRILLS } from '../data/pokerData';
import { PokerCard } from './PokerCard';
import { Zap, Timer, CheckCircle2, XCircle, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface PushFoldTrainerProps {
  lang: Language;
}

export const PushFoldTrainer: React.FC<PushFoldTrainerProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].drills;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [userChoice, setUserChoice] = useState<'Push' | 'Fold' | 'Call' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentDrill = PUSH_FOLD_DRILLS[currentIndex % PUSH_FOLD_DRILLS.length];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playBeep = useCallback((type: 'correct' | 'wrong' | 'timeout') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'wrong' || type === 'timeout') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(160, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {}
  }, [soundEnabled]);

  useEffect(() => {
    if (isAnswered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(5);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered]);

  const handleTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setUserChoice(null);
    setStreak(0);
    setTotalAttempts((prev) => prev + 1);
    playBeep('timeout');
  };

  const handleSelect = (action: 'Push' | 'Fold' | 'Call') => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setUserChoice(action);
    setIsAnswered(true);
    setTotalAttempts((prev) => prev + 1);

    const isCorrect = action === currentDrill.correctAction;
    if (isCorrect) {
      const newStreak = streak + 1;
      setScore((prev) => prev + 100 + streak * 20);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      playBeep('correct');

      if (newStreak >= 3 && newStreak % 3 === 0) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      setStreak(0);
      playBeep('wrong');
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setUserChoice(null);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleSelect('Push');
      if (e.key === '2') handleSelect('Fold');
      if (e.key === '3') handleSelect('Call');
      if (e.key === ' ' || e.key === 'Enter') {
        if (isAnswered) {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentDrill]);

  const isCorrect = userChoice === currentDrill.correctAction;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Banner & Stats */}
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
            <span className="badge badge-ruby">{t.badge}</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{ background: 'transparent', color: '#9ca3af', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{soundEnabled ? t.soundOn : t.soundOff}</span>
            </button>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px' }}>
            {t.title}
          </h2>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.score}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b' }}>{score}</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.streak}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: streak > 2 ? '#ef4444' : '#10b981' }}>
              🔥 {streak}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.accuracy}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8' }}>
              {totalAttempts === 0 ? '100%' : `${Math.round(((score > 0 ? (totalAttempts - (totalAttempts - streak > 0 ? 0 : 0)) : 0) / totalAttempts) * 100)}%`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Poker Table Arena */}
      <div
        className="glass-panel"
        style={{
          padding: '36px',
          background: 'radial-gradient(ellipse at center, #064e3b 0%, #022c22 60%, #0b0f19 100%)',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Countdown Timer Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(timeLeft / 5) * 100}%`,
              backgroundColor: timeLeft > 2 ? '#10b981' : '#ef4444',
              transition: 'width 1s linear'
            }}
          />
        </div>

        {/* Header Table Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span className="badge badge-gold">
              {t.heroPos}: {currentDrill.heroPosition}
            </span>
            <span className="badge badge-cyan">
              {t.chips}: {currentDrill.stackBB} BB
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: timeLeft <= 2 ? '#ef4444' : '#ffffff',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Timer size={20} />
            <span>00:0{timeLeft}</span>
          </div>
        </div>

        {/* Table Scenario Description */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            padding: '14px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '32px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '2px' }}>
            {t.blindsLabel}: {currentDrill.blinds}
          </div>
          <div style={{ fontSize: '1.05rem', color: '#f3f4f6', fontWeight: 600 }}>
            {currentDrill.tableDesc}
          </div>
        </div>

        {/* Hero Hole Cards */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            margin: '28px 0'
          }}
        >
          <PokerCard card={currentDrill.hand[0]} size="lg" />
          <PokerCard card={currentDrill.hand[1]} size="lg" />
        </div>

        {/* Action Decision Buttons */}
        {!isAnswered ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px' }}>
            <button
              onClick={() => handleSelect('Push')}
              className="btn-primary"
              style={{ padding: '16px', fontSize: '1.1rem', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', boxShadow: '0 4px 15px rgba(239,68,68,0.4)' }}
            >
              <Zap size={20} />
              <span>{t.allinBtn}</span>
            </button>

            <button
              onClick={() => handleSelect('Fold')}
              className="btn-secondary"
              style={{ padding: '16px', fontSize: '1.1rem', background: 'rgba(31, 41, 55, 0.9)' }}
            >
              <span>{t.foldBtn}</span>
            </button>

            <button
              onClick={() => handleSelect('Call')}
              className="btn-primary"
              style={{ padding: '16px', fontSize: '1.1rem' }}
            >
              <span>{t.callBtn}</span>
            </button>
          </div>
        ) : (
          <div
            className="animate-fade-in"
            style={{
              backgroundColor: isCorrect ? 'rgba(6, 78, 59, 0.9)' : 'rgba(127, 29, 29, 0.9)',
              border: isCorrect ? '1px solid #10b981' : '1px solid #ef4444',
              borderRadius: '16px',
              padding: '24px',
              marginTop: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isCorrect ? <CheckCircle2 size={28} color="#34d399" /> : <XCircle size={28} color="#f87171" />}
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    {isCorrect ? t.correctTitle : `${t.wrongTitle} ${currentDrill.correctAction}`}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#e5e7eb' }}>
                    {t.yourChoice}：{userChoice || 'Timeout'} | {t.pushEV}: {currentDrill.pushEV > 0 ? `+${currentDrill.pushEV}` : currentDrill.pushEV} BB
                  </div>
                </div>
              </div>

              <button onClick={handleNext} className="btn-gold" style={{ padding: '10px 24px' }}>
                {t.nextBtn}
              </button>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#f3f4f6', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
              💡 <strong>{t.gtoAnalysis}</strong>：{currentDrill.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
