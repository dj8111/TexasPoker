import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Share2, QrCode, Copy, Check, Mail, MessageCircle, Send, X } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, lang }) => {
  const t = TRANSLATIONS[lang].shareModal;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://poker-pro-academy.local';

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        currentUrl,
        {
          width: 180,
          margin: 2,
          color: {
            dark: '#0f172a',
            light: '#ffffff'
          }
        },
        (error) => {
          if (error) console.error('Error generating QR code', error);
        }
      );
    }
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareTitle = encodeURIComponent('Poker Pro Academy - 德州撲克錦標賽專業訓練系統');
  const shareUrl = encodeURIComponent(currentUrl);

  const socialLinks = [
    {
      name: 'LINE',
      url: `https://social-plugins.line.me/lineit/share?url=${shareUrl}`,
      color: '#06C755',
      icon: MessageCircle
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      color: '#1DA1F2',
      icon: Send
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: '#1877F2',
      icon: Share2
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
      color: '#24A1DE',
      icon: Send
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`,
      color: '#25D366',
      icon: MessageCircle
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(t.emailBody + ' ' + currentUrl)}`,
      color: '#ea580c',
      icon: Mail
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 8, 15, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '30px',
          borderRadius: '20px',
          background: 'linear-gradient(180deg, #131b2e 0%, #0b0f19 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            color: '#9ca3af',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div
            style={{
              padding: '8px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex'
            }}
          >
            <Share2 size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
              {t.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{t.subtitle}</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px',
            margin: '20px 0'
          }}
        >
          <div
            style={{
              padding: '10px',
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
              display: 'inline-block'
            }}
          >
            <canvas ref={canvasRef} style={{ display: 'block', borderRadius: '4px' }} />
          </div>
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>
              {t.qrTitle}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '2px', maxWidth: '360px' }}>
              {t.qrDesc}
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, marginBottom: '10px' }}>
            {t.socialTitle}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.backgroundColor = `${item.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  }}
                >
                  <Icon size={16} color={item.color} />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Copy Link Input & Button */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            readOnly
            value={currentUrl}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              color: '#9ca3af',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)'
            }}
          />
          <button
            onClick={handleCopy}
            className={copied ? 'btn-gold' : 'btn-primary'}
            style={{ padding: '10px 16px', fontSize: '0.85rem' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? t.copied : t.copyLink}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
