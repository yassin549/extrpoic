import React from 'react';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import SegmentedControl from '../components/SegmentedControl';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-8 text-light-text max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      {/* Account */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Account</h2>
        <div className="space-y-4 bg-card-dark p-6 rounded-md">
          <Input label="Email" value="user@example.com" disabled />
          <PrimaryButton label="Change Password" tone="secondary" onClick={() => {}} />
        </div>
      </section>

      {/* Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Security</h2>
        <div className="space-y-4 bg-card-dark p-6 rounded-md">
          <p>2-Factor Authentication is <span className="text-emerald-win">Enabled</span>.</p>
          <PrimaryButton label="Manage 2FA" tone="secondary" onClick={() => {}} />
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Preferences</h2>
        <div className="space-y-6 bg-card-dark p-6 rounded-md">
          <div>
            <h4 className="font-semibold mb-2">Currency</h4>
            <SegmentedControl options={[{id: 'usd', label: 'USD'}, {id: 'eur', label: 'EUR'}]} value={'usd'} onChange={() => {}} />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Reduced Motion</h4>
            <SegmentedControl options={[{id: 'off', label: 'Off'}, {id: 'on', label: 'On'}]} value={'off'} onChange={() => {}} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default SettingsPage;
