import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, FileQuestion, BookOpen } from 'lucide-react';

const FAQS = [
  {
    question: "How do I apply for a scheme?",
    answer: "You can apply for a scheme by navigating to the 'Discover Schemes' page, selecting a scheme you are eligible for, and clicking 'Apply Now'. Follow the on-screen instructions to submit your documents."
  },
  {
    question: "Is my data safe with Jansevak AI?",
    answer: "Yes, absolutely. We use DigiLocker for document verification and do not store your personal documents on our servers. All data transmission is encrypted."
  },
  {
    question: "What if I don't have all the required documents?",
    answer: "You can save your application as a draft and return later once you have the documents. The 'My Documents' section helps you organize what you have and what you need."
  },
  {
    question: "How can I change my language preference?",
    answer: "Go to 'Language Settings' in the sidebar menu and select your preferred language from the list of supported Indian languages."
  },
  {
    question: "Can I track my application status?",
    answer: "Yes, the 'My Applications' page provides a real-time timeline of your application's progress, from submission to final approval."
  }
];

const HelpCenter: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How can we help you?</h2>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-900 transition-colors text-center group cursor-pointer">
           <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
             <Phone size={24} />
           </div>
           <h3 className="font-bold text-gray-900 dark:text-white mb-1">Call Support</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Mon-Fri, 9am to 6pm</p>
           <p className="font-bold text-blue-600 dark:text-blue-400">1800-123-4567</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-900 transition-colors text-center group cursor-pointer">
           <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
             <MessageCircle size={24} />
           </div>
           <h3 className="font-bold text-gray-900 dark:text-white mb-1">Live Chat</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Instant answers</p>
           <p className="font-bold text-green-600 dark:text-green-400">Start Chat</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-900 transition-colors text-center group cursor-pointer">
           <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
             <Mail size={24} />
           </div>
           <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email Us</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">24/7 Response</p>
           <p className="font-bold text-orange-600 dark:text-orange-400">help@jansevak.ai</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <FileQuestion className="text-orange-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {filteredFaqs.map((faq, idx) => (
            <div key={idx} className="p-6">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex justify-between items-center w-full text-left focus:outline-none group"
              >
                <span className={`font-medium ${openIndex === idx ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'} group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors`}>
                  {faq.question}
                </span>
                {openIndex === idx ? (
                  <ChevronUp className="text-orange-500" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400" size={20} />
                )}
              </button>
              {openIndex === idx && (
                <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
             <div className="p-8 text-center text-gray-500">
               No results found for "{searchQuery}"
             </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg mb-1">User Guide PDF</h4>
              <p className="text-indigo-200 text-sm mb-4">Complete manual for using the platform</p>
              <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold">Download</button>
            </div>
            <BookOpen size={48} className="text-white opacity-20" />
         </div>
         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg mb-1">Video Tutorials</h4>
              <p className="text-gray-400 text-sm mb-4">Watch step-by-step guides</p>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold">Watch Now</button>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center opacity-30">
               <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HelpCenter;