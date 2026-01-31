export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8ff] to-[#ede9fe] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <svg className="w-16 h-16 mx-auto mb-8" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12L8 6H16L21 12V20L16 26H8L3 20V12Z" stroke="#7c3aed" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
          <path d="M17 6L22 0H30L35 6V14L30 20H22L17 14V6Z" stroke="#9333ea" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
          <path d="M31 12L36 6H44L49 12V20L44 26H36L31 20V12Z" stroke="#a78bfa" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
          <path d="M17 6V14" stroke="#7c3aed" strokeWidth="3" fill="none"/>
          <path d="M35 6V14" stroke="#a78bfa" strokeWidth="3" fill="none"/>
        </svg>

        <h1 className="text-4xl font-black text-[#1a1a2e] mb-4">
          Coming Soon
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          We're working on something exciting. MatchPoints will be back shortly.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-full">
          <span className="w-2 h-2 bg-[#7c3aed] rounded-full animate-pulse" />
          <span className="text-sm text-[#7c3aed] font-medium">Under Maintenance</span>
        </div>
      </div>
    </div>
  );
}
