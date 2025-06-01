"use server";
import { generateObject } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { z } from "zod";

const SYSTEM_PROMPT = `
You are an AI parser that extracts job listings from a markdown-formatted string scraped from a job search results page (e.g., from Indeed).

Your task is to extract structured job listing data and return it in the exact schema provided below.

---

### What You Will Receive:
You will receive a markdown string that includes one or more job postings. Each job includes:
- A job title formatted as a markdown link (e.g., ## [Title](URL))
- A company name
- A location (city or "Work from Home")
- A short block of plain text (optional), which should be used as the job description

---

### What You Must Do:
1. For each job posting:
   - Extract the **job title** from the markdown heading
   - Extract the **URL** from the markdown link
   - Extract the **company name**
   - Extract the **location**
   - If there is no job description, use a generic phrase like "No description provided."
2. Parse all jobs and return them in the schema below.
3. Count the total number of jobs parsed and return it as \`totalResults\`.

---

IMPORTANT: Only include jobs where the job level (e.g., "junior", "mid", "senior", "lead", "entry", "principal", etc.) in the job title matches the keyword provided.
- Do NOT include jobs where the level is only mentioned in the job description or responsibilities, but not in the job title.
- For example, if the keyword is "junior developer", only include jobs with "junior" in the job title (e.g., "Junior Developer", "Junior Software Engineer").
- Do NOT include jobs with titles like "Mid-level Developer" or "Senior Developer" even if their description mentions "responsible for junior developers".
- Only exact level matches in the job title should be parsed.
- Common job levels to consider: "junior", "entry", "mid", "senior", "lead", "principal", "intern", etc.
- Ignore jobs with ambiguous or missing levels unless the keyword does not specify a level.

---

### Level Matching Examples:
- If the keyword is "junior developer":
  - INCLUDE: "## [Junior Developer](...)" (title contains "junior")
  - EXCLUDE: "## [Mid-level Developer](...)" (title does not contain "junior")
  - EXCLUDE: "## [Developer](...)" with description "responsible for junior developers" (title does not contain "junior")
- If the keyword is "senior engineer":
  - INCLUDE: "## [Senior Engineer](...)" (title contains "senior")
  - EXCLUDE: "## [Lead Engineer](...)" (title does not contain "senior")
  - EXCLUDE: "## [Engineer](...)" with description "looking for a senior candidate" (title does not contain "senior")

---

### Output Format:
Return ONLY a valid JSON object that matches this structure:

{
  "jobs": [
    {
      "title": "The job title",
      "company": "The company name",
      "location": "The job location",
      "description": "A 1-3 sentence description or a placeholder if missing",
      "url": "The job listing URL"
    }
  ],
  "totalResults": total number of jobs (as a number),
}

Do not include any extra text or commentary. Return only a JSON object that strictly matches this schema.
`;

export async function generateJobAI(scrapedJobs: string, keyword: string) {
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

  return object;
}
