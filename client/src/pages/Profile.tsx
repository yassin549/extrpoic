import React from 'react';
import Avatar from '../components/Avatar';
import PrimaryButton from '../components/PrimaryButton';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-8 text-light-text max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      {/* Public Info */}
      <section className="mb-12 flex items-center gap-6">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Name" size="lg" status="online" />
        <div>
          <h2 className="text-2xl font-bold">Player123</h2>
          <p className="text-mid-gray">High-flying aviator.</p>
        </div>
      </section>

      {/* Verification */}
      <section className="mb-12 bg-card-dark p-6 rounded-md">
        <h3 className="text-xl font-bold mb-4">Verification Status</h3>
        <div className="flex items-center justify-between">
          <p className="text-neon-amber">Pending</p>
          <PrimaryButton label="Complete Verification" onClick={() => {}} />
        </div>
        <p className="text-sm text-mid-gray mt-2">Complete verification to unlock higher limits.</p>
      </section>

      {/* Wallets */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Linked Wallets</h3>
        <div className="space-y-2 text-sm font-mono text-mid-gray">
          <p>bc1qxy2k...hjhx0wlh</p>
          <p>0x1234...5678</p>
        </div>
      </section>

      {/* Activity */}
      <section>
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <p className="text-mid-gray">Recent activity will be shown here.</p>
      </section>
    </div>
  );
};

export default ProfilePage;
