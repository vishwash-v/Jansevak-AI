import React from 'react';
import { Download, IndianRupee, Calendar, CheckCircle } from 'lucide-react';
import { SCHEMES } from '../constants';

const ApprovedBenefits: React.FC = () => {
  const approvedSchemes = SCHEMES.filter(s => s.status === 'Approved' || s.status === 'Active');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Approved Benefits</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">View and manage the benefits you have received.</p>
      </div>

      <div className="grid gap-6">
        {approvedSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">{scheme.name}</h3>
                 <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                   <CheckCircle size={10} /> Active
                 </span>
               </div>
               <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{scheme.description}</p>
               
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Benefit Value</p>
                   <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                     <IndianRupee size={14} className="text-gray-400" />
                     {scheme.benefitAmount}
                   </p>
                 </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Frequency</p>
                   <p className="font-bold text-gray-900 dark:text-white">Monthly</p>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Received</p>
                   <p className="font-bold text-gray-900 dark:text-white">Feb 28, 2024</p>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Due</p>
                   <p className="font-bold text-gray-900 dark:text-white">Mar 30, 2024</p>
                 </div>
               </div>
            </div>

            <div className="flex flex-col justify-center gap-3 min-w-[180px]">
              <button className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Download size={16} /> Certificate
              </button>
               <button className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Calendar size={16} /> Payment History
              </button>
            </div>
          </div>
        ))}

         {approvedSchemes.length === 0 && (
           <div className="p-8 text-center">
             <p className="text-gray-500">No approved benefits yet.</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default ApprovedBenefits;