
import React from 'react';
import { ArrowRight, Mic, Shield, Smartphone, Globe, CheckCircle, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useLanguage } from '../context/LanguageContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      {/* Navbar */}
      <nav className="border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              J
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">{t('app.name')}</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <a href="#features" className="hover:text-orange-600 dark:hover:text-orange-400">Features</a>
            <a href="#languages" className="hover:text-orange-600 dark:hover:text-orange-400">Languages</a>
            <a href="#schemes" className="hover:text-orange-600 dark:hover:text-orange-400">Schemes</a>
            <a href="#about" className="hover:text-orange-600 dark:hover:text-orange-400">About</a>
          </div>
          <div className="flex items-center space-x-4">
             <ThemeToggle />
            <button onClick={() => navigate('/login')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('auth.signin')}
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all"
            >
              {t('auth.getStarted')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-green-100/50 to-transparent dark:from-green-900/20"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-orange-100/50 to-transparent dark:from-orange-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800 text-orange-600 dark:text-orange-400 text-xs font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span>Now supporting 22 Indian languages</span>
                <ArrowRight size={12} />
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                {t('landing.hero.title')}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {t('landing.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold shadow-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                >
                  <Mic size={20} className="text-green-400 dark:text-green-600" />
                  {t('landing.hero.voice')}
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  {t('landing.hero.type')}
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 grayscale opacity-60 dark:opacity-40">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                  <Shield size={16} /> DigiLocker
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                  <Smartphone size={16} /> UMANG
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                  <Globe size={16} /> IndiaStack
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
               {/* Decorative card stack simulating the UI */}
               <div className="relative w-full max-w-lg mx-auto">
                 <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-blob"></div>
                 <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
                 <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
                 
                 <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Mic size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Voice Recognition</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">22 Indian languages supported</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-600">
                      <p className="text-sm text-gray-600 dark:text-gray-300 italic">"मुझे किसान सम्मान निधि योजना की जानकारी चाहिए"</p>
                      <div className="flex gap-1 mt-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                        <span className="text-xs text-gray-400 ml-2">Listening...</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">PM</div>
                          <div>
                            <p className="text-xs font-bold dark:text-white">PM Kisan Samman Nidhi</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Agriculture • ₹6,000/year</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm opacity-80">
                         <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">AB</div>
                          <div>
                            <p className="text-xs font-bold dark:text-white">Ayushman Bharat</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Healthcare • ₹5L Coverage</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-gray-400" />
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('landing.features.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Simple, secure, personalized support designed for every Indian citizen.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Mic,
              title: "Voice-First Interface",
              desc: "Speak in any of 22 Indian languages. Our AI understands your needs and guides you step-by-step.",
              color: "bg-orange-500"
            },
            {
              icon: Smartphone,
              title: "Personalized Matching",
              desc: "Describe your situation and we'll instantly match you to relevant welfare schemes.",
              color: "bg-green-500"
            },
            {
              icon: Shield,
              title: "Secure & Private",
              desc: "Your information is safe and used only to personalize your scheme eligibility.",
              color: "bg-blue-600"
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{feature.desc}</p>
              <ul className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <CheckCircle size={12} className="text-green-500 mr-2" />
                    Feature benefit point {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Language Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Speak Your Language</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
             {['हिंदी', 'বাংলা', 'తెలుగు', 'मराठी', 'தமிழ்', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം', 'Odia', 'Punjabi', 'اردو', 'অসমীয়া'].map((lang, idx) => (
               <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-orange-500 transition-colors cursor-default">
                 <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{lang}</h4>
                 <p className="text--[10px] text-gray-400 uppercase tracking-wider">Supported</p>
               </div>
             ))}
          </div>
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">+ 10 more languages including Sanskrit, Kashmiri, Konkani, Manipuri, and more</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-orange-500 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">{t('landing.cta.title')}</h2>
          <p className="text-orange-100 text-lg mb-10">{t('landing.cta.desc')}</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              {t('landing.cta.btn')} <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <PlayCircle size={20} /> {t('landing.cta.demo')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
             <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                J
              </div>
              <span className="font-bold text-xl">{t('app.name')}</span>
            </div>
            <p className="text-gray-400 text-sm">India's Intelligent Assistant for Welfare Access.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase text-gray-500">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Languages</a></li>
              <li><a href="#" className="hover:text-white">Schemes Database</a></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold mb-4 text-sm uppercase text-gray-500">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">User Guide</a></li>
              <li><a href="#" className="hover:text-white">Contact Support</a></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold mb-4 text-sm uppercase text-gray-500">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          © 2024 Jansevak AI. A Digital India Initiative.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
