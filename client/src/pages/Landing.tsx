import React from 'react';
import tokens from '../tokens/design-tokens.json';
import typography from '../tokens/typography.json';
import PrimaryButton from '../components/PrimaryButton';
import GameCanvas from '../components/GameCanvas';

const Landing: React.FC = () => {
  const backgroundStyle = {
    backgroundColor: tokens.color['bg-dark'],
    backgroundImage: 'radial-gradient(#253041 1px, transparent 1px), radial-gradient(#253041 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    backgroundPosition: '0 0, 20px 20px',
    minHeight: '100vh',
    padding: `0 ${tokens.spacing['space-8']}`,
  };

  return (
    <div style={backgroundStyle}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', minHeight: '100vh', gap: tokens.spacing['space-8'] }}>
        {/* Left Column: Headline & CTAs */}
        <div>
          <h1 style={{ ...typography.h1, fontFamily: typography['font-family'].display, color: tokens.color['light-text'], marginBottom: tokens.spacing['space-4'] }}>
            Fly Fast. <br /> Cash Out Sooner.
          </h1>
          <p style={{ ...typography['body-lg'], color: tokens.color['mid-gray'], marginBottom: tokens.spacing['space-6'], maxWidth: '450px' }}>
            The thrilling multiplayer crash game. Place your bet, watch the multiplier climb, and cash out before the plane flies away.
          </p>
          <div style={{ display: 'flex', gap: tokens.spacing['space-4'], marginBottom: tokens.spacing['space-6'] }}>
            <PrimaryButton>Play Aviator</PrimaryButton>
            <PrimaryButton variant="secondary">How It Works</PrimaryButton>
          </div>
          <div style={{ display: 'flex', gap: tokens.spacing['space-5'], color: tokens.color['mid-gray'], ...typography.micro }}>
            <span>Provably Fair</span>
            <span>Instant Withdrawals</span>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* Right Column: Live Demo */}
        <div style={{ backgroundColor: tokens.color['card-dark'], borderRadius: tokens.radius['radius-md'], padding: tokens.spacing['space-3'], border: `1px solid ${tokens.color['subtle-border']}` }}>
          <GameCanvas multiplier={1.88} status="flying" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
