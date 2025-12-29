import React from 'react';
import { Search, Users } from 'lucide-react';

interface MemberSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  suggestions: string[];
  onMemberSelect: (member: string) => void;
  showSuggestions: boolean;
  loading?: boolean;
}

const MemberSearch: React.FC<MemberSearchProps> = ({
  searchTerm,
  onSearchChange,
  suggestions,
  onMemberSelect,
  showSuggestions,
  loading = false
}) => {
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for a member by name..."
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg"
        />
      </div>

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.length === 0 && !loading && (
            <div className="px-4 py-3 text-gray-500">No members found.</div>
          )}

          {loading && (
            <div className="px-4 py-3 text-gray-500">Loading members...</div>
          )}

          {suggestions.map((member, index) => (
            <div
              key={index}
              onClick={() => onMemberSelect(member)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-3"
            >
              <Users className="w-4 h-4 text-gray-400" />
              <span className="capitalize text-gray-700 hover:text-blue-600">
                {member.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberSearch;