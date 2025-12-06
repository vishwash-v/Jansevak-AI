import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, MapPin, X, Check } from 'lucide-react';
import { SCHEMES, INDIAN_STATES } from '../constants';
import { useNavigate } from 'react-router-dom';

const DiscoverSchemes: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [location, setLocation] = useState('Maharashtra');

  const filterRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = Array.from(new Set(SCHEMES.map(s => s.category)));
  // Use shared INDIAN_STATES constant
  const locations = INDIAN_STATES;

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredSchemes = SCHEMES.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.ministry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(scheme.category);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Discover Schemes</h2>
           <p className="text-gray-500 dark:text-gray-400 text-sm">Find benefits tailored to your profile.</p>
        </div>
        <div className="flex gap-2 relative z-20">
           {/* Filter Button */}
           <div ref={filterRef} className="relative">
             <button
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-colors ${
                 isFilterOpen || selectedCategories.length > 0
                   ? 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-500'
                   : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-800'
               }`}
             >
               <Filter size={16} />
               Filters
               {selectedCategories.length > 0 && (
                 <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                   {selectedCategories.length}
                 </span>
               )}
             </button>

             {/* Filter Dropdown */}
             {isFilterOpen && (
               <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 animate-fade-in origin-top-right">
                 <div className="flex justify-between items-center mb-3">
                   <h3 className="font-bold text-gray-900 dark:text-white text-sm">Categories</h3>
                   {selectedCategories.length > 0 && (
                     <button
                       onClick={() => setSelectedCategories([])}
                       className="text-xs text-orange-600 hover:text-orange-700 dark:text-orange-400"
                     >
                       Clear All
                     </button>
                   )}
                 </div>
                 <div className="space-y-1">
                   {categories.map(cat => (
                     <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                       <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                         selectedCategories.includes(cat)
                           ? 'bg-orange-500 border-orange-500'
                           : 'border-gray-300 dark:border-gray-600'
                       }`}>
                         {selectedCategories.includes(cat) && <Check size={12} className="text-white" />}
                       </div>
                       <input
                         type="checkbox"
                         className="hidden"
                         checked={selectedCategories.includes(cat)}
                         onChange={() => toggleCategory(cat)}
                       />
                       <span className="text-sm text-gray-700 dark:text-gray-300 select-none">{cat}</span>
                     </label>
                   ))}
                 </div>
               </div>
             )}
           </div>

           {/* Location Button */}
           <div ref={locationRef} className="relative">
             <button
               onClick={() => setIsLocationOpen(!isLocationOpen)}
               className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
             >
               <MapPin size={16} /> {location}
             </button>

             {/* Location Dropdown */}
             {isLocationOpen && (
               <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in origin-top-right">
                 <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                   <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Select State</h3>
                 </div>
                 <div className="max-h-64 overflow-y-auto">
                   {locations.map(loc => (
                     <button
                       key={loc}
                       onClick={() => {
                         setLocation(loc);
                         setIsLocationOpen(false);
                       }}
                       className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center ${
                         location === loc ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10' : 'text-gray-700 dark:text-gray-300'
                       }`}
                     >
                       {loc}
                       {location === loc && <Check size={16} />}
                     </button>
                   ))}
                 </div>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by keyword, ministry, or benefit..."
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 transition-shadow shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {selectedCategories.map(cat => (
            <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold border border-orange-200 dark:border-orange-800/50">
              {cat}
              <button 
                onClick={() => toggleCategory(cat)} 
                className="hover:bg-orange-200 dark:hover:bg-orange-800 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={() => setSelectedCategories([])}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline px-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredSchemes.map(scheme => (
            <div key={scheme.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
               <div className="flex justify-between items-start mb-4">
                 <div className={`px-2 py-1 rounded uppercase tracking-wide text-xs font-bold ${
                   scheme.category === 'Education' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                   scheme.category === 'Healthcare' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                   scheme.category === 'Housing' ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                   'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                 }`}>
                   {scheme.category}
                 </div>
                 <span className={`font-bold text-sm ${
                    scheme.eligibilityMatch >= 90 ? 'text-green-600 dark:text-green-400' : 
                    scheme.eligibilityMatch >= 75 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'
                 }`}>{scheme.eligibilityMatch}% Match</span>
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
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
          <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">No schemes found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategories([]); }}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscoverSchemes;