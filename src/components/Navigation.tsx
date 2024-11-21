import { Bell, CreditCard, Menu, Search, User } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './auth/AuthModal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  AiGeniusworks
                </span>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-end">
              <div className="flex-shrink-0 mx-4">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search tools..."
                  />
                </div>
              </div>
              <a
                href="/submit-tool"
                className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Submit Your Tool! Earn!
              </a>
              <div className="hidden md:ml-4 md:flex md:items-center">
                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <Bell className="h-6 w-6" />
                </button>
                <a
                  href="/credits"
                  className="ml-2 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <CreditCard className="h-6 w-6" />
                </a>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="ml-2 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <User className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="/submit-tool"
                className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Submit Your Tool! Earn!
              </a>
              <button
                onClick={() => setShowAuthModal(true)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}