import { prisma } from "@/lib/prisma";
import { addProject } from "./actions";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import AdminProjectList from "./project-list";

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
            <form action={addProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Short Description
                </label>
                <input
                  name="description"
                  type="text"
                  required
                  className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Details
                </label>
                <textarea
                  name="project_details"
                  rows={4}
                  className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tech Stack (comma-separated)
                </label>
                <input
                  name="techstack"
                  type="text"
                  className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project URL
                </label>
                <input
                  name="project_url"
                  type="text"
                  className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:bg-accent transition-colors"
              >
                Save Project
              </button>
            </form>
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
