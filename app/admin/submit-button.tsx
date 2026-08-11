"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:bg-accent transition-colors"
    >
      {pending ? (
        <>
          <Spinner className="mr-2" />
          Saving Project...
        </>
      ) : (
        "Save Project"
      )}
    </Button>
  );
}
