"use client";

import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/providers/resume-store-provider";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import { keywordExtractorAI } from "../actions/extract-keywords";

export const StartBtn = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { resume, setExtractedResume, extractedResume } = useResumeStore(
    (state) => state,
  );

  const handleAI = () => {
    if (resume.fileContent === "") {
      toast.info("Resume not uploaded!");
      router.push("/");
      return;
    }
    startTransition(async () => {
      try {
        setExtractedResume({
          ...extractedResume,
          isLoading: true,
        });
        const object = await keywordExtractorAI(resume);
        setExtractedResume({
          ...object,
          isLoading: false,
        });
      } catch (error) {
        toast.error(error instanceof Error && error.message);
        console.error("Error extracting the keywords", error);
      }
    });
  };

  return (
    <div className="mt-6">
      <Button
        onClick={handleAI}
        disabled={isPending}
        className="relative overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        <div className="relative flex items-center gap-2">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {isPending ? "Processing..." : "Begin"}
        </div>
      </Button>
    </div>
  );
};
