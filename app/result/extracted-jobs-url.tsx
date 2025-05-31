"use client";

import { useResumeStore } from "@/providers/resume-store-provider";
import { Briefcase, ExternalLink, Hash, Globe, Loader2 } from "lucide-react";
import Link from "next/link";

export const ExtractedJobsURL = () => {
  const { result } = useResumeStore((state) => state);

  if (result.isLoading) {
    return (
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
          <div className="relative space-y-6">
            {/* Loading Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
                <div className="h-6 w-40 animate-pulse rounded-lg bg-gradient-to-r from-slate-700 to-slate-600" />
              </div>
              <div className="h-8 w-24 animate-pulse rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
            </div>

            {/* Processing Indicator */}
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                  <div className="animation-delay-150 absolute inset-0 h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-teal-400" />
                </div>
                <div className="space-y-2 text-center">
                  <p className="font-medium text-white">
                    Searching for jobs...
                  </p>
                  <p className="text-sm text-slate-400">
                    Finding opportunities that match your skills
                  </p>
                </div>
              </div>
            </div>

            {/* Loading Skeletons */}
            <div className="grid gap-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/50 p-4"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-teal-600/20">
                      <Briefcase className="h-5 w-5 text-emerald-400 opacity-50" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-48 animate-pulse rounded bg-gradient-to-r from-slate-600 to-slate-500" />
                      <div className="h-4 w-32 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                    </div>
                    <div className="h-6 w-6 animate-pulse rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-28 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                    {[...Array(2)].map((_, urlIndex) => (
                      <div
                        key={urlIndex}
                        className="h-12 animate-pulse rounded-lg border border-slate-700/30 bg-slate-900/30"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
        <div className="relative space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
              Job Opportunities
            </h2>
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-3 py-1">
              <Hash className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200">
                {result.totalResults} Results
              </span>
            </div>
          </div>

          {/* Jobs Grid */}
          {result.jobs && result.jobs.length > 0 ? (
            <div className="grid gap-4">
              {result.jobs.map((job, index) => (
                <div
                  key={job.keywordTitle}
                  className="group relative overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/50 transition-all duration-300 hover:border-slate-600/50 hover:bg-slate-800/70"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative space-y-3 p-4">
                    {/* Job Header */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-teal-600/20">
                        <Briefcase className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg leading-tight font-semibold text-white transition-colors duration-300 group-hover:text-emerald-100">
                          {job.keywordTitle}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          Keyword-based job search
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
                          <span className="text-xs font-bold text-emerald-400">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Job URLs */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Globe className="h-4 w-4 text-teal-400" />
                        <span>Available Positions</span>
                      </div>

                      <div className="grid gap-2">
                        <Link
                          key={job.url}
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex w-full items-center gap-3 rounded-lg border border-slate-700/30 bg-slate-900/30 p-3 text-left transition-all duration-300 hover:border-emerald-500/30 hover:bg-slate-900/50"
                        >
                          <ExternalLink className="h-4 w-4 flex-shrink-0 text-slate-400 transition-colors duration-300 group-hover/btn:text-emerald-400" />
                          <span className="flex-1 truncate text-slate-300 transition-colors duration-300 group-hover/btn:text-white">
                            {job.url}
                          </span>
                          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500/50 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-700/50 to-slate-600/50">
                <Briefcase className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 font-medium text-white">No Jobs Found</h3>
              <p className="text-sm text-slate-400">
                No job opportunities were found for your resume keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
