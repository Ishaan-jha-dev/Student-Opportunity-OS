'use client';

import { Opportunity } from '@/types/opportunity';
import { formatDistanceToNowStrict } from 'date-fns';
import { Calendar, Building, Briefcase, Trophy, ArrowUpRight, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const isInternship = opportunity.type === 'internship';
  const Icon = isInternship ? Briefcase : Trophy;
  
  const diffDays = Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const isUrgent = diffDays <= 7 && diffDays >= 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white border-[4px] border-[#111111] p-6 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] transition-all duration-200"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFEB3B] to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-150" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl border-[3px] border-[#111111] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] ${isInternship ? 'bg-[#1890FF] text-white' : 'bg-[#8338EC] text-white'}`}>
              <Icon size={24} strokeWidth={3} />
            </div>
            <div>
              <span className={`px-3 py-1 bg-white border-[3px] border-[#111111] text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] ${isInternship ? 'text-[#1890FF]' : 'text-[#8338EC]'}`}>
                {opportunity.type}
              </span>
            </div>
          </div>
          {isUrgent && (
            <div className="flex items-center gap-1.5 text-xs font-black text-[#111111] bg-[#FFEB3B] border-[3px] border-[#111111] px-3 py-1.5 rounded-xl shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] animate-pulse uppercase tracking-wider">
              <Flame size={16} strokeWidth={3} />
              URGENT
            </div>
          )}
        </div>

        <h3 className="text-2xl font-black text-[#111111] mb-4 line-clamp-2 leading-tight uppercase tracking-tight">
          {opportunity.title}
        </h3>
        
        <div className="flex items-center gap-2 text-[#111111] mb-6 text-base font-bold bg-[#FFEB3B] border-[3px] border-[#111111] px-3 py-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] w-fit max-w-full">
          <Building size={18} className="text-[#111111] flex-shrink-0" strokeWidth={3} />
          <span className="truncate">{opportunity.company}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {opportunity.domain.map((tag, idx) => (
            <span key={idx} className="px-3 py-1.5 text-xs font-black rounded-xl bg-white text-[#111111] border-[3px] border-[#111111] shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] uppercase">
              {tag}
            </span>
          ))}
          <span className={`px-3 py-1.5 text-xs font-black rounded-xl border-[3px] border-[#111111] shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] uppercase ${
            opportunity.difficulty === 'EASY' ? 'text-[#111111] bg-[#52C41A]' : 
            opportunity.difficulty === 'MEDIUM' ? 'text-[#111111] bg-[#FFEB3B]' : 
            'text-white bg-[#FF0080]'
          }`}>
            {opportunity.difficulty}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-5 border-t-[4px] border-[#111111] mt-2">
        <div className="flex items-center gap-1.5 text-sm font-black text-[#111111] bg-white px-3 py-1.5 border-[3px] border-[#111111] rounded-xl shadow-[2px_2px_0px_0px_rgba(17,17,17,1)]">
          <Calendar size={18} className="text-[#FF0080]" strokeWidth={3} />
          {formatDistanceToNowStrict(new Date(opportunity.deadline), { addSuffix: true })}
        </div>
        
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={opportunity.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-black text-white bg-[#FF0080] hover:bg-[#111111] px-5 py-3 border-[3px] border-[#111111] rounded-xl shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] transition-colors uppercase tracking-wider"
        >
          VIEW
          <motion.div
            initial={{ x: 0, y: 0 }}
            whileHover={{ x: 3, y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowUpRight size={20} strokeWidth={4} />
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
}
