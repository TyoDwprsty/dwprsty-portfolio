"use client";

import { useState } from "react";
import { deleteProject, updateProject } from "./actions";

type Project = {
  id: string;
  title: string;
  description: string;
  project_details: string;
  techstack: string;
  project_url: string;
};

export default function AdminProjectList({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await updateProject(id, formData);
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initialProjects.length === 0) {
    return <p className="text-secondary">No projects found.</p>;
  }

  return (
    <div className="grid gap-4">
      {initialProjects.map((project) => (
        <div
          key={project.id}
          className="bg-card p-4 rounded-xl border border-muted"
        >
          {editingId === project.id ? (
            <form onSubmit={(e) => handleEditSubmit(e, project.id)} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={project.title}
                  className="w-full bg-background border border-muted p-2 rounded text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Short Description</label>
                <input
                  name="description"
                  type="text"
                  required
                  defaultValue={project.description}
                  className="w-full bg-background border border-muted p-2 rounded text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Full Details</label>
                <textarea
                  name="project_details"
                  rows={3}
                  defaultValue={project.project_details}
                  className="w-full bg-background border border-muted p-2 rounded text-sm focus:outline-none focus:border-primary resize-y"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Tech Stack (comma-separated)</label>
                <input
                  name="techstack"
                  type="text"
                  defaultValue={project.techstack}
                  className="w-full bg-background border border-muted p-2 rounded text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Project URL</label>
                <input
                  name="project_url"
                  type="text"
                  defaultValue={project.project_url}
                  className="w-full bg-background border border-muted p-2 rounded text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-secondary text-sm mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techstack.split(",").map((t) => {
                    const tech = t.trim();
                    if (!tech) return null;
                    return (
                      <span
                        key={tech}
                        className="bg-muted px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 ml-4 shrink-0">
                <button
                  onClick={() => setEditingId(project.id)}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Edit
                </button>
                <form action={deleteProject.bind(null, project.id)}>
                  <button
                    type="submit"
                    className="text-destructive hover:underline text-sm font-medium"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
