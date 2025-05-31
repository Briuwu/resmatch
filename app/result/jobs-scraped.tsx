"use client";

import { useResumeStore } from "@/providers/resume-store-provider";
import {
  Building2,
  MapPin,
  ExternalLink,
  FileText,
  Loader2,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export const JobsScraped = () => {
  const { scrapedJobs } = useResumeStore((state) => state);

  if (scrapedJobs.isLoading) {
    return (
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10" />
          <div className="relative space-y-6">
            {/* Loading Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-violet-400 to-indigo-400" />
                <div className="h-6 w-44 animate-pulse rounded-lg bg-gradient-to-r from-slate-700 to-slate-600" />
              </div>
              <div className="h-8 w-28 animate-pulse rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20" />
            </div>

            {/* Processing Indicator */}
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
                  <div className="animation-delay-150 absolute inset-0 h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-indigo-400" />
                </div>
                <div className="space-y-2 text-center">
                  <p className="font-medium text-white">
                    Scraping job details...
                  </p>
                  <p className="text-sm text-slate-400">
                    Gathering comprehensive job information
                  </p>
                </div>
              </div>
            </div>

            {/* Loading Skeletons */}
            <div className="grid gap-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/50 p-6"
                >
                  <div className="space-y-4">
                    {/* Header skeleton */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="h-6 w-64 animate-pulse rounded bg-gradient-to-r from-slate-600 to-slate-500" />
                        <div className="flex items-center gap-4">
                          <div className="h-4 w-32 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                          <div className="h-4 w-24 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                        </div>
                      </div>
                      <div className="h-10 w-10 animate-pulse rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20" />
                    </div>

                    {/* Description skeleton */}
                    <div className="space-y-2">
                      <div className="h-4 w-full animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                      <div className="h-4 w-5/6 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                      <div className="h-4 w-4/6 animate-pulse rounded bg-gradient-to-r from-slate-700 to-slate-600" />
                    </div>

                    {/* Button skeleton */}
                    <div className="h-10 animate-pulse rounded-lg border border-slate-700/30 bg-slate-900/30" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10" />
        <div className="relative space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400" />
              Detailed Job Listings
            </h2>
            <div className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 px-3 py-1">
              <Briefcase className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-200">
                {scrapedJobs.totalResults} Jobs
              </span>
            </div>
          </div>

          {/* Jobs List */}
          {scrapedJobs.jobs && scrapedJobs.jobs.length > 0 ? (
            <div className="grid gap-6">
              {scrapedJobs.jobs.map((job, index) => (
                <div
                  key={`${job.company}-${job.title}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/50 transition-all duration-300 hover:border-slate-600/50 hover:bg-slate-800/70"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative space-y-4 p-6">
                    {/* Job Header */}
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1 space-y-2">
                        <h3 className="text-lg leading-tight font-semibold text-white transition-colors duration-300 group-hover:text-violet-100">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Building2 className="h-4 w-4 text-violet-400" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          {job.location && (
                            <div className="flex items-center gap-2 text-slate-400">
                              <MapPin className="h-4 w-4 text-indigo-400" />
                              <span>{job.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-indigo-600/20">
                          <span className="text-sm font-bold text-violet-400">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Job Description */}
                    {job.description && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <FileText className="h-4 w-4 text-indigo-400" />
                          <span>Job Description</span>
                        </div>
                        <div className="rounded-lg border border-slate-700/30 bg-slate-900/30 p-4">
                          <p className="line-clamp-4 text-sm leading-relaxed text-slate-300 transition-all duration-300 group-hover:line-clamp-none">
                            {job.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Apply Button */}
                    <div className="pt-2">
                      <Link
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-3 rounded-lg border border-violet-500/30 bg-gradient-to-r from-violet-600/80 to-indigo-600/80 px-4 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:from-violet-600 hover:to-indigo-600 hover:shadow-lg hover:shadow-violet-500/25"
                      >
                        <ExternalLink className="h-4 w-4 transition-colors duration-300 group-hover/btn:text-violet-200" />
                        <span>View Job Details</span>
                        <div className="h-2 w-2 rounded-full bg-violet-300/50 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                      </Link>
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
              <h3 className="mb-2 font-medium text-white">No Jobs Scraped</h3>
              <p className="text-sm text-slate-400">
                No detailed job information has been scraped yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
