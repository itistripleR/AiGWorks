import { X } from 'lucide-react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="w-full">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h3>
                <div className="mt-6">
                  {isLogin ? <LoginForm /> : <SignupForm />}
                  <div className="mt-4 text-center text-sm">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-purple-600 hover:text-purple-500"
                    >
                      {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}