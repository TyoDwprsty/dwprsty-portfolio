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
  const project_details = formData.get("project_details") as string;
  const techstack = formData.get("techstack") as string;
  const project_url = formData.get("project_url") as string;

  if (!title || !description) throw new Error("Title and description are required");

  await prisma.project.create({
    data: {
      title,
      description,
      project_details,
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
  const project_details = formData.get("project_details") as string;
  const techstack = formData.get("techstack") as string;
  const project_url = formData.get("project_url") as string;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      project_details,
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
