import { UploadForm } from "@/components/upload-form";

export default function Home() {
  return (
    <main className="grid min-h-screen content-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="relative mx-auto w-full max-w-lg">
        {/* Background glow effect */}
        <div className="absolute inset-0 scale-110 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />

        {/* Main card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 shadow-2xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
          <div className="relative space-y-6 p-8">
            <div className="space-y-4 text-center">
              <div className="relative">
                <h1 className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-3xl font-bold text-transparent">
                  ResMatch
                </h1>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                AI-powered job discovery from your resume.
              </p>
            </div>
            <UploadForm />
          </div>
        </div>
      </div>
    </main>
  );
}
