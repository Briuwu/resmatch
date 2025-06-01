"use server";
import { generateObject } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { ResumeState } from "@/stores/resume-store";
import { z } from "zod";

const SYSTEM_PROMPT = `
You are an AI assistant that generates optimized job search URLs for Indeed.com based on a list of job titles or keywords and the user's country.

Your task is to return a JSON object that includes:
- A list of search keywords (job titles) the user is interested in
- For each keyword, generate a properly formatted Indeed job search URL
- Use the correct **Indeed domain** based on the user's country

---

### Rules:

1. Do NOT include specific city or location parameters in the URL.
2. Use the appropriate **Indeed regional domain**:
   - United States → https://www.indeed.com
   - Philippines → https://ph.indeed.com
   - United Kingdom → https://uk.indeed.com
   - Canada → https://ca.indeed.com
   - India → https://in.indeed.com
   - Australia → https://au.indeed.com
   - Germany → https://de.indeed.com
   - If the country is not listed above, default to https://www.indeed.com
3. Format spaces in search queries using "+" (e.g., "Junior Python Developer" → "Junior+Python+Developer")
4. Add \`fromage=3\` to each URL to limit results to jobs posted in the past 3 days.

---

### Output Schema:

{
  "jobs": [
    {
      "keywordTitle": "The job keyword or title",
      "url": "Direct URL to the job listing on Indeed"
    },
    ...
  ],
  "totalResults": Total number of search URLs generated (as a number)
  
}

- Do not include additional commentary or explanations.
- Always include the total number of keyword-based URLs.
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
          url: z.string().describe("Direct URL to the job listing on Indeed"),
        }),
      ),
      totalResults: z
        .number()
        .describe("Total number of search URLs generated"),
    }),
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Job Keywords: ${extractedResume.keywords.join(", ")}, Location: ${extractedResume.location}`,
      },
    ],
  });

  return object;
}
