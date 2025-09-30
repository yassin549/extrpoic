import React from 'react';
import tokens from '../tokens/design-tokens.json';
import typography from '../tokens/typography.json';
const GameCard: React.FC<{ title: string; tags: string[]; players: string; large?: boolean }> = ({ title, tags, players, large = false }) => (
  <div style={{
    background: tokens.color['card-dark'],
    border: `1px solid ${tokens.color['subtle-border']}`,
    borderRadius: tokens.radius['radius-md'],
    overflow: 'hidden',
    transition: `all ${tokens.motion['duration-short']} ${tokens.motion['easing-standard']}`,
    gridColumn: large ? 'span 2' : 'span 1',
  }} className="game-card">
    <div style={{ aspectRatio: '16 / 9', background: tokens.color['muted-surface'] }} />
    <div style={{ padding: tokens.spacing['space-3'] }}>
      <h3 style={{ ...typography.h3, color: tokens.color['light-text'] }}>{title}</h3>
      <div style={{ display: 'flex', gap: '8px', margin: '8px 0' }}>
        {tags.map(tag => <span key={tag} style={{ ...typography.micro, background: tokens.color['muted-surface'], padding: '4px 8px', borderRadius: '4px' }}>{tag}</span>)}
      </div>
      <p style={{ ...typography.micro, color: tokens.color['mid-gray'] }}>{players} players online</p>
    </div>
  </div>
);

const Lobby: React.FC = () => {
  return (
    <div style={{ background: tokens.color['bg-dark'], minHeight: '100vh', padding: `${tokens.spacing['space-8']} ${tokens.spacing['space-7']}` }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <h1 style={{ ...typography.h1, fontFamily: typography['font-family'].display, color: tokens.color['light-text'], marginBottom: tokens.spacing['space-6'] }}>Game Lobby</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: tokens.spacing['space-5'] }}>
          <GameCard title="Aviator" tags={['Provably Fair', 'Crash Game']} players="1,234" large />
          <GameCard title="Slots" tags={['New']} players="456" />
          <GameCard title="Blackjack" tags={['Live Dealer']} players="789" />
          <GameCard title="Roulette" tags={['Classic']} players="321" />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
