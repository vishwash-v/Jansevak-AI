
import React, { useState } from 'react';
import { Search, Check, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../utils/translations';

const LANGUAGES = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'ks', name: 'Kashmiri', native: 'कॉशुर' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी' },
  { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'sant', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
];

const LanguageSettings: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<string>(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // Cast to LanguageCode if it exists in our supported list, otherwise it might just change state but no translation map
    setLanguage(selectedLang as LanguageCode);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const filteredLanguages = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.native.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t('settings.subtitle')}</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-colors flex items-center gap-2"
        >
          {isSaved ? <Check size={18} /> : null}
          {isSaved ? t('settings.saved') : t('settings.save')}
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('settings.search')}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`relative p-4 rounded-xl border-2 transition-all text-left group ${
              selectedLang === lang.code
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                : 'border-transparent bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600 shadow-sm'
            }`}
          >
            {selectedLang === lang.code && (
              <div className="absolute top-3 right-3 text-orange-500">
                <Check size={18} />
              </div>
            )}
            <div className="mb-2 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-600">
              <span className="text-xs font-bold">{lang.code.toUpperCase()}</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">{lang.native}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{lang.name}</p>
          </button>
        ))}
      </div>
      
      {filteredLanguages.length === 0 && (
         <div className="text-center py-12 text-gray-500">
            No languages found matching "{searchQuery}"
         </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 items-start border border-blue-100 dark:border-blue-800">
         <Globe className="text-blue-500 shrink-0 mt-0.5" size={20} />
         <div>
           <h4 className="font-bold text-blue-700 dark:text-blue-300 text-sm mb-1">{t('settings.info.title')}</h4>
           <p className="text-sm text-blue-600 dark:text-blue-400">
             {t('settings.info.desc')}
           </p>
         </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
