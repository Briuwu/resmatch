"use server";

import { generateObject } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { ResumeState } from "@/stores/resume-store";
import { z } from "zod";

const SYSTEM_PROMPT = `
You are a resume analysis AI specialized in extracting job search metadata from resumes to help users discover relevant jobs.

You will receive raw resume text. Your job is to analyze the content and extract structured data that follows the exact schema provided below.

Focus on identifying the applicant's:
- Name (if available in the resume)
- Location (city and state or country, if available)
- A list of job titles or keyword phrases the applicant should search for based on their skills, experience level, and career goals

Guidelines:
- If the applicant is a student, recent graduate, or intern, prioritize entry-level and internship titles.
- Use industry-standard titles (e.g., “Junior Backend Developer”, “AI Research Intern”) and avoid generic terms like “Tech Person” or “Software”.
- If name or location are not clearly stated, return an empty string ("") for those fields, but never skip the field.
- Always return a minimum of 3 and a maximum of 10 relevant job search keywords.

Return ONLY the object in the following schema:

{
  name: "the name of the job applicant (or empty string if not found)",
  location: "the location of the job applicant (or empty string if not found)",
  keywords: ["relevant job title 1", "relevant job title 2", "..."]
}
`;

export async function keywordExtractorAI(resume: ResumeState["resume"]) {
  console.log(resume);

  const { object } = await generateObject({
    model: mistral("mistral-small-latest"),
    schema: z.object({
      name: z.string().describe("the name of the job applicant"),
      location: z.string().describe("the location of the job applicant"),
      keywords: z
        .array(z.string())
        .describe(
          "an array of extracted job titles or keyword phrases for searching",
        ),
    }),
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Resume: ${JSON.stringify(resume)}`,
      },
    ],
  });

  console.log(object);

  return object;
}
