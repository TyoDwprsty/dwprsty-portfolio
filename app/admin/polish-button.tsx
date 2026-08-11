"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { polishWithAI } from "./actions";

interface PolishButtonProps {
  getTitle: () => string;
  getNotes: () => string;
  onResult: (result: {
    description_en: string;
    description_id: string;
    details_en: string;
    details_id: string;
  }) => void;
}

export function PolishButton({ getTitle, getNotes, onResult }: PolishButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePolish = async () => {
    const title = getTitle();
    const notes = getNotes();
    if (!notes.trim()) {
      setError("Add a title and raw text first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await polishWithAI(title, notes);
      onResult(result);
    } catch (_e) {
      setError("AI failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        onClick={handlePolish}
        className="w-full border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-colors"
      >
        {loading ? (
          <>
            <Spinner className="mr-2" />
            Polishing...
          </>
        ) : (
          <>
            <Sparkles size={14} className="mr-2" />
            Polish with AI
          </>
        )}
      </Button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
