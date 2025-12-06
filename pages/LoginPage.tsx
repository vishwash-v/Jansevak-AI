import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Smartphone, ArrowRight, Shield, Loader2, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setIsLoading(true);
      setError('');
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 1500);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setIsLoading(true);
      setError('');
      // Simulate verification
      setTimeout(() => {
        setIsLoading(false);
        if (otp === '1234') {
          onLogin();
          navigate('/dashboard');
        } else {
          setError('Invalid OTP. Please try again.');
        }
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
           <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            J
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to Jansevak AI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Access your schemes securely with mobile OTP
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleSendOtp}>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    className="block w-full pl-12 pr-10 py-3 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm placeholder-gray-400"
                    placeholder="Enter 10 digit number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    disabled={isLoading}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={mobile.length !== 10 || isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
             <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <span className="font-bold">Demo Mode:</span> Use OTP <span className="font-bold font-mono">1234</span> to login.
                </p>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enter OTP sent to +91 {mobile}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    className={`block w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm tracking-[0.5em] text-center font-bold text-xl ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    placeholder="0000"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, '').slice(0, 4));
                      setError('');
                    }}
                    disabled={isLoading}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
                {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button 
                    type="button" 
                    onClick={() => {
                      setStep(1);
                      setOtp('');
                      setError('');
                    }} 
                    className="font-medium text-orange-600 dark:text-orange-400 hover:text-orange-500"
                    disabled={isLoading}
                  >
                    Change Number
                  </button>
                </div>
                <div className="text-sm">
                  <button type="button" className="font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500" disabled={isLoading}>
                    Resend OTP
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={otp.length !== 4 || isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                   {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Proceed"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="mt-6 flex justify-center space-x-6 text-gray-400 dark:text-gray-500">
             <span className="flex items-center gap-1 text-xs"><Shield size={12}/> Secure Login</span>
             <span className="flex items-center gap-1 text-xs"><Lock size={12}/> Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;