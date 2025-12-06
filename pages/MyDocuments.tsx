
import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Upload, MoreVertical, Eye, Download, X, FileText, Loader2, AlertCircle, Trash2, Calendar, User } from 'lucide-react';
import { DOCUMENTS as INITIAL_DOCUMENTS } from '../constants';

const MyDocuments: React.FC = () => {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', type: 'Identity', file: null as File | null });
  
  // States for actions
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewDoc, setViewDoc] = useState<typeof INITIAL_DOCUMENTS[0] | null>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDoc({ ...newDoc, file: e.target.files[0], name: e.target.files[0].name.split('.')[0] });
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.file || !newDoc.name) return;

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newDocument = {
        id: Date.now().toString(),
        name: newDoc.name,
        type: newDoc.type,
        verified: false,
        issuer: 'Self Uploaded',
        date: new Date().toISOString().split('T')[0],
        icon: FileText
      };

      setDocuments([newDocument, ...documents]);
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setNewDoc({ name: '', type: 'Identity', file: null });
    }, 1500);
  };

  const handleRemove = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    setOpenMenuId(null);
  };

  const handleDownload = (docName: string) => {
    // Simulate download
    const element = document.createElement("a");
    const file = new Blob(["This is a mock document content for demonstration."], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${docName}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 relative pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Documents</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mt-1">
            <Shield size={14} className="text-green-500" />
            Secured by DigiLocker
          </p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold shadow hover:bg-orange-600 transition-colors"
        >
          <Upload size={18} /> Upload New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
            
            {/* Context Menu Button */}
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === doc.id ? null : doc.id);
                }}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                 <MoreVertical size={18} />
              </button>
              
              {/* Dropdown Menu */}
              {openMenuId === doc.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-20 animate-fade-in origin-top-right overflow-hidden">
                  <button 
                    onClick={() => {
                        setViewDoc(doc);
                        setOpenMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button 
                    onClick={() => {
                        handleDownload(doc.name);
                        setOpenMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Download size={16} /> Download
                  </button>
                  <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                  <button 
                    onClick={() => handleRemove(doc.id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              )}
            </div>

            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              doc.verified 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400'
            }`}>
               <doc.icon size={24} />
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate pr-6">{doc.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{doc.issuer}</p>

            <div className="flex items-center gap-2 mb-4">
              {doc.verified ? (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  <CheckCircle size={10} /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Pending Verification
                </span>
              )}
              <span className="text-[10px] text-gray-400">{doc.date}</span>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setViewDoc(doc)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <Eye size={14} /> View
              </button>
              <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
              <button 
                onClick={() => handleDownload(doc.name)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 dark:text-white">Upload Document</h3>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Type</label>
                <select 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500"
                  value={newDoc.type}
                  onChange={(e) => setNewDoc({...newDoc, type: e.target.value})}
                >
                  <option value="Identity">Identity Proof</option>
                  <option value="Address">Address Proof</option>
                  <option value="Income">Income Proof</option>
                  <option value="Education">Education Certificate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g. Ration Card"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({...newDoc, name: e.target.value})}
                  required
                />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select File</label>
                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-orange-500 dark:hover:border-orange-400 transition-colors cursor-pointer relative bg-gray-50 dark:bg-gray-700/50">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-orange-600 dark:text-orange-400 hover:text-orange-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, PDF up to 5MB</p>
                      {newDoc.file && (
                        <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-2 flex items-center justify-center gap-1">
                          <CheckCircle size={14} /> {newDoc.file.name}
                        </p>
                      )}
                    </div>
                  </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex gap-3 items-start">
                 <AlertCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                 <p className="text-xs text-blue-700 dark:text-blue-300">Documents uploaded here are securely stored in your DigiLocker vault and shared only with government authorities for verification.</p>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={!newDoc.file || !newDoc.name || isUploading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" /> Uploading...
                    </>
                  ) : 'Upload Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewDoc && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl animate-fade-in-up">
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <FileText className="text-orange-500" size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-900 dark:text-white">{viewDoc.name}</h3>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{viewDoc.type} • {viewDoc.date}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleDownload(viewDoc.name)}
                      className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Download size={20} />
                    </button>
                    <button 
                      onClick={() => setViewDoc(null)}
                      className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <X size={20} />
                    </button>
                 </div>
              </div>

              {/* Modal Content - Mock Preview */}
              <div className="flex-1 overflow-auto p-8 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                 <div className="bg-white p-8 shadow-lg max-w-lg w-full min-h-[400px] flex flex-col items-center justify-center text-center border border-gray-200">
                    <Shield size={64} className="text-gray-200 mb-4" />
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{viewDoc.name}</h4>
                    <p className="text-gray-500 text-sm mb-6">Issued by {viewDoc.issuer}</p>
                    <div className="w-full space-y-3">
                      <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto"></div>
                      <div className="h-4 bg-gray-100 rounded w-full"></div>
                      <div className="h-4 bg-gray-100 rounded w-5/6 mx-auto"></div>
                      <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto"></div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 w-full flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest">
                       <span>Confidential</span>
                       <span>Govt of India</span>
                    </div>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                 <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    {viewDoc.verified ? (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold">
                        <CheckCircle size={16} /> Verified Document
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold">
                        <AlertCircle size={16} /> Pending Verification
                      </span>
                    )}
                 </div>
                 <button 
                   onClick={() => setViewDoc(null)}
                   className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                 >
                   Close Viewer
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MyDocuments;
