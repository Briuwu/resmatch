import { Loader2 } from "lucide-react";

export const JobsScrapedLoader = () => {
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
};
