import { Opportunity, OpportunityFilter } from '@/types/opportunity';
import { mockOpportunities } from '@/data/mockOpportunities';
import { query as fetchLinkedIn } from 'linkedin-jobs-api';

// --- LinkedIn Scraper ---
async function fetchLinkedInInternships(filterQuery: string, domain: string, limit: string = '10'): Promise<Opportunity[]> {
    const keyword = filterQuery || (domain && domain !== 'all' ? `${domain} internship` : 'internship');
    try {
        const jobs = await fetchLinkedIn({
            keyword: keyword,
            location: 'India',
            dateSincePosted: 'past Month',
            jobType: 'internship',
            limit: limit,
        });

        return jobs.map((job: any, index: number) => ({
            id: `li-${index}-${Date.now()}`,
            title: job.position,
            company: job.company,
            type: 'internship',
            domain: [job.location || 'Remote'],
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
            difficulty: 'MEDIUM' as any,
            description: `Apply for the ${job.position} position at ${job.company}. Location: ${job.location}. Posted: ${job.date}`,
            eligibility: 'See LinkedIn posting for full eligibility criteria.',
            apply_link: job.jobUrl,
            stipend: job.salary && job.salary !== 'Not specified' ? job.salary : 'Unpaid',
            created_at: new Date(),
        }));
    } catch (e) {
        console.error("LinkedIn Scraping error", e);
        return [];
    }
}

// --- Unstop Scraper ---
async function fetchUnstopCompetitions(filterQuery: string, domain: string): Promise<Opportunity[]> {
    const unstopUrl = new URL('https://unstop.com/api/public/opportunity/search-result');
    unstopUrl.searchParams.append('opportunity', 'competitions');
    unstopUrl.searchParams.append('oppstatus', 'open');
    unstopUrl.searchParams.append('page', '1');
    unstopUrl.searchParams.append('per_page', '15');
    
    if (domain && domain !== 'all') unstopUrl.searchParams.append('category', domain);
    if (filterQuery) unstopUrl.searchParams.append('q', filterQuery);

    try {
        const response = await fetch(unstopUrl.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://unstop.com/'
            }
        });
        const data = await response.json();
        const items = data?.data?.data || [];
        
        return items.map((item: any) => ({
            id: `unstop-${item.id}`,
            title: item.title,
            company: item.organisation?.name || 'Unstop Organizer',
            type: 'competition',
            domain: [item.category?.name || 'General'],
            deadline: new Date(item.regn_end_date || Date.now() + 15 * 24 * 60 * 60 * 1000),
            difficulty: (item.opportunity_type === 'hackathon' ? 'HARD' : 'MEDIUM') as any,
            description: item.prizes_description || `Join this ${item.opportunity_type} organized by ${item.organisation?.name}.`,
            eligibility: `Mode: ${item.mode}. See unstop page for full criteria.`,
            apply_link: `https://unstop.com/${item.public_url}`,
            stipend: 'Varies',
            created_at: new Date(),
        }));
    } catch (e) {
        console.error("Unstop Scraping error", e);
        return [];
    }
}

export async function getOpportunities(filter?: OpportunityFilter): Promise<Opportunity[]> {
  try {
    let results: Opportunity[] = [];
    const isInternship = filter?.type === 'internship' || filter?.type === 'all' || !filter?.type;
    const isCompetition = filter?.type === 'competition' || filter?.type === 'all' || !filter?.type;

    const queryStr = filter?.query || '';
    const domainStr = filter?.domain || '';

    // Parallel fetching for performance
    const fetchPromises = [];

    if (isInternship) {
        fetchPromises.push(fetchLinkedInInternships(queryStr, domainStr, '12'));
    }
    if (isCompetition) {
        fetchPromises.push(fetchUnstopCompetitions(queryStr, domainStr));
    }

    const scrapedResults = await Promise.all(fetchPromises);
    results = scrapedResults.flat();

    if (filter?.stipend === 'paid') {
        results = results.filter(o => o.stipend && o.stipend !== 'Unpaid' && o.stipend !== 'Varies');
    }

    // Fallback if scraping returns nothing
    if (results.length === 0 && (!filter || filter.stipend !== 'paid')) {
      console.log("Scrapers returned empty, falling back to mock data");
      return getMockOpportunities(filter);
    } else if (results.length === 0) {
      return getMockOpportunities(filter);
    }

    // Sort by deadline
    return results.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  } catch (error) {
    console.error("Scraping failed, falling back to mock data.", error);
    return getMockOpportunities(filter);
  }
}

export async function getOpportunityById(id: string): Promise<Opportunity | null> {
  // Since we are pure scraping now, direct detail fetch is tricky without DB. 
  // We rely on external links.
  return mockOpportunities.find(o => o.id === id) || null;
}

function getMockOpportunities(filter?: OpportunityFilter): Opportunity[] {
  let filtered = [...mockOpportunities];

  if (filter?.query) {
    const q = filter.query.toLowerCase();
    filtered = filtered.filter(o => 
      o.title.toLowerCase().includes(q) || 
      o.company.toLowerCase().includes(q)
    );
  }
  if (filter?.type && filter.type !== 'all') {
    filtered = filtered.filter(o => o.type === filter.type);
  }
  if (filter?.domain && filter.domain !== 'all') {
    filtered = filtered.filter(o => o.domain.includes(filter.domain as string));
  }
  if (filter?.difficulty) {
    filtered = filtered.filter(o => o.difficulty === filter.difficulty);
  }
  if (filter?.stipend === 'paid') {
    filtered = filtered.filter(o => o.stipend && o.stipend !== 'Unpaid' && o.stipend !== 'Varies');
  }

  // Sort by deadline
  return filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
}
