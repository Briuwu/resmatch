import { Briefcase, Loader2 } from "lucide-react";

export const ExtractedJobsLoader = () => {
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
                <p className="font-medium text-white">Searching for jobs...</p>
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
};
