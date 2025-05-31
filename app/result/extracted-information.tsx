"use client";

import { useResumeStore } from "@/providers/resume-store-provider";
import { MapPin, User, Tag } from "lucide-react";
import { ExtractedInformationLoader } from "./loaders/extracted-information-loader";

export const ExtractedInformation = () => {
  const { extractedResume } = useResumeStore((state) => state);

  if (extractedResume.isLoading) {
    return <ExtractedInformationLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="relative space-y-4">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
            Extracted Information
          </h2>

          <div className="grid gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-slate-700/30 bg-slate-800/50 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm font-medium text-slate-300">Name</p>
                <p className="font-semibold text-white">
                  {extractedResume.name || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-700/30 bg-slate-800/50 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20">
                <MapPin className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm font-medium text-slate-300">
                  Location
                </p>
                <p className="font-semibold text-white">
                  {extractedResume.location || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-700/30 bg-slate-800/50 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                <Tag className="h-5 w-5 text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm font-medium text-slate-300">
                  Keywords
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {extractedResume.keywords?.length > 0 ? (
                    extractedResume.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 text-xs font-medium text-purple-200"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      No keywords extracted
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
