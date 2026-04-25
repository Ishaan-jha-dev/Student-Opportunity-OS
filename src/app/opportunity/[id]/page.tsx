import { fetchOpportunityDetails } from '@/actions/opportunity.actions';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar, Building, Briefcase, Trophy, ArrowUpRight, CheckCircle2, ChevronLeft, MapPin, DollarSign, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function OpportunityDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const opportunity = await fetchOpportunityDetails(id);

  if (!opportunity) {
    notFound();
  }

  const isInternship = opportunity.type === 'internship';
  const Icon = isInternship ? Briefcase : Trophy;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-black text-gray-400 hover:text-[#FF0080] transition-colors mb-8">
        <ChevronLeft size={20} strokeWidth={3} />
        BACK TO SEARCH
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-[2rem] border-4 border-gray-100 dark:border-gray-800 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#1890FF]/20 to-[#FF0080]/20 dark:from-[#1890FF]/10 dark:to-[#FF0080]/10 rounded-bl-full -z-10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <div className="flex items-start gap-6">
            <div className={`p-5 rounded-3xl shadow-sm ${isInternship ? 'bg-[#1890FF] text-white' : 'bg-[#EB2F96] text-white'}`}>
              <Icon size={40} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">{opportunity.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 font-bold text-lg">
                <div className="flex items-center gap-2">
                  <Building size={22} className="text-[#7928CA]" strokeWidth={2.5} />
                  {opportunity.company}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={22} className="text-[#FF0080]" strokeWidth={2.5} />
                  Remote / On-site
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={22} className="text-[#52C41A]" strokeWidth={2.5} />
                  Paid
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 min-w-[220px]">
            <a 
              href={opportunity.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF0080] to-[#7928CA] hover:from-[#E60073] hover:to-[#6B24B2] text-white font-black text-lg rounded-2xl transition-transform active:scale-95 shadow-lg"
            >
              APPLY NOW
              <ArrowUpRight size={24} strokeWidth={3} />
            </a>
            <div className="text-center text-sm font-black text-gray-500 uppercase tracking-widest">
              Deadline: <span className="text-[#FF0080]">{format(new Date(opportunity.deadline), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3 mb-10 pb-10 border-b-4 border-gray-50 dark:border-gray-800">
          <span className="px-4 py-2 text-sm font-black rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 uppercase tracking-widest shadow-sm">
            {opportunity.type}
          </span>
          {opportunity.domain.map((tag, idx) => (
            <span key={idx} className="px-4 py-2 text-sm font-black rounded-xl bg-[#F0F5FF] text-[#2F54EB] border-2 border-[#ADC6FF] shadow-sm uppercase tracking-widest">
              {tag}
            </span>
          ))}
          <span className={`px-4 py-2 text-sm font-black rounded-xl border-2 uppercase tracking-widest shadow-sm ${
            opportunity.difficulty === 'EASY' ? 'border-[#52C41A] text-[#237804] bg-[#F6FFED]' : 
            opportunity.difficulty === 'MEDIUM' ? 'border-[#FAAD14] text-[#AD6800] bg-[#FFFBE6]' : 
            'border-[#FF4D4F] text-[#A8071A] bg-[#FFF1F0]'
          }`}>
            Difficulty: {opportunity.difficulty}
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-5 uppercase tracking-wide">About the Opportunity</h2>
              <div className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                <p>{opportunity.description}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-5 flex items-center gap-3 uppercase tracking-wide">
                <CheckCircle2 className="text-[#52C41A]" size={32} strokeWidth={3} />
                Eligibility Criteria
              </h2>
              <div className="bg-[#F6FFED] dark:bg-[#52C41A]/10 border-2 border-[#B7EB8F] dark:border-[#52C41A]/30 rounded-2xl p-8">
                <p className="text-[#237804] dark:text-[#B7EB8F] font-bold text-lg leading-relaxed">
                  {opportunity.eligibility}
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-[#FFF0F6] dark:bg-[#EB2F96]/10 rounded-3xl p-8 border-2 border-[#FFADD2] dark:border-[#EB2F96]/30 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#EB2F96]/20 to-transparent rounded-bl-full" />
              <h3 className="text-xl font-black text-[#9E1068] dark:text-[#FFADD2] mb-6 flex items-center gap-2 uppercase tracking-wide">
                <Lightbulb size={24} strokeWidth={3} />
                Winning Insights
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="text-sm font-black text-[#C41D7F] dark:text-[#FF85C0] mb-3 uppercase tracking-widest">Key Skills</h4>
                  <ul className="text-base font-bold text-[#9E1068] dark:text-[#FFADD2] list-none space-y-2">
                    <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF0080]" /> Analytical Thinking</li>
                    <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF0080]" /> Problem Solving</li>
                    <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF0080]" /> Communication</li>
                  </ul>
                </div>
                <div className="pt-6 border-t-2 border-[#FFADD2] dark:border-[#EB2F96]/30">
                  <h4 className="text-sm font-black text-[#C41D7F] dark:text-[#FF85C0] mb-3 uppercase tracking-widest">Pro Tip</h4>
                  <p className="text-base font-bold text-[#9E1068] dark:text-[#FFADD2] leading-relaxed">
                    Make sure to tailor your resume specifically to the <span className="underline decoration-2 underline-offset-4">{opportunity.domain[0]}</span> aspects mentioned in the description.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
