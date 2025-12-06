import React from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { SCHEMES } from '../constants';
import { useNavigate } from 'react-router-dom';

const DiscoverSchemes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Discover Schemes</h2>
           <p className="text-gray-500 dark:text-gray-400 text-sm">Find benefits tailored to your profile.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-800">
             <Filter size={16} /> Filters
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-800 dark:hover:bg-gray-600">
             <MapPin size={16} /> Maharashtra
           </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by keyword, ministry, or benefit..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SCHEMES.map(scheme => (
          <div key={scheme.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
             <div className="flex justify-between items-start mb-4">
               <div className={`px-2 py-1 rounded uppercase tracking-wide text-xs font-bold ${
                 scheme.category === 'Education' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                 scheme.category === 'Healthcare' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
               }`}>
                 {scheme.category}
               </div>
               <span className="text-green-600 dark:text-green-400 font-bold text-sm">{scheme.eligibilityMatch}% Match</span>
             </div>
             <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{scheme.name}</h3>
             <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{scheme.ministry}</p>
             <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">{scheme.description}</p>
             
             <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
               <div>
                 <p className="text-xs text-gray-400">Benefit</p>
                 <p className="font-bold text-gray-900 dark:text-white">{scheme.benefitAmount}</p>
               </div>
               <button 
                  onClick={() => navigate(`/scheme/${scheme.id}`)}
                  className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-bold rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                >
                 View Details
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverSchemes;