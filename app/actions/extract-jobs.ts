"use server";
import { generateObject } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { ResumeState } from "@/stores/resume-store";
import { z } from "zod";

const SYSTEM_PROMPT = `
You are an AI assistant that generates optimized job search URLs for both **Indeed.com** and **Prosple.com** based on a list of job titles or keywords and the user's country.

---

### Your task is to:
1. Receive a list of job search keywords (e.g., "Junior Python Developer", "AI Intern")
2. Receive the user's country (e.g., Philippines, United States)
3. Generate one a search URL alternating between both platforms.
4. Use the correct country-specific domain for both platforms.
5. REMEMBER TO ONLY ADD 1 PLATFORM FOR KEYWORD, NOT BOTH.

---

### Rules:

#### Indeed Domain Mapping:
- United States → https://www.indeed.com
- Philippines → https://ph.indeed.com
- United Kingdom → https://uk.indeed.com
- Canada → https://ca.indeed.com
- India → https://in.indeed.com
- Australia → https://au.indeed.com
- Germany → https://de.indeed.com
- Default to → https://www.indeed.com

- Format search query: Replace spaces with +
- Add fromage=3 to filter jobs posted in the past 3 days

**Example:**  
Keyword: "Backend Developer" → https://ph.indeed.com/jobs?q=Backend+Developer&fromage=3

---

#### Prosple Domain Mapping:
- Philippines → https://ph.prosple.com
- Australia → https://au.prosple.com
- Singapore → https://sg.prosple.com
- India → https://in.prosple.com
- Default to → https://ph.prosple.com

- Format search query: Replace spaces with \`%20\`
- Use this Prosple format:  
  \`https://[domain]/search-jobs?keywords=[encoded keyword]&locations=5&defaults_applied=1\`

**Example:**  
Keyword: "Backend Developer" → https://ph.prosple.com/search-jobs?keywords=Backend%20Developer&locations=5&defaults_applied=1

---

### Output Schema:
Return a valid JSON object matching this structure:

{
  "jobs": [
    {
      "keywordTitle": "The job keyword or title",
      "url": "The url of the job"
    }
  ],
  "totalResults": Total number of keyword-based job search URLs generated (each keyword counts as 2)
}

- Do not include extra commentary or formatting
- ALWAYS LIMIT IT TO 1 PLATFORM FOR KEYWORD, NOT BOTH.
`;

export async function extractJobsAI(
  extractedResume: ResumeState["extractedResume"],
) {
  const { object } = await generateObject({
    model: mistral("mistral-small-latest"),
    schema: z.object({
      jobs: z.array(
        z.object({
          keywordTitle: z.string().describe("The job keyword or title"),
          url: z.string().describe("The url of the job"),
        }),
      ),
      totalResults: z.number(),
    }),
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Job Keywords: ${extractedResume.keywords.join(", ")}, Country: ${extractedResume.location}`,
      },
    ],
  });

  return object;
}
