import { UploadForm } from "@/components/upload-form";

export default function Home() {
  return (
    <div className="shadow-custom relative z-50 mx-auto w-full max-w-lg space-y-5 rounded-lg border bg-white p-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold">ResMatch</h1>
        <p className="text-muted-foreground text-sm">
          AI-powered job discovery from your resume.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}
