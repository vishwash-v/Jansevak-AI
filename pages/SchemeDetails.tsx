
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SCHEMES } from '../constants';
import { ArrowLeft, Share2, Printer, CheckCircle, FileText, HelpCircle, Award } from 'lucide-react';

const SchemeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scheme = SCHEMES.find(s => s.id === id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!scheme) {
    return <div className="text-center py-20 text-gray-500">Scheme not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back & Actions */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Printer size={20} />
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 ${
            scheme.category === 'Education' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
            scheme.category === 'Healthcare' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
            'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
          }`}>
            {scheme.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{scheme.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{scheme.ministry}</p>
            <div className="flex items-center gap-3 mt-4">
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                {scheme.category}
              </span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                {scheme.benefitAmount}
              </span>
            </div>
          </div>
          <div className="text-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl hidden sm:block">
            <div className={`text-3xl font-bold ${scheme.eligibilityMatch > 80 ? 'text-green-600 dark:text-green-400' : 'text-orange-500'}`}>
              {scheme.eligibilityMatch}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Eligibility Match</div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex px-6 gap-8 overflow-x-auto">
             {['Overview', 'Eligibility', 'Documents', 'Application Process'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab.toLowerCase())}
                 className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                   activeTab === tab.toLowerCase()
                     ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                     : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
               <div>
                 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Description</h3>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                   {scheme.description} This comprehensive scheme aims to provide support to eligible citizens ensuring financial stability and growth. The program covers various aspects including direct benefit transfer, subsidies, and infrastructural support.
                 </p>
               </div>
               
               <div className="grid md:grid-cols-2 gap-4">
                 <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                   <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                     <Award size={18} /> Benefits
                   </h4>
                   <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                     <li>• Financial assistance up to {scheme.benefitAmount}</li>
                     <li>• Priority processing for women applicants</li>
                     <li>• Direct bank transfer support</li>
                   </ul>
                 </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                   <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-2">
                     <HelpCircle size={18} /> Key Features
                   </h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                     <li>• 100% digital application process</li>
                     <li>• Tracking via mobile app</li>
                     <li>• Grievance redressal within 7 days</li>
                   </ul>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Who can apply?</h3>
              {[
                "Must be a resident of India",
                "Annual family income should be less than ₹2.5 Lakhs",
                "Age should be between 18 to 45 years",
                "Should not be a beneficiary of similar central schemes"
              ].map((criteria, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                   <CheckCircle size={18} className="text-green-500 shrink-0" />
                   <span className="text-gray-700 dark:text-gray-300">{criteria}</span>
                </div>
              ))}
            </div>
          )}

           {activeTab === 'documents' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Required Documents</h3>
              {[
                "Aadhaar Card",
                "Income Certificate",
                "Domicile Certificate",
                "Bank Account Details",
                "Recent Passport Size Photograph"
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                   <FileText size={18} className="text-orange-500 shrink-0" />
                   <span className="text-gray-700 dark:text-gray-300">{doc}</span>
                </div>
              ))}
            </div>
          )}
          
           {activeTab === 'application process' && (
            <div className="space-y-6">
              <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8 pl-6 py-2">
                 {[
                   { step: 1, title: 'Check Eligibility', desc: 'Verify your eligibility using the AI checker.' },
                   { step: 2, title: 'Gather Documents', desc: 'Keep your Aadhaar and Income proofs ready.' },
                   { step: 3, title: 'Submit Application', desc: 'Fill the form and upload documents via this portal.' },
                   { step: 4, title: 'Verification', desc: 'Officials will verify your details within 15 days.' }
                 ].map((s) => (
                   <div key={s.step} className="relative">
                      <span className="absolute -left-[31px] top-0 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {s.step}
                      </span>
                      <h4 className="font-bold text-gray-900 dark:text-white">{s.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
           <button 
             onClick={() => navigate('/applications')}
             className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
           >
             Apply for {scheme.name}
           </button>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
