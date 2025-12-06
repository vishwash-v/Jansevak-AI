
import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Bell, Globe, Shield } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const ProfilePage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(`https://api.dicebear.com/7.x/avataaars/svg?seed=${MOCK_USER.name}`);
  
  const [user, setUser] = useState({
    name: MOCK_USER.name,
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    location: MOCK_USER.location,
    dob: '1985-08-15',
    gender: 'Male'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API save
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile.title')}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t('profile.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- ROW 1 --- */}
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm text-center h-full flex flex-col justify-center">
            <div className="relative inline-block mb-4 mx-auto">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 object-cover"
              />
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 border-4 border-white dark:border-gray-800 transition-colors"
              >
                <Camera size={16} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{user.location}</p>
            <div className="inline-flex items-center justify-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold w-fit mx-auto">
              <Shield size={12} /> Verified Citizen
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <User size={20} className="text-orange-500" /> {t('profile.personal')}
              </h3>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700"
                >
                  Edit Details
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Gender
                </label>
                <select 
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="dob"
                    value={user.dob}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {!isEditing && <Calendar className="absolute right-3 top-2.5 text-gray-400" size={18} />}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  State / Location
                </label>
                <div className="relative">
                   <input 
                    type="text" 
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {!isEditing && <MapPin className="absolute right-3 top-2.5 text-gray-400" size={18} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ROW 2 --- */}
        {/* Score Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg h-full flex flex-col justify-center">
             <h4 className="font-bold text-lg mb-1">Jansevak Score</h4>
             <p className="text-orange-100 text-sm mb-4">Based on profile completeness</p>
             <div className="flex items-end gap-2 mb-2">
               <span className="text-4xl font-bold">92</span>
               <span className="text-lg opacity-80 mb-1">/100</span>
             </div>
             <div className="w-full bg-black/20 rounded-full h-2">
               <div className="bg-white rounded-full h-2" style={{ width: '92%' }}></div>
             </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm h-full flex flex-col justify-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <Phone size={20} className="text-orange-500" /> {t('profile.contact')}
            </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- ROW 3 --- */}
        {/* Settings - Full Width */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <Globe size={20} className="text-orange-500" /> {t('profile.settings')}
            </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    App Language
                  </label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    disabled={!isEditing}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Notifications
                  </label>
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Bell size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Push Notifications</span>
                    <div className={`ml-auto w-10 h-5 rounded-full relative cursor-pointer ${isEditing ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
               </div>
             </div>
             
             {isEditing && (
              <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 disabled:opacity-70"
                >
                  {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
