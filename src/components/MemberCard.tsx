import React from 'react';
import { User, Hash, Users, FileText, Download } from 'lucide-react';

interface Member {
  name: string;
  regNo: string;
  team: string;
}

interface MemberCardProps {
  member: Member;
  onGenerateLetter: () => void;
  onPreviewLetter: () => void;
  disabledPreview?: boolean;
  disabledGenerate?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onGenerateLetter, onPreviewLetter, disabledPreview = false, disabledGenerate = false }) => {
  const getTeamColor = (team: string) => {
    const colors = {
      'Event Management': 'bg-purple-100 text-purple-800',
      'PR & Outreach': 'bg-blue-100 text-blue-800',
      'Finance': 'bg-green-100 text-green-800',
      'Content': 'bg-yellow-100 text-yellow-800',
      'Social Media & Photography': 'bg-pink-100 text-pink-800',
      'Research': 'bg-indigo-100 text-indigo-800',
      'Design': 'bg-red-100 text-red-800',
      'Technical': 'bg-gray-100 text-gray-800',
    };
    return colors[team as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <div className="flex items-center gap-1 text-gray-600">
              <Hash className="w-4 h-4" />
              <span className="text-sm">{member.regNo}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">Team</span>
        </div>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getTeamColor(member.team)}`}>
          {member.team}
        </span>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onPreviewLetter}
          disabled={disabledPreview}
          className={`flex-1 ${disabledPreview ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} px-4 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2`}
        >
          <FileText className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={onGenerateLetter}
          disabled={disabledGenerate}
          className={`flex-1 ${disabledGenerate ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'} px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg`}
        >
          <Download className="w-4 h-4" />
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default MemberCard;