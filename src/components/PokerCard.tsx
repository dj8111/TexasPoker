import React from 'react';
import { Card } from '../data/pokerData';

interface PokerCardProps {
  card: Card;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const suitSymbols: Record<Card['suit'], { symbol: string; colorClass: string; name: string }> = {
  s: { symbol: '♠', colorClass: 'spade', name: '黑桃' },
  h: { symbol: '♥', colorClass: 'heart', name: '紅心' },
  d: { symbol: '♦', colorClass: 'diamond', name: '方塊' },
  c: { symbol: '♣', colorClass: 'club', name: '梅花' }
};

export const PokerCard: React.FC<PokerCardProps> = ({ card, size = 'md', className = '' }) => {
  const suitInfo = suitSymbols[card.suit] || suitSymbols.s;

  const sizeStyles = {
    sm: { width: '38px', height: '54px', rankSize: '0.9rem', suitSize: '0.9rem' },
    md: { width: '48px', height: '68px', rankSize: '1.15rem', suitSize: '1.15rem' },
    lg: { width: '64px', height: '92px', rankSize: '1.5rem', suitSize: '1.5rem' }
  }[size];

  return (
    <div
      className={`poker-card ${suitInfo.colorClass} ${className}`}
      style={{
        width: sizeStyles.width,
        height: sizeStyles.height,
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '4px 6px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 6px 14px rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(0,0,0,0.15)',
        userSelect: 'none',
        position: 'relative',
        fontWeight: 800
      }}
    >
      <div style={{ fontSize: sizeStyles.rankSize, lineHeight: 1, fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
        {card.rank}
      </div>
      <div style={{ fontSize: sizeStyles.suitSize, lineHeight: 1, alignSelf: 'flex-end' }}>
        {suitInfo.symbol}
      </div>
    </div>
  );
};
