import PortfolioClient from "@/components/portfolio-client";
import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

export const revalidate = 60; // Revalidate the cache every 60 seconds


export default async function Home() {
  // Gracefully handle DB connection errors — site stays up even if DB isn't configured yet
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch projects from DB:", error);
  }

  return <PortfolioClient projects={projects} />;
}
