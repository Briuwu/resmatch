"use server";
import { generateObject } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { z } from "zod";

const SYSTEM_PROMPT = `
You are an AI parser that extracts relevant job listings from markdown-formatted text scraped from job search websites like Indeed and Prosple.

---

### Input:
You will receive:
- A markdown-formatted string with one or more job postings
- A keyword representing the job the user is looking for (e.g., "Junior Developer", "Senior Frontend Engineer", "AI Intern")

---

### Goal:
Extract only the job listings that clearly **match the role and level described by the keyword**.

The job title must **strongly relate to both the role and seniority level** in the keyword.

---

### Matching Rules:

✅ INCLUDE a job if:
- Its title matches or closely aligns with the **intent** of the keyword
- It reflects the same **seniority level** (e.g., intern, junior, mid-level, senior, lead)
- It is clearly targeted at the role in the keyword (e.g., “Backend Developer”, “Data Scientist”, etc.)

❌ EXCLUDE a job if:
- It is for a different **seniority level** (e.g., keyword is "Junior Developer" but title is "Senior Developer")
- The keyword is only mentioned in the description, not in the title
- The job mentions mentoring or managing the role in the keyword (e.g., “Lead Engineer mentoring Junior Developers”)

> Focus on **title-based intent** — a job title must directly align with the keyword.

---

### Markdown Format of Job Postings:
Each job includes:
- A title as a markdown heading with a link: \`## [Title](URL)\`
- Company name (line below the title)
- Location (line below the company)
- An optional description (in the next lines)

---

### Extract for Each Valid Job:
- \`title\`: From the markdown link
- \`company\`: From the line below the title
- \`location\`: From the line below the company
- \`description\`: Use 1–3 sentence summary, or “No description provided.”
- \`url\`: From the markdown link

---

### Output Format:
Return ONLY a valid JSON object in this format:

{
  "jobs": [
    {
      "title": "The job title",
      "company": "The company name",
      "location": "The job location",
      "description": "A 1–3 sentence summary or placeholder",
      "url": "Direct job posting URL"
    }
  ],
  "totalResults": total number of matching jobs (as a number)
}

---

### Final Instructions:
- Match jobs **only when both role and seniority align**
- Return a clean JSON object only — no extra text or explanation
- Always return \`totalResults\` with the number of jobs included
`;

export async function generateJobAI(scrapedJobs: string, keyword: string) {
  console.log("scrapedJobs", scrapedJobs);
  const { object } = await generateObject({
    model: mistral("mistral-small-latest"),
    schema: z.object({
      jobs: z.array(
        z.object({
          title: z.string().describe("The title of the job"),
          company: z.string().describe("The company of the job"),
          location: z.string().describe("The location of the job"),
          description: z.string().describe("The description of the job"),
          url: z.string().describe("The url of the job"),
        }),
      ),
      totalResults: z.number().describe("The total number of jobs"),
    }),
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `
        ${scrapedJobs}
        Keyword: ${keyword}
        `,
      },
    ],
  });

  console.log("object", object);

  return object;
}
