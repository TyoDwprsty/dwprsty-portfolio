"use client";

import { useRef, useState } from "react";
import { addProject } from "./actions";
import { SubmitButton } from "./submit-button";
import { PolishButton } from "./polish-button";
import { toast } from "sonner";

export function ProjectForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // Controlled field values so PolishButton can read + update them
  const [title, setTitle] = useState("");
  const [rawNotes, setRawNotes] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionId, setDescriptionId] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [projectDetailsId, setProjectDetailsId] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      await addProject(formData);
      toast.success("Success", { duration: 3000 });
      formRef.current?.reset();
      setTitle("");
      setRawNotes("");
      setDescription("");
      setDescriptionId("");
      setProjectDetails("");
      setProjectDetailsId("");
    } catch (_e) {
      toast.error("Failed to save project.");
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Raw Text <span className="text-muted-foreground">(ID or EN for AI)</span>
        </label>
        <textarea
          rows={3}
          value={rawNotes}
          onChange={(e) => setRawNotes(e.target.value)}
          placeholder="Enter rough project details here to polish with AI..."
          className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary resize-none"
        ></textarea>
      </div>

      {/* Polish with AI — reads title+rawNotes and fills all 4 text fields */}
      <PolishButton
        getTitle={() => title}
        getNotes={() => rawNotes}
        onResult={(result) => {
          setDescription(result.description_en);
          setDescriptionId(result.description_id);
          setProjectDetails(result.details_en);
          setProjectDetailsId(result.details_id);
        }}
      />

      <div className="pt-2">
        <label className="block text-sm font-medium mb-1">
          Short Description <span className="text-muted-foreground">(EN)</span>
        </label>
        <input
          name="description"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Short Description <span className="text-muted-foreground">(ID)</span>
        </label>
        <input
          name="description_id"
          type="text"
          value={descriptionId}
          onChange={(e) => setDescriptionId(e.target.value)}
          className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Full Details <span className="text-muted-foreground">(EN)</span>
        </label>
        <textarea
          name="project_details"
          rows={4}
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          className="w-full bg-background border border-muted p-2 rounded focus:outline-none focus:border-primary resize-none"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Full Details <span className="text-muted-foreground">(ID)</span>
        </label>
        <textarea
          name="project_details_id"
          rows={4}
          value={projectDetailsId}
          onChange={(e) => setProjectDetailsId(e.target.value)}
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

      <SubmitButton />
    </form>
  );
}
