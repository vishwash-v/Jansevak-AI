
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Globe, ArrowLeft } from 'lucide-react';
import { generateResponse } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  
  const { language } = useLanguage();
  // Map our language code to full name for display/selection
  const getLangName = (code: string) => {
    switch(code) {
      case 'hi': return 'Hindi';
      case 'mr': return 'Marathi';
      case 'ta': return 'Tamil';
      case 'te': return 'Telugu';
      default: return 'English';
    }
  };
  
  const [currentLang, setCurrentLang] = useState(getLangName(language));
  const navigate = useNavigate();
  
  useEffect(() => {
    setCurrentLang(getLangName(language));
  }, [language]);
  
  // Simulated recognition for demo purposes since actual Web Speech API requires user interaction and permissions
  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');
    
    // Simulate listening duration
    setTimeout(() => {
      const mockQueries = [
        "What are the benefits of PM Kisan Yojana?",
        "How can I apply for a ration card in Maharashtra?",
        "Show me education scholarships for girls.",
        "Am I eligible for Ayushman Bharat?"
      ];
      const randomQuery = mockQueries[Math.floor(Math.random() * mockQueries.length)];
      setTranscript(randomQuery);
      setIsListening(false);
      handleProcessQuery(randomQuery);
    }, 3000);
  };

  const handleProcessQuery = async (query: string) => {
    setIsProcessing(true);
    const aiResponse = await generateResponse(query);
    setIsProcessing(false);
    setResponse(aiResponse);
    speakResponse(aiResponse);
  };

  const speakResponse = (text: string) => {
    setIsSpeaking(true);
    // In a real app, use window.speechSynthesis
    // const utterance = new SpeechSynthesisUtterance(text);
    // window.speechSynthesis.speak(utterance);
    
    // Simulate speaking time based on text length
    setTimeout(() => {
      setIsSpeaking(false);
    }, Math.min(text.length * 50, 5000));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
          <Globe size={14} />
          <select 
            value={currentLang} 
            onChange={(e) => setCurrentLang(e.target.value)}
            className="bg-transparent border-none focus:ring-0 p-0 text-xs font-bold cursor-pointer dark:bg-gray-800 dark:text-white"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Tamil</option>
            <option>Telugu</option>
          </select>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
        {/* Visualizer Circles */}
        <div className="relative mb-12">
           {isListening && (
             <>
               <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 animate-ping"></div>
               <div className="absolute inset-0 bg-orange-500 rounded-full opacity-10 animate-pulse" style={{ animationDuration: '2s' }}></div>
               <div className="absolute -inset-4 bg-orange-400 rounded-full opacity-10 animate-ping" style={{ animationDelay: '0.2s' }}></div>
             </>
           )}
           {isSpeaking && (
             <>
               <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
               <div className="absolute -inset-8 bg-green-500 rounded-full opacity-10 animate-pulse" style={{ animationDuration: '1.5s' }}></div>
             </>
           )}
           
           <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
             isListening ? 'bg-orange-500 scale-110' : 
             isSpeaking ? 'bg-green-500 scale-105' :
             isProcessing ? 'bg-blue-500 animate-pulse' :
             'bg-gradient-to-br from-orange-500 to-pink-600'
           }`}>
             {isListening ? <Mic size={48} className="text-white animate-bounce" /> : 
              isSpeaking ? <Volume2 size={48} className="text-white" /> :
              <Mic size={48} className="text-white" />}
           </div>
        </div>

        {/* Status Text */}
        <div className="h-32 flex flex-col items-center justify-start space-y-4 max-w-lg w-full">
           {isListening && <p className="text-xl font-medium text-gray-500 dark:text-gray-400 animate-pulse">Listening...</p>}
           
           {isProcessing && <p className="text-xl font-medium text-blue-500 animate-pulse">Processing your query...</p>}
           
           {!isListening && !isProcessing && transcript && (
             <p className="text-lg text-gray-800 dark:text-white font-medium">"{transcript}"</p>
           )}
           
           {!isListening && !isProcessing && response && (
             <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 w-full animate-fade-in-up">
               <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{response}</p>
             </div>
           )}
           
           {!isListening && !isProcessing && !transcript && !response && (
             <p className="text-gray-500 dark:text-gray-400">Tap the microphone to start speaking</p>
           )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 pb-12 flex justify-center">
         <button 
           onClick={isListening ? () => setIsListening(false) : startListening}
           className={`p-6 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 ${
             isListening 
               ? 'bg-red-500 hover:bg-red-600 text-white' 
               : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-orange-500 border-2 border-orange-100 dark:border-gray-700'
           }`}
         >
           {isListening ? <MicOff size={32} /> : <Mic size={32} />}
         </button>
      </div>
    </div>
  );
};

export default VoiceAssistant;
