"use client";

import { useResumeStore } from "@/providers/resume-store-provider";
import { MapPin, User, Tag, Loader2 } from "lucide-react";

export const ExtractedInformation = () => {
  const { extractedResume } = useResumeStore((state) => state);

  if (extractedResume.isLoading) {
    return (
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
          <div className="relative space-y-4">
            {/* Loading Header */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
              <div className="h-6 w-48 animate-pulse rounded-lg bg-gradient-to-r from-slate-700 to-slate-600" />
            </div>

            {/* Processing Indicator */}
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  <div className="animation-delay-150 absolute inset-0 h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-purple-400" />
                </div>
                <div className="space-y-2 text-center">
                  <p className="font-medium text-white">
                    Processing your resume...
                  </p>
                  <p className="text-sm text-slate-400">
                    Extracting key information with AI
                  </p>
                </div>
              </div>
            </div>

            {/* Loading Skeletons */}
            <div className="grid gap-4">
              {/* Name Skeleton */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-700/30 bg-slate-800/50 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                  <User className="h-5 w-5 text-blue-400 opacity-50" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-16 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                  <div className="h-5 w-32 animate-pulse rounded bg-gradient-to-r from-slate-600 to-slate-500" />
                </div>
              </div>

              {/* Location Skeleton */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-700/30 bg-slate-800/50 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20">
                  <MapPin className="h-5 w-5 text-emerald-400 opacity-50" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                  <div className="h-5 w-40 animate-pulse rounded bg-gradient-to-r from-slate-600 to-slate-500" />
                </div>
              </div>

              {/* Keywords Skeleton */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-700/30 bg-slate-800/50 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                  <Tag className="h-5 w-5 text-purple-400 opacity-50" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="h-6 animate-pulse rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                        style={{ width: `${60 + Math.random() * 40}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
