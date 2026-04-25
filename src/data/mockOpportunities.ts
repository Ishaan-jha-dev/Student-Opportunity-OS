import { Opportunity } from '@/types/opportunity';

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'Google',
    type: 'internship',
    domain: ['Tech', 'Software'],
    deadline: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    difficulty: 'HARD',
    description: 'Join Google as a Software Engineering Intern and work on cutting-edge technologies. You will be integrated into one of our product teams, participating in full lifecycle development.',
    eligibility: 'Currently pursuing a BS, MS, or PhD in Computer Science or a related technical field.',
    apply_link: 'https://careers.google.com/students/',
    created_at: new Date(),
  },
  {
    id: '2',
    title: 'Global Management Challenge',
    company: 'GMC',
    type: 'competition',
    domain: ['Management', 'Strategy'],
    deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
    difficulty: 'HARD',
    description: 'The Global Management Challenge is the largest Strategy and Management Competition in the world. It consists of a management simulation in which each team runs a company with the objective of getting the highest investment performance.',
    eligibility: 'Open to university students and corporate teams globally.',
    apply_link: 'https://www.gmacompetition.com/',
    created_at: new Date(),
  },
  {
    id: '3',
    title: 'Product Marketing Intern',
    company: 'Notion',
    type: 'internship',
    domain: ['Marketing', 'Product'],
    deadline: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
    difficulty: 'MEDIUM',
    description: 'Help shape the voice of Notion. As a PMM Intern, you will assist in product launches, user research, and community engagement.',
    eligibility: 'Undergraduate juniors or seniors with strong written communication and analytical skills.',
    apply_link: 'https://www.notion.so/careers',
    created_at: new Date(),
  },
  {
    id: '4',
    title: 'Investment Banking Analyst Intern',
    company: 'Goldman Sachs',
    type: 'internship',
    domain: ['Finance', 'Banking'],
    deadline: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days
    difficulty: 'HARD',
    description: 'Experience the fast-paced world of investment banking. You will work on financial modeling, market research, and client presentations.',
    eligibility: 'Penultimate year students pursuing a degree in Finance, Economics, or related fields.',
    apply_link: 'https://www.goldmansachs.com/careers/',
    created_at: new Date(),
  },
  {
    id: '5',
    title: 'Hack The North 2026',
    company: 'University of Waterloo',
    type: 'competition',
    domain: ['Tech', 'Hackathon'],
    deadline: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days
    difficulty: 'MEDIUM',
    description: 'Canada’s biggest hackathon! Build incredible projects, meet amazing people, and learn from top mentors in the industry.',
    eligibility: 'All high school and university students are welcome to apply.',
    apply_link: 'https://hackthenorth.com/',
    created_at: new Date(),
  },
  {
    id: '6',
    title: 'Data Science Case Competition',
    company: 'McKinsey & Company',
    type: 'competition',
    domain: ['Consulting', 'Data'],
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days
    difficulty: 'HARD',
    description: 'Solve real-world business problems using advanced analytics. Compete with top minds and present your solutions to McKinsey partners.',
    eligibility: 'Open to undergraduate and graduate students with a background in data science or quantitative fields.',
    apply_link: 'https://www.mckinsey.com/careers/',
    created_at: new Date(),
  },
  {
    id: '7',
    title: 'Frontend Developer Intern',
    company: 'Vercel',
    type: 'internship',
    domain: ['Tech', 'Software'],
    deadline: new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000), // 20 days
    difficulty: 'EASY',
    description: 'Join the team building Next.js! Work on core infrastructure and help improve the developer experience for millions of developers.',
    eligibility: 'Experience with React, Next.js, and TypeScript. Passion for open source.',
    apply_link: 'https://vercel.com/careers',
    created_at: new Date(),
  }
];
