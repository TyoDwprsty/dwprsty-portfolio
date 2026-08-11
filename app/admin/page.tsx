import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import AdminProjectList from "./project-list";
import { ProjectForm } from "./project-form";

export default async function AdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="min-h-screen text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-center border-b border-muted pb-6">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-8">
          {/* Add Project Form */}
          <div className="md:col-span-1 bg-card p-6 rounded-xl border border-muted shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Add New Project</h2>
            <ProjectForm />
          </div>

          {/* Project List */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-6">Existing Projects</h2>
            <AdminProjectList initialProjects={projects} />
          </div>
        </section>
      </div>
    </div>
  );
}
