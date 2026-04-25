import { Difficulty, Opportunity as PrismaOpportunity } from '@prisma/client';

export type OpportunityType = 'internship' | 'competition';

export interface Opportunity extends PrismaOpportunity {
  // We can extend the Prisma type if we add virtual fields
}

export interface OpportunityFilter {
  query?: string;
  type?: string;
  domain?: string;
  difficulty?: Difficulty | '';
}
