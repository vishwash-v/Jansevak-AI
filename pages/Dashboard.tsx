import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Mic, ArrowRight, Settings, SlidersHorizontal, Check, Info, AlertCircle } from 'lucide-react';
import { MOCK_USER, SCHEMES, STATS, NOTIFICATIONS, INDIAN_STATES } from '../constants';
import { Scheme } from '../types';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Dashboard: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showNotifications, setShowNotifications] = useState(false);
  const [location, setLocation] = useState(MOCK_USER.location);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusColor = (status: Scheme['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Approved': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'bg-green-500';
    if (match >= 75) return 'bg-green-400';
    return 'bg-orange-400';
  };
  
  // Helper to translate categories from data
  const translateCategory = (cat: string) => {
    const key = `dash.filter.${cat.toLowerCase().split(' ')[0]}`;
    const translated = t(key);
    return translated !== key ? translated : cat;
  };
  
  // Helper to translate status
  const translateStatus = (status: string) => {
      const key = `dash.status.${status.toLowerCase().replace(' ', '')}`;
      const translated = t(key);
      return translated !== key ? translated : status;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('welcome')}, {MOCK_USER.name}!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t('dash.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-3 relative">
          <div ref={notificationRef} className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell size={18} />
              <span className="hidden sm:inline">{t('dash.notifications')}</span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ml-1">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-fade-in-up">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                  <button className="text-xs text-orange-600 dark:text-orange-400 font-medium hover:underline">Mark all as read</button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                   {NOTIFICATIONS.map((notif) => (
                     <div key={notif.id} className={`p-4 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer ${!notif.read ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''}`}>
                       <div className="flex gap-3">
                         <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                           notif.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                           notif.type === 'alert' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                           'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                         }`}>
                            {notif.type === 'success' ? <Check size={14} /> : notif.type === 'alert' ? <AlertCircle size={14} /> : <Info size={14} />}
                         </div>
                         <div>
                           <div className="flex justify-between items-start">
                             <h4 className={`text-sm font-semibold ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                               {notif.title}
                             </h4>
                             <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                           </div>
                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                             {notif.message}
                           </p>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 text-center">
                  <button className="text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => navigate('/voice')}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium shadow-md hover:bg-orange-600 transition-colors"
          >
            <Mic size={18} />
            <span className="hidden sm:inline">{t('dash.voiceBtn')}</span>
          </button>
        </div>
      </div>

      {/* Voice/Search Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 shadow-xl">
        <div className="absolute top-0 right-0 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path fill="currentColor" d="M45,-78C59,-69,71,-57,79,-43C87,-29,91,-13,89,3C87,19,79,35,68,48C57,61,43,71,28,76C13,81,-3,81,-18,78C-33,75,-47,69,-59,58C-71,47,-81,31,-83,14C-85,-3,-79,-20,-69,-34C-59,-48,-45,-59,-31,-68C-17,-77,-1,-84,15,-84L15,-78Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=jansevak`} alt="AI" className="w-8 h-8" />
            </div>
            <div>
              {/* Updated Text using specific translation keys */}
              <h3 className="text-xl font-bold mb-2">{t('dash.hero.title')}</h3>
              <p className="text-blue-100 text-sm leading-relaxed max-w-2xl">
                 {t('dash.hero.subtitle')}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder={t('dash.searchPlaceholder')}
                className="w-full pl-6 pr-12 py-4 rounded-xl text-gray-800 bg-white/95 backdrop-blur shadow-lg border-0 focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
              />
              <Search className="absolute right-4 top-4 text-gray-400" size={20} />
            </div>
            <button 
              onClick={() => navigate('/voice')}
              className="bg-white text-blue-700 px-6 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Mic size={20} />
              {t('dash.speak')}
            </button>
          </div>
          
          <div className="mt-4 flex items-center text-xs text-blue-200 gap-2">
            <span className="w-4 h-4 rounded-full border border-blue-200 flex items-center justify-center text-[10px]">i</span>
            {t('dash.info')}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => {
          // Dynamic translation for stat labels
          let translatedLabel = stat.label;
          if (stat.label === 'Eligible Schemes') translatedLabel = t('dash.stats.eligible');
          if (stat.label === 'Applications in Progress') translatedLabel = t('dash.stats.progress');
          if (stat.label === 'Approved Benefits') translatedLabel = t('dash.stats.approved');
          if (stat.label === 'Benefits Received') translatedLabel = t('dash.stats.received');

          return (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                  stat.color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' :
                  stat.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                }`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  stat.subValue?.includes('+') 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {stat.subValue}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{translatedLabel}</p>
            </div>
          )
        })}
      </div>

      {/* Schemes List Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
        {/* Filter Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex space-x-6 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {['All Schemes', 'Education', 'Healthcare', 'Housing', 'Employment'].map((cat) => {
              // translate tabs
               let label = cat;
               if(cat === 'All Schemes') label = t('dash.filter.all');
               else label = translateCategory(cat);

               return (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat.split(' ')[0])}
                    className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${
                      filterCategory === cat.split(' ')[0]
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {label}
                  </button>
               )
            })}
          </div>
          <div className="flex gap-2">
            <div ref={locationRef} className="relative">
              <button 
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-1">
                  Map <span className="text-gray-400 dark:text-gray-600">|</span> {location}
                </div>
              </button>

              {/* Location Dropdown */}
              {isLocationOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-fade-in origin-top-right">
                  <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Select Region</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {INDIAN_STATES.map((state) => (
                      <button
                        key={state}
                        onClick={() => {
                          setLocation(state);
                          setIsLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center ${
                          location === state 
                            ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 font-bold' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {state}
                        {location === state && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-900/50 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <div className="col-span-4">{t('dash.table.name')}</div>
          <div className="col-span-2 text-center">{t('dash.table.category')}</div>
          <div className="col-span-2">{t('dash.table.match')}</div>
          <div className="col-span-2">{t('dash.table.benefit')}</div>
          <div className="col-span-1 text-center">{t('dash.table.status')}</div>
          <div className="col-span-1 text-right">{t('dash.table.action')}</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {SCHEMES.map((scheme) => (
            <div key={scheme.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="col-span-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    scheme.category === 'Education' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    scheme.category === 'Healthcare' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                    scheme.category === 'Housing' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                    'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                  }`}>
                    {scheme.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{scheme.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{scheme.ministry}</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                  {translateCategory(scheme.category)}
                </span>
              </div>

              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${getMatchColor(scheme.eligibilityMatch)}`} 
                      style={{ width: `${scheme.eligibilityMatch}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-bold ${
                    scheme.eligibilityMatch >= 90 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
                  }`}>
                    {scheme.eligibilityMatch}%
                  </span>
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{scheme.benefitAmount}</span>
              </div>

              <div className="col-span-1 text-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(scheme.status)}`}>
                  {scheme.status === 'Active' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>}
                  {translateStatus(scheme.status)}
                </span>
              </div>

              <div className="col-span-1 text-right">
                <button 
                  onClick={() => navigate(scheme.status === 'Pending' ? '/applications' : `/scheme/${scheme.id}`)}
                  className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 flex items-center justify-end gap-1 ml-auto"
                >
                  {scheme.status === 'Not Started' ? t('dash.action.apply') : 
                   scheme.status === 'Pending' ? t('dash.action.continue') : t('dash.action.view')}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-center">
           <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Showing 1 to 5 of 24 schemes</button>
        </div>
      </div>
      
      {/* User Footer Profile */}
      <div 
        onClick={() => navigate('/profile')}
        className="fixed bottom-0 left-0 w-64 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 hidden md:flex items-center justify-between z-20 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="flex items-center space-x-3">
           <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${MOCK_USER.name}`} 
            alt="Profile" 
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800" 
          />
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{MOCK_USER.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{MOCK_USER.location}</p>
          </div>
        </div>
        <Settings size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
      </div>
    </div>
  );
};

export default Dashboard;