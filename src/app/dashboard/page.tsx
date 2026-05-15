'use client';

import { useState } from 'react';
import OpportunityCard from '@/components/OpportunityCard';
import { Opportunity, OpportunityFilter } from '@/types/opportunity';
import { fetchOpportunities } from '@/actions/opportunity.actions';
import { Loader2, Search, ArrowRight, Briefcase, Trophy, ChevronLeft } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
export default function Dashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Search States
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'internship' | 'competition' | null>(null);
  const [domain, setDomain] = useState<string | null>(null);

  const domains = ['Tech', 'Finance', 'Marketing', 'Consulting', 'Management', 'Data'];

  const executeSearch = async (filters: OpportunityFilter) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await fetchOpportunities(filters);
      setOpportunities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query && !type && !domain) return;
    executeSearch({ query, type: type || 'all', domain: domain || 'all' });
  };

  const handleTypeSelect = (selectedType: 'internship' | 'competition') => {
    setType(selectedType);
    setDomain(null); // Reset domain to allow them to choose
  };

  const handleDomainSelect = (selectedDomain: string) => {
    setDomain(selectedDomain);
    executeSearch({ query, type: type || 'all', domain: selectedDomain });
  };

  const resetSearch = () => {
    setHasSearched(false);
    setOpportunities([]);
    setType(null);
    setDomain(null);
    setQuery('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-[#FFEB3B] transition-colors">
      {!hasSearched ? (
        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 w-full py-12">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-center text-[#111111] tracking-tight mb-8 uppercase"
          >
            Find Your Next <br />
            <span className="text-white bg-[#111111] px-4 py-2 inline-block mt-2 border-[4px] border-[#111111] transform -rotate-2">
              Big Opportunity
            </span>
          </motion.h1>

          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearchSubmit} 
            className="w-full relative mb-12"
          >
            <div className="relative flex items-center w-full group">
              <div className="absolute left-6 text-[#111111] transition-transform group-focus-within:scale-110">
                <Search size={28} strokeWidth={3} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for roles, companies, keywords..."
                className="w-full pl-20 pr-40 py-6 text-xl md:text-2xl bg-white border-[4px] border-[#111111] rounded-full text-[#111111] placeholder:text-gray-400 font-bold outline-none transition-all shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]"
              />
              <button 
                type="submit"
                className="absolute right-3 px-8 py-4 bg-[#FF0080] hover:bg-[#E60073] border-[3px] border-[#111111] text-white font-black text-lg rounded-full transition-transform active:scale-95 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] uppercase tracking-wider"
              >
                Search
              </button>
            </div>
          </motion.form>

          <AnimatePresence mode="wait">
            {!type ? (
              <motion.div 
                key="type-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8"
              >
                <button
                  onClick={() => handleTypeSelect('internship')}
                  className="group flex flex-col items-center justify-center p-10 bg-white hover:bg-[#1890FF] border-[4px] border-[#111111] rounded-[2rem] transition-all hover:-translate-y-2 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]"
                >
                  <div className="w-24 h-24 bg-[#1890FF] group-hover:bg-white rounded-full flex items-center justify-center mb-6 border-[3px] border-[#111111] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] transition-colors">
                    <Briefcase size={48} className="text-white group-hover:text-[#1890FF]" strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black text-[#111111] group-hover:text-white uppercase mb-2">Internships</h3>
                  <p className="text-[#111111] font-bold text-center group-hover:text-white">Gain real-world experience</p>
                </button>

                <button
                  onClick={() => handleTypeSelect('competition')}
                  className="group flex flex-col items-center justify-center p-10 bg-white hover:bg-[#8338EC] border-[4px] border-[#111111] rounded-[2rem] transition-all hover:-translate-y-2 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]"
                >
                  <div className="w-24 h-24 bg-[#8338EC] group-hover:bg-white rounded-full flex items-center justify-center mb-6 border-[3px] border-[#111111] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] transition-colors">
                    <Trophy size={48} className="text-white group-hover:text-[#8338EC]" strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black text-[#111111] group-hover:text-white uppercase mb-2">Competitions</h3>
                  <p className="text-[#111111] font-bold text-center group-hover:text-white">Test your skills & win</p>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="domain-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center"
              >
                <button 
                  onClick={() => setType(null)}
                  className="self-start flex items-center gap-2 text-[#111111] hover:text-[#FF0080] font-black text-lg mb-8 transition-colors uppercase tracking-widest border-[3px] border-[#111111] bg-white px-6 py-3 rounded-full shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]"
                >
                  <ChevronLeft size={24} strokeWidth={4} />
                  BACK
                </button>
                <h3 className="text-3xl font-black text-[#111111] mb-10 text-center uppercase border-b-4 border-[#111111] pb-4 inline-block">
                  Select a field for {type === 'internship' ? 'Internships' : 'Competitions'}
                </h3>
                <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
                  {domains.map((d) => (
                    <button
                      key={d}
                      onClick={() => handleDomainSelect(d)}
                      className="px-6 py-4 bg-white hover:bg-[#111111] hover:text-[#FFEB3B] border-[3px] border-[#111111] text-[#111111] font-black text-xl rounded-2xl transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] flex items-center gap-3 uppercase"
                    >
                      {d}
                      <ArrowRight size={20} strokeWidth={3} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    </button>
                  ))}
                  <button
                    onClick={() => handleDomainSelect('all')}
                    className="px-6 py-4 bg-[#FF0080] text-white hover:bg-[#111111] hover:text-[#FF0080] border-[3px] border-[#111111] font-black text-xl rounded-2xl transition-all shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] uppercase"
                  >
                    VIEW ALL
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
            <button 
              onClick={resetSearch}
              className="flex-shrink-0 p-4 bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:bg-[#111111] hover:text-[#FFEB3B] text-[#111111] rounded-full transition-colors"
            >
              <ChevronLeft size={28} strokeWidth={4} />
            </button>
            <form onSubmit={handleSearchSubmit} className="flex-1 w-full relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#111111]">
                <Search size={24} strokeWidth={3} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Modify your search..."
                className="w-full pl-16 pr-6 py-5 bg-white border-[4px] border-[#111111] rounded-full text-[#111111] text-xl font-bold outline-none shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] transition-all"
              />
            </form>
          </div>

          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <span className="text-[#111111] font-black text-lg bg-white px-4 py-2 border-[3px] border-[#111111] rounded-xl shadow-[2px_2px_0px_0px_rgba(17,17,17,1)]">SHOWING RESULTS FOR:</span>
            {type && (
              <span className="px-5 py-2.5 bg-[#FF0080] text-white font-black rounded-xl text-md border-[3px] border-[#111111] shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] uppercase tracking-wider">
                {type}
              </span>
            )}
            {domain && domain !== 'all' && (
              <span className="px-5 py-2.5 bg-[#8338EC] text-white font-black rounded-xl text-md border-[3px] border-[#111111] shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] uppercase tracking-wider">
                {domain}
              </span>
            )}
            {query && (
              <span className="px-5 py-2.5 bg-[#52C41A] text-[#111111] font-black rounded-xl text-md border-[3px] border-[#111111] shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] uppercase tracking-wider">
                "{query}"
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-6">
              <div className="w-64 h-64 border-[4px] border-[#111111] shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] rounded-[2rem] bg-white overflow-hidden flex items-center justify-center p-4">
                <DotLottieReact
                  src="/loading.lottie"
                  loop
                  autoplay
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[#111111] text-2xl font-black uppercase tracking-widest bg-white px-6 py-3 border-[3px] border-[#111111] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] animate-pulse">HUNTING OPPORTUNITIES...</p>
            </div>
          ) : opportunities.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[2rem] border-[4px] border-[#111111] shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]">
              <div className="text-7xl mb-6">🏜️</div>
              <h3 className="text-4xl font-black text-[#111111] mb-4 uppercase">No matches found</h3>
              <p className="text-[#111111] text-xl font-bold max-w-md mx-auto mb-8">We couldn't find anything matching your exact criteria. Try adjusting your search terms or expanding your filters.</p>
              <button 
                onClick={resetSearch}
                className="px-10 py-4 bg-[#FF0080] text-white text-xl font-black rounded-full border-[4px] border-[#111111] shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] transition-all uppercase"
              >
                START OVER
              </button>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {opportunities.map((opp) => (
                <motion.div
                  key={opp.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <OpportunityCard opportunity={opp} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
