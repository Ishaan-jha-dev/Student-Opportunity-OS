'use server'

import { getOpportunities, getOpportunityById } from '@/services/opportunity.service';
import { OpportunityFilter } from '@/types/opportunity';

export async function fetchOpportunities(filter?: OpportunityFilter) {
  return await getOpportunities(filter);
}

export async function fetchOpportunityDetails(id: string) {
  return await getOpportunityById(id);
}
