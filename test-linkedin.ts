import { query } from 'linkedin-jobs-api';

async function test() {
  const jobs = await query({
    keyword: 'internship',
    location: 'India',
    dateSincePosted: 'past Month',
    jobType: 'internship',
    limit: '2',
  });
  console.log(JSON.stringify(jobs, null, 2));
}

test();
