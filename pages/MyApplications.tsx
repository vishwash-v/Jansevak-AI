import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight, FileText } from 'lucide-react';
import { APPLICATIONS } from '../constants';

const MyApplications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Track the status of your submitted applications.</p>
      </div>

      <div className="space-y-6">
        {APPLICATIONS.map((app) => (
          <div key={app.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{app.schemeName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Application ID: {app.id} • Applied on {app.dateApplied}</p>
              </div>
              <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-bold rounded-full text-center">
                {app.status}
              </div>
            </div>

            {/* Stepper */}
            <div className="relative">
              <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded hidden md:block">
                <div 
                  className="h-full bg-green-500 rounded transition-all duration-500" 
                  style={{ width: `${(app.stage / (app.totalStages - 1)) * 100}%` }}
                ></div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative">
                {app.timeline.map((step, idx) => {
                  const isCompleted = idx <= app.stage;
                  const isCurrent = idx === app.stage;
                  
                  return (
                    <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 ${
                         isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                       }`}>
                         {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                       </div>
                       <div className="md:text-center">
                         <p className={`text-sm font-bold ${
                           isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                         }`}>{step.status}</p>
                         <p className="text-xs text-gray-400">{step.date}</p>
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
             <div className="mt-8 flex justify-end">
              <button className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline">
                View Application Details <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
        
        {APPLICATIONS.length === 0 && (
           <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
             <FileText className="mx-auto text-gray-400 mb-2" size={48} />
             <h3 className="text-lg font-bold text-gray-600 dark:text-gray-400">No Active Applications</h3>
             <p className="text-sm text-gray-500 mb-4">You haven't applied for any schemes yet.</p>
             <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold">Discover Schemes</button>
           </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;