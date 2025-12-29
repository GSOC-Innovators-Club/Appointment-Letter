import React from 'react';
import { X, Download } from 'lucide-react';

interface Member {
  name: string;
  regNo: string;
  team: string;
}

interface LetterPreviewProps {
  member: Member;
  onClose: () => void;
  onDownload: () => void;
}

const LetterPreview: React.FC<LetterPreviewProps> = ({ member, onClose, onDownload }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Letter Preview</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
            <button
              onClick={onDownload}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 w-full sm:w-auto flex justify-center"
              aria-label="Close preview"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ aspectRatio: '8.5/11', fontFamily: "'Times New Roman', Times, serif", maxWidth: '800px', width: '100%' }}>
            <div className="p-6 sm:p-8 relative">
              {/* Background decorations */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-blue-600 opacity-10 transform rotate-1"></div>
              <div className="absolute top-16 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-5"></div>
              <div className="absolute bottom-40 left-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-5"></div>
              
              {/* Header */}
              <div className="flex justify-between items-center mb-2 relative z-10">
                <div className="h-20 w-36 flex items-center justify-center">
                  <img 
                    src="/Logos/VITB_logo.png" 
                    alt="VIT Bhopal Logo" 
                    className="h-16 w-auto object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/VITB%20logo.png'; }}
                  />
                </div>
                <div className="h-20 w-36 flex items-center justify-center">
                  <img 
                    src="/Logos/GSOC%20Innovators%20Club%20Website.png" 
                    alt="GSoC Innovators Club Logo" 
                    className="h-16 w-auto object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/GSOC%20Innovators%20Club%20Website.png'; }}
                  />
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-xl sm:text-3xl font-bold text-center text-gray-800 mb-2 uppercase tracking-widest relative z-10">
                Letter of Appointment
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mt-2"></div>
              </h1>
              
              {/* Date and greeting */}
              <div className="mb-6 relative z-10">
                <p className="text-sm mb-1">{currentDate}</p>
                <p className="font-bold text-gray-800 mb-0">DEAR {member.name.toUpperCase()},</p>
                <p className="font-bold text-gray-800">Registration No: {member.regNo}</p>
              </div>
              
              {/* Content */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-700 relative z-10">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-blue-600 font-semibold text-center">Welcome to the GSoC Innovators Family!</p>
                </div>
                
                <p>
                  We are absolutely thrilled to have you join our prestigious GSoC Innovators Club community. You have been selected as a <strong>Core Member</strong> of the <strong>{member.team}</strong> team for the 2025-26 academic tenure. After reviewing your application and considering your skills, enthusiasm, and passion for innovation, we are confident that your contributions will play a key role in driving our club's vision forward.
                </p>
                
                <p>
                  Your unique perspective and expertise will be invaluable to our team, and we're excited for your involvement in brainstorming innovative project ideas, working on cutting-edge open-source solutions, and contributing to the growth of the GSoC innovators family. As a core member, your role will require dedication, collaboration, and a strong commitment to the values and mission of our club.
                </p>
                
                <p>
                  This appointment comes with exciting opportunities to work on real-world projects, participate in Google Summer of Code preparations, attend exclusive workshops and seminars, and build lasting connections with industry professionals and fellow innovators. We are certain you will be an invaluable asset to our team and can't wait to see the impact your innovative ideas will have on our initiatives.
                </p>
                
                <p className="font-bold">
                  Congratulations on being selected, and welcome to the team! We look forward to an exciting and enriching journey of growth, learning, and innovation ahead with you.
                </p>
              </div>
              
              {/* Signatures */}
              <div className="flex justify-between mt-16 relative z-10">
                <div className="text-center">
                  <img
                    src="/Signs/Javed_Sir_Sign.jpg"
                    alt="Faculty Signature"
                    className="h-8 sm:h-12 mx-auto mb-2 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="w-48 h-px bg-gray-400 mb-2 mx-auto"></div>
                  <div className="font-bold text-sm text-gray-800">Faculty Coordinator</div>
                  <div className="text-xs text-gray-600 italic">GSoC Innovators Club</div>
                </div>
                <div className="text-center">
                  <img
                    src="/Signs/Aarushi_Sign.jpg"
                    alt="President Signature"
                    className="h-8 sm:h-12 mx-auto mb-2 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="w-48 h-px bg-gray-400 mb-2 mx-auto"></div>
                  <div className="font-bold text-sm text-gray-800">President</div>
                  <div className="text-xs text-gray-600 italic">GSoC Innovators Club</div>
                </div>
                <div className="text-center">
                  <img
                    src="/Signs/Ashish_Sign.jpg"
                    alt="Vice President Signature"
                    className="h-8 sm:h-12 mx-auto mb-2 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="w-48 h-px bg-gray-400 mb-2 mx-auto"></div>
                  <div className="font-bold text-sm text-gray-800">Vice President</div>
                  <div className="text-xs text-gray-600 italic">GSoC Innovators Club</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;