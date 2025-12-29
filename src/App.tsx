import React, { useState, useEffect } from 'react';
import { Sparkles, Users, Award } from 'lucide-react';
import MemberSearch from './components/MemberSearch';
import MemberCard from './components/MemberCard';
import LetterPreview from './components/LetterPreview';
import LoginForm from './components/LoginForm';
import { useAuth } from './contexts/AuthContext';
import { getAllRemoteMembers, FireMember } from './firebase';
import { downloadPDF } from './utils/pdfGenerator';
import { createPortal } from 'react-dom';


const AuthArea: React.FC<{ onOpenMyLetter?: () => void; onDownloadMyLetter?: () => void }> = ({ onOpenMyLetter, onDownloadMyLetter }) => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative">
      {loading && (
        <div className="text-sm text-gray-500">Checking session...</div>
      )}

      {!loading && !isAuthenticated && (
        <button
          onClick={() => setShowLogin(true)}
          className="text-sm px-3 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        >
          Login
        </button>
      )}

      {!loading && isAuthenticated && user && (
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-700">Signed in as <strong>{user.name}</strong></div>
          <button
            onClick={() => onOpenMyLetter?.()}
            className="text-sm px-3 py-2 rounded-md border border-gray-200"
          >
            My Letter
          </button>
          <button
            onClick={() => onDownloadMyLetter?.()}
            className="text-sm px-3 py-2 rounded-md bg-gradient-to-r from-green-500 to-green-600 text-white"
          >
            Download
          </button>
          <button
            onClick={() => logout()}
            className="text-sm px-3 py-2 rounded-md border border-gray-200"
          >
            Logout
          </button>
        </div>
      )}

      {showLogin &&
  createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Sign in</h3>
          <button
            onClick={() => setShowLogin(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <LoginForm onClose={() => setShowLogin(false)} />
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}

    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [members, setMembers] = useState<FireMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FireMember | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(true);

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingMembers(true);
      const remote = await getAllRemoteMembers();
      if (!mounted) return;
      setMembers(remote as FireMember[]);
      setLoadingMembers(false);
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const lowercase = searchTerm.toLowerCase();

      if (isAuthenticated && user) {
        // Authenticated users may only access their own record
        const userName = (user.name || '').toLowerCase();
        if (userName.includes(lowercase)) {
          setSuggestions([user.name]);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(true);
        }
        return;
      }

      const results = members
        .filter(m => (m.name || '').toLowerCase().includes(lowercase))
        .map(m => m.name || '');
      setSuggestions(results.slice(0, 10));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedMember(null);
    }
  }, [searchTerm, members, isAuthenticated, user]);

  const handleMemberSelect = (memberName: string) => {
    const member = members.find(m => m.name.toLowerCase() === memberName.toLowerCase());
    if (member) {
      setSelectedMember(member as FireMember);
      setSearchTerm(member.name);
      setShowSuggestions(false);
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSelectedMember(null);
    }
  };

  const openMyLetter = () => {
    if (!user) return;
    setSelectedMember(user as FireMember);
    setSearchTerm(user.name || '');
    setShowPreview(true);
  };

  const downloadMyLetter = () => {
    if (!user) return;
    downloadPDF(user as any);
  };

  const handleGeneratePDF = () => {
    if (!selectedMember) return;
    if (!isAuthenticated || !user || user.regNo !== selectedMember.regNo) {
      window.alert('Please sign in with your Email and registration number to access your letter.');
      return;
    }
    downloadPDF(selectedMember);
  };

  const handlePreviewLetter = () => {
    if (!selectedMember) return;
    if (!isAuthenticated || !user || user.regNo !== selectedMember.regNo) {
      window.alert('Please sign in with your Email and registration number to preview your letter.');
      return;
    }
    setShowPreview(true);
  };

  const totalMembers = members.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-lg flex items-center justify-center">
                  <img src="/Logos/GSOC Innovators Club Website.png" alt="GSoC Innovators Club" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    GSoC Innovators Club Appointment Letter
                  </h1>
                  <p className="text-gray-600">Generate your respective appointment letter</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{totalMembers} Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>2025-26 Tenure</span>
                </div>
              </div>

              {/* Auth controls */}
              <div className="flex items-center gap-4">
                {/* Show login status or sign-in button */}
                <AuthArea onOpenMyLetter={openMyLetter} onDownloadMyLetter={downloadMyLetter} />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to GSoC Innovators Club
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Search and Member Card */}
            <div className="lg:col-span-2 space-y-8">
              {/* Search section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  Find a Member
                </h3>
                <MemberSearch
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                  suggestions={suggestions}
                  onMemberSelect={handleMemberSelect}
                  showSuggestions={showSuggestions}
                  loading={loadingMembers}
                />
                
                {searchTerm && !selectedMember && suggestions.length === 0 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-center">
                      No member found with that name. Please try a different search term.
                    </p>
                  </div>
                )}
              </div>

              {/* Member card */}
              {selectedMember && (
                <div className="transform transition-all duration-500 animate-fade-in">
                  <MemberCard
                    member={selectedMember}
                    onGenerateLetter={handleGeneratePDF}
                    onPreviewLetter={handlePreviewLetter}
                    disabledPreview={!isAuthenticated || !user || user.regNo !== selectedMember.regNo}
                    disabledGenerate={!isAuthenticated || !user || user.regNo !== selectedMember.regNo}
                  />

                  {(!isAuthenticated || !user || user.regNo !== selectedMember.regNo) && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-sm">
                      Please <strong>log in</strong> with your registered Email and your registration number to preview or download your appointment letter.
                    </div>
                  )}
                </div>
              )}

              {/* Instructions */}
              {!selectedMember && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">How to use:</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                      <p>Search for a member by typing their name in the search box above</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                      <p>Select the member from the dropdown suggestions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                      <p>Preview the letter or directly generate a PDF</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Stats (removed) */}
            <div className="space-y-6" />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">GSoC Innovators Club</span>
              </div>
              <p className="text-gray-600">
                Empowering innovation and open-source contributions since 2024
              </p>
              <p className="text-sm text-gray-500 mt-2">
                VIT Bhopal • 2025-26 Academic Year
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Letter preview modal */}
      {showPreview && selectedMember && (
        <LetterPreview
          member={selectedMember}
          onClose={() => setShowPreview(false)}
          onDownload={handleGeneratePDF}
        />
      )}
    </div>
  );
}

export default App;