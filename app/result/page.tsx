import { ExtractedInformation } from "@/app/result/extracted-information";
import { StartBtn } from "@/app/result/start-btn";
import { ExtractedJobsURL } from "./extracted-jobs-url";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="grid grid-cols-[0.75fr_1fr] gap-10">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="space-y-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
              <div className="relative">
                <h1 className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-4xl font-bold text-transparent">
                  ResMatch
                </h1>
                <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="relative">
                <p className="text-lg leading-relaxed text-slate-300">
                  Click the{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">
                    &apos;Begin&apos;
                  </span>{" "}
                  button to start finding your tailored job.
                </p>
                <StartBtn />
              </div>
            </div>
          </div>

          {/* Extracted Information */}
          <ExtractedInformation />
          <ExtractedJobsURL />
        </div>
        <div>test</div>
      </div>
    </main>
  );
}
