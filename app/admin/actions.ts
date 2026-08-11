"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

async function verifyAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
}

export async function addProject(formData: FormData) {
  await verifyAuth();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const description_id = formData.get("description_id") as string | null;
  const project_details = formData.get("project_details") as string;
  const project_details_id = formData.get("project_details_id") as string | null;
  const techstack = formData.get("techstack") as string;
  const project_url = formData.get("project_url") as string;

  if (!title || !description) throw new Error("Title and description are required");

  await prisma.project.create({
    data: {
      title,
      description,
      description_id: description_id || null,
      project_details,
      project_details_id: project_details_id || null,
      techstack,
      project_url,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProject(id: string, formData: FormData) {
  await verifyAuth();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const description_id = formData.get("description_id") as string | null;
  const project_details = formData.get("project_details") as string;
  const project_details_id = formData.get("project_details_id") as string | null;
  const techstack = formData.get("techstack") as string;
  const project_url = formData.get("project_url") as string;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      description_id: description_id || null,
      project_details,
      project_details_id: project_details_id || null,
      techstack,
      project_url,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(id: string) {
  await verifyAuth();
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

interface PolishResult {
  description_en: string;
  description_id: string;
  details_en: string;
  details_id: string;
}

export async function polishWithAI(title: string, rawNotes: string): Promise<PolishResult> {
  await verifyAuth();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not configured");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are an expert professional Technical Copywriter and a native-level professional Translator. Given a project title and raw notes (which could be in English or Indonesian) about a software project, generate two versions of highly polished, professional content focusing on achievements, tech stack, and impact.

Ensure the Indonesian translation is natural, professionally localized for the tech industry, and reads like native copywriting—DO NOT use generic word-for-word translation like Google Translate.

Return ONLY a valid JSON object with exactly these keys:
- "description_en": A short, punchy 1-2 sentence project description in English (under 200 chars)
- "description_id": A highly polished, native-sounding Indonesian translation of the short description (under 200 chars)
- "details_en": A detailed 2-4 sentence project description in English highlighting technical decisions and outcomes
- "details_id": A highly polished, native-sounding Indonesian translation of the detailed description

Important: Return only the JSON, no markdown, no code fences, no extra text.`,
        },
        {
          role: "user",
          content: `Project Title: ${title}\n\nRaw Notes: ${rawNotes}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GROQ API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) throw new Error("Empty response from AI");

  try {
    const cleanContent = content.replace(/```json\n?/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanContent) as PolishResult;
    return parsed;
  } catch (e) {
    throw new Error("AI returned invalid JSON. Please try again.");
  }
}
