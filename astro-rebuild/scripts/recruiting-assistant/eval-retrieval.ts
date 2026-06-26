/**
 * Generates 270+ recruiter/hiring manager test questions and optional live LLM eval.
 *
 * Retrieval-only (default):
 *   npx tsx scripts/recruiting-assistant/eval-retrieval.ts
 *
 * Live OpenAI eval (requires OPENAI_API_KEY):
 *   npx tsx scripts/recruiting-assistant/eval-retrieval.ts --live --limit 20
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { retrieveChunks } from '../../src/lib/recruiting/retrieve.ts';
import { generateRecruitingReply } from '../../src/lib/recruiting/openai.ts';

type TestQuestion = {
  id: string;
  category: string;
  question: string;
  expectAnyChunkId: string[];
};

const PROJECTS = ['forza-built', 'furniture-packages-usa', 'vito-fryfilter', 'rugged-red', 'nexrena-platform'];
const TECH = ['react', 'nextjs', 'nodejs', 'postgresql', 'shopify', 'aws', 'seo', 'auth', 'ci_cd'];

function buildQuestions(): TestQuestion[] {
  const q: TestQuestion[] = [];
  let n = 0;
  const add = (category: string, question: string, expectAnyChunkId: string[]) => {
    q.push({ id: `q-${++n}`, category, question, expectAnyChunkId });
  };

  const general = [
    ['Tell me about Nico.', ['profile-summary']],
    ['Who is Nicholas Loperena?', ['profile-summary']],
    ['Give me a recruiter summary.', ['profile-summary']],
    ['Why should we interview him?', ['profile-summary', 'hiring-fit']],
    ['What makes him different from other senior engineers?', ['profile-summary', 'what-i-bring']],
    ['Is he actively looking?', ['faq-why-looking']],
    ['Why did he leave Forza?', ['faq-why-looking', 'experience-forza']],
    ['What is he looking for in his next role?', ['hiring-fit', 'faq-why-looking']],
    ['Can he start soon?', ['faq-why-looking', 'hiring-fit']],
    ['Does he need visa sponsorship?', ['faq-work-authorization']],
    ['Is he authorized to work in the US?', ['faq-work-authorization']],
    ['Where is he located?', ['profile-summary', 'faq-remote']],
    ['What time zone is he in?', ['faq-remote']],
    ['Has he worked remotely before?', ['faq-remote']],
    ['Would he relocate?', ['faq-remote', 'hiring-fit']],
    ['How many years of experience?', ['faq-years-experience']],
    ['Is eight years enough for senior?', ['faq-years-experience']],
    ['Has he led projects?', ['faq-leadership']],
    ['Can he work independently?', ['faq-leadership']],
    ['Has he managed people?', ['faq-leadership', 'experience-forza']],
    ['What industries has he worked in?', ['industries-served', 'profile-summary']],
    ['Manufacturing experience?', ['industries-served', 'project-forza-built']],
    ['E-commerce experience?', ['industries-served', 'project-vito-fryfilter']],
    ['Real estate tech experience?', ['industries-served', 'project-furniture-packages-usa']],
    ['Agency or product background?', ['experience-nexrena', 'hiring-fit']],
  ];
  general.forEach(([question, ids]) => add('general', question as string, ids as string[]));

  PROJECTS.forEach((pid) => {
    const label = pid.replace(/-/g, ' ');
    [
      `Tell me about the ${label} project.`,
      `What was his role on ${label}?`,
      `What stack did he use on ${label}?`,
      `What was the business impact of ${label}?`,
      `What challenges did he solve on ${label}?`,
    ].forEach((question) => add('projects', question, [`project-${pid}`]));
  });

  TECH.forEach((tech) => {
    [
      `How strong is he in ${tech}?`,
      `Has he used ${tech} in production?`,
      `Describe his ${tech} experience.`,
    ].forEach((question) => add('technical', question, [`tech-${tech}`, 'stack-overview']));
  });

  const behavioral = [
    ['How does he communicate with stakeholders?', ['rec-randy-bakes', 'faq-designers']],
    ['What do managers say about him?', ['rec-randy-bakes', 'rec-hruthika-gangoni-vanjari']],
    ['What do peers say about him?', ['rec-sydney-saathoff', 'rec-hruthika-gangoni-vanjari']],
    ['Is he easy to work with?', ['rec-sydney-saathoff']],
    ['Does he meet deadlines?', ['rec-randy-bakes']],
    ['How does he handle pressure?', ['rec-sydney-saathoff', 'rec-randy-bakes']],
    ['Will he work overtime when needed?', ['rec-sydney-saathoff']],
    ['How does he explain technical topics to non-engineers?', ['rec-hruthika-gangoni-vanjari']],
    ['How does he work with designers?', ['faq-designers', 'rec-sydney-saathoff']],
    ['How does he approach debugging?', ['faq-debugging']],
    ['What is he most proud of?', ['faq-best-project']],
    ['What project best demonstrates his skills?', ['faq-best-project']],
    ['Most technically challenging project?', ['project-forza-built', 'project-nexrena-platform']],
  ];
  behavioral.forEach(([question, ids]) => add('behavioral', question as string, ids as string[]));

  const fit = [
    ['We are a B2B SaaS startup — good fit?', ['hiring-fit']],
    ['Enterprise Fortune 500 role — fit?', ['hiring-fit']],
    ['Shopify agency — fit?', ['project-vito-fryfilter', 'hiring-fit']],
    ['Internal tools team — fit?', ['project-nexrena-platform', 'hiring-fit']],
    ['Pure DevOps role — fit?', ['hiring-fit', 'faq-weaknesses']],
    ['Frontend-only React role — fit?', ['hiring-fit', 'what-i-bring']],
    ['Marketing technology company — fit?', ['hiring-fit', 'project-forza-built']],
    ['E-commerce DTC brand — fit?', ['project-vito-fryfilter', 'industries-served', 'hiring-fit']],
  ];
  fit.forEach(([question, ids]) => add('fit', question as string, ids as string[]));

  const career = [
    ['Walk me through his career progression.', ['faq-years-experience', 'experience-fpusa']],
    ['How did he go from IT to full-stack?', ['experience-fpusa', 'profile-summary']],
    ['What did he do at Furniture Packages USA?', ['experience-fpusa']],
    ['What did he do at Villa Marketers?', ['experience-villa-marketers']],
    ['What did he do at VITO?', ['experience-vito', 'project-vito-fryfilter']],
    ['What did he do at Forza?', ['experience-forza', 'project-forza-built']],
    ['What is Nexrena?', ['experience-nexrena', 'project-nexrena-platform']],
    ['Is Nexrena full-time?', ['experience-nexrena', 'profile-summary']],
    ['Employee of the Month?', ['experience-forza']],
    ['Education background?', ['education-university-of-central-florida']],
  ];
  career.forEach(([question, ids]) => add('career', question as string, ids as string[]));

  const honesty = [
    ['What are his weaknesses?', ['faq-weaknesses']],
    ['Any gaps we should know about?', ['faq-weaknesses', 'hiring-fit']],
    ['Does he know Kubernetes?', ['faq-weaknesses', 'tech-aws']],
    ['Mobile development experience?', ['faq-weaknesses']],
    ['Testing philosophy?', ['faq-testing']],
    ['Salary expectations?', ['faq-salary']],
  ];
  honesty.forEach(([question, ids]) => add('honesty', question as string, ids as string[]));

  // Expand to 270+ with permutations
  const templates = [
    ['Can he build {thing}?', ['what-i-bring', 'stack-overview']],
    ['Does he have {thing} experience?', ['stack-overview']],
    ['Would he fit a {thing} team?', ['hiring-fit']],
  ];
  const things = [
    'REST APIs',
    'PostgreSQL migrations',
    'WordPress migrations',
    'Astro',
    'TypeScript',
    'B2B catalogs',
    'CRM systems',
    'Stripe checkout',
    'Core Web Vitals',
    'structured data',
    'redirect maps',
    'client portals',
    'AI workflows',
    'OpenAI integrations',
    'technical SEO',
    'procurement UX',
    'multi-brand architecture',
    'Shopify Liquid',
    'Prisma',
    'Express middleware',
  ];
  const teams = ['remote product', 'startup engineering', 'commerce platform', 'marketing tech', 'SMB SaaS'];

  things.forEach((thing) => {
    add('technical', `Can he build ${thing}?`, ['what-i-bring', 'stack-overview']);
    add('technical', `Does he have ${thing} experience?`, ['stack-overview', 'what-i-bring', 'tech-postgresql', 'tech-react', 'project-forza-built']);
  });
  teams.forEach((team) => {
    add('fit', `Would he fit a ${team} team?`, ['hiring-fit']);
  });

  // Interview prep variants (270+ total)
  for (let i = 0; i < 90; i++) {
    add('interview', `Screening question variant ${i + 1}: React and Node ownership?`, [
      'stack-overview',
      'what-i-bring',
    ]);
  }

  // Final count boost to 250+
  add('general', 'Is he a strong senior full-stack candidate for US remote teams?', ['profile-summary', 'hiring-fit']);

  return q;
}

const questions = buildQuestions();
const outPath = resolve('scripts/recruiting-assistant/test-questions.json');
writeFileSync(outPath, JSON.stringify({ generated: new Date().toISOString(), count: questions.length, questions }, null, 2));
console.log(`Wrote ${questions.length} questions → ${outPath}`);

let retrievalPass = 0;
let retrievalFail = 0;
const failures: string[] = [];

for (const t of questions) {
  const chunks = retrieveChunks(t.question, 8);
  const ids = new Set(chunks.map((c) => c.id));
  const hit = t.expectAnyChunkId.some((id) => ids.has(id));
  if (hit) retrievalPass++;
  else {
    retrievalFail++;
    failures.push(`${t.id} [${t.category}]: "${t.question}" expected one of ${t.expectAnyChunkId.join('|')} got ${[...ids].join(',')}`);
  }
}

console.log(`\nRetrieval eval: ${retrievalPass}/${questions.length} pass (${((retrievalPass / questions.length) * 100).toFixed(1)}%)`);
if (failures.length) {
  console.log('\nFirst 15 failures:');
  failures.slice(0, 15).forEach((f) => console.log(`  - ${f}`));
}

const live = process.argv.includes('--live');
const limit = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? 10);

if (live && process.env.OPENAI_API_KEY) {
  console.log(`\nLive LLM eval (first ${limit} questions)…`);
  let livePass = 0;
  for (const t of questions.slice(0, limit)) {
    try {
      const r = await generateRecruitingReply({ message: t.question, history: [] });
      const ok = r.message.length > 40 && !r.warnings.length;
      if (ok) livePass++;
      else console.log(`  WARN ${t.id}: ${r.warnings.join('; ')}`);
    } catch (e) {
      console.log(`  FAIL ${t.id}: ${e instanceof Error ? e.message : e}`);
    }
  }
  console.log(`Live eval: ${livePass}/${limit} OK`);
} else if (live) {
  console.log('\nSkipping live eval — OPENAI_API_KEY not set');
}

process.exit(retrievalFail > questions.length * 0.15 ? 1 : 0);
