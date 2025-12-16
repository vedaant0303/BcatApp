import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, Lock, LogIn, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface EmployeeLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LoginType = 'selection' | 'admin' | 'employee';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EmployeeLoginModal: React.FC<EmployeeLoginModalProps> = ({ isOpen, onClose }) => {
  const [loginType, setLoginType] = useState<LoginType>('selection');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Password reset state (TEMPORARY FEATURE)
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetMessage, setResetMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(employeeId.toUpperCase(), password);
      onClose();
      // Reset form
      setEmployeeId('');
      setPassword('');
      setLoginType('selection');
      // Navigate to workspace
      navigate('/workspace');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (showPasswordReset) {
      setShowPasswordReset(false);
      setSecretCode('');
      setNewPassword('');
      setConfirmPassword('');
      setResetMessage(null);
    } else {
      setLoginType('selection');
      setError('');
      setEmployeeId('');
      setPassword('');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setLoginType('selection');
      setError('');
      setEmployeeId('');
      setPassword('');
      setShowPasswordReset(false);
      setSecretCode('');
      setNewPassword('');
      setConfirmPassword('');
      setResetMessage(null);
    }, 300);
  };

  // TEMPORARY FEATURE: Reset admin password with secret code
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setResetMessage({ type: 'error', text: 'Passwords do not match' });
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setResetMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/admin-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secretCode, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      setResetMessage({ type: 'success', text: data.message || 'Password reset successful! You can now login.' });
      setSecretCode('');
      setNewPassword('');
      setConfirmPassword('');

      // Auto-hide reset form after success
      setTimeout(() => {
        setShowPasswordReset(false);
        setResetMessage(null);
      }, 3000);
    } catch (err: any) {
      setResetMessage({ type: 'error', text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#1a0b1e] p-6 text-white relative border-b-4 border-[#8E609B]">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Employee Portal
                </h2>
                <p className="text-white/70 text-sm mt-1">
                  {loginType === 'selection' ? 'Select your role to continue' :
                    loginType === 'admin' ? 'Admin Access' : 'Employee Access'}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {loginType === 'selection' ? (
                    <motion.div
                      key="selection"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <p className="text-gray-600 text-center mb-6">
                        Choose your access level to login
                      </p>

                      {/* Admin Login Button */}
                      <button
                        onClick={() => setLoginType('admin')}
                        className="w-full group relative overflow-hidden bg-[#8E609B] text-white p-6 rounded-xl hover:bg-[#6B4779] hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-white/15 p-3 rounded-lg group-hover:bg-white/25 transition-colors">
                            <Shield size={32} />
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                              Admin Login
                            </h3>
                            <p className="text-white/90 text-sm">
                              Full system access & management
                            </p>
                          </div>
                          <LogIn size={24} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>

                      {/* Employee Login Button */}
                      <button
                        onClick={() => setLoginType('employee')}
                        className="w-full group relative overflow-hidden bg-[#FF5722] text-white p-6 rounded-xl hover:bg-[#E64A19] hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-white/15 p-3 rounded-lg group-hover:bg-white/25 transition-colors">
                            <User size={32} />
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                              Employee Login
                            </h3>
                            <p className="text-white/90 text-sm">
                              Access your tasks & projects
                            </p>
                          </div>
                          <LogIn size={24} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="login-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                        {loginType === 'admin' ? (
                          <Shield size={24} className="text-[#8E609B]" />
                        ) : (
                          <User size={24} className="text-[#FF5722]" />
                        )}
                        <div>
                          <p className="font-bold text-gray-900">
                            {loginType === 'admin' ? 'Admin Portal' : 'Employee Portal'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {loginType === 'admin'
                              ? (showPasswordReset ? 'Reset your admin password' : 'Use ID: ADMIN001, Password: admin123')
                              : 'Use ID: EMP001-004, Password: password123'}
                          </p>
                        </div>
                      </div>

                      {/* Show password reset form for admin */}
                      {showPasswordReset && loginType === 'admin' ? (
                        <form onSubmit={handlePasswordReset} className="space-y-4">
                          {resetMessage && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`px-4 py-3 rounded-lg text-sm ${resetMessage.type === 'success'
                                  ? 'bg-green-50 border border-green-200 text-green-600'
                                  : 'bg-red-50 border border-red-200 text-red-600'
                                }`}
                            >
                              {resetMessage.text}
                            </motion.div>
                          )}

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Secret Code
                            </label>
                            <div className="relative">
                              <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                                placeholder="Enter secret code"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8E609B] focus:outline-none transition-colors text-gray-900 caret-[#8E609B]"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8E609B] focus:outline-none transition-colors text-gray-900 caret-[#8E609B]"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8E609B] focus:outline-none transition-colors text-gray-900 caret-[#8E609B]"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              type="button"
                              onClick={handleBack}
                              className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={isLoading}
                              className={`flex-[2] py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#8E609B] text-white hover:bg-[#6B4779] hover:shadow-lg'
                                }`}
                            >
                              {isLoading ? (
                                <>
                                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Resetting...
                                </>
                              ) : (
                                <>
                                  <Key size={20} />
                                  Reset Password
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* Regular login form */
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
                            >
                              {error}
                            </motion.div>
                          )}

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              {loginType === 'admin' ? 'Admin ID' : 'Employee ID'}
                            </label>
                            <input
                              type="text"
                              value={employeeId}
                              onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                              placeholder={loginType === 'admin' ? 'ADMIN001' : 'EMP001'}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8E609B] focus:outline-none transition-colors text-gray-900 caret-[#8E609B]"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8E609B] focus:outline-none transition-colors text-gray-900 caret-[#8E609B]"
                                required
                              />
                            </div>
                          </div>

                          {/* Forgot Password link - Only for Admin */}
                          {loginType === 'admin' && (
                            <div className="text-right">
                              <button
                                type="button"
                                onClick={() => setShowPasswordReset(true)}
                                className="text-sm text-[#8E609B] hover:text-[#6B4779] hover:underline transition-colors"
                              >
                                Forgot Password?
                              </button>
                            </div>
                          )}

                          <div className="flex gap-3 pt-2">
                            <button
                              type="button"
                              onClick={handleBack}
                              className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={isLoading}
                              className={`flex-[2] py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#8E609B] text-white hover:bg-[#6B4779] hover:shadow-lg'
                                }`}
                            >
                              {isLoading ? (
                                <>
                                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Logging in...
                                </>
                              ) : (
                                <>
                                  <LogIn size={20} />
                                  Login
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmployeeLoginModal;
