
import React from 'react';
import { LayoutDashboard, Search, FileText, CheckSquare, Folder, Mic, Languages, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { icon: LayoutDashboard, label: t('menu.dashboard'), path: '/dashboard' },
    { icon: Search, label: t('menu.discover'), path: '/discover' },
    { icon: FileText, label: t('menu.applications'), path: '/applications', badge: 12 },
    { icon: CheckSquare, label: t('menu.approved'), path: '/approved' },
    { icon: Folder, label: t('menu.documents'), path: '/documents' },
  ];

  const supportItems = [
    { icon: Mic, label: t('menu.voice'), path: '/voice' },
    { icon: Languages, label: t('menu.language'), path: '/language' },
    { icon: HelpCircle, label: t('menu.help'), path: '/help' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-10 hidden md:flex transition-colors duration-200">
      <div className="p-6 flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
          J
        </div>
        <div>
          <h1 className="font-bold text-gray-800 dark:text-white text-lg">{t('app.name')}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('app.tagline')}</p>
        </div>
      </div>

      <div className="flex-1 px-4 space-y-8 overflow-y-auto">
        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('menu.main')}</h3>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-l-4 border-orange-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className={isActive(item.path) ? 'text-orange-500' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('menu.support')}</h3>
          <div className="space-y-1">
            {supportItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive(item.path) ? 'text-orange-500' : 'text-gray-400'} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between px-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('menu.theme')}</span>
            <ThemeToggle />
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut size={20} />
          <span>{t('auth.signout')}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
