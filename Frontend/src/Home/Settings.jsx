import React, { useState } from 'react';
import { FaUser, FaLock, FaGift, FaExclamationTriangle, FaCopy, FaArrowLeft, FaEdit } from 'react-icons/fa';

const Settings = ({ user, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'PRITY KUMARI',
    email: 'sunil.2024@mitmeerut.ac.in',
    mobile: '95238776587'
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const referralCode = '73C4E3FA';

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!profileData.fullName || !profileData.email || !profileData.mobile) {
      alert('All fields are required');
      return;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    // Mobile validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(profileData.mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    // Success (in real app, this would call an API)
    setPasswordSuccess('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request sent (demo)');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
        >
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account preferences</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Profile Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <FaUser className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-all"
              >
                <FaEdit /> Edit
              </button>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">Update your personal details</p>

          {isEditing ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={profileData.mobile}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium">
                    {profileData.fullName}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium">
                    {profileData.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Mobile
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium">
                    {profileData.mobile}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Update Profile
              </button>
            </>
          )}
        </div>

        {/* Change Password Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <FaLock className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">Update your account password</p>

          {passwordError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
              {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
              {passwordSuccess}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Referral Code Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <FaGift className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Referral Code</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">Share with friends to earn rewards</p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-xl font-mono text-2xl font-bold text-primary tracking-wider">
              {referralCode}
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-6 py-3 rounded-lg transition-all"
            >
              <FaCopy />
              <span>{copySuccess || 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-red-200 dark:border-red-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Irreversible actions
          </p>

          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;