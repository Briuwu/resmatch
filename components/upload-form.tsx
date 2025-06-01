"use client";

import * as React from "react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useResumeStore } from "@/providers/resume-store-provider";
import type { UploadedFile } from "@/lib/types";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  files: z
    .array(z.custom<File>())
    .length(1, "Please select one file")
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function UploadForm() {
  const router = useRouter();
  const { setResume } = useResumeStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = React.useCallback(
    (data: FormValues) => {
      startTransition(async () => {
        try {
          toast.info("Uploading resume...");

          const file = data.files[0];
          const fileFormData = new FormData();
          fileFormData.append("files", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: fileFormData,
          });

          if (!response.ok) {
            const error = await response.json();
            toast.error(error.message || "Something went wrong");
            return;
          }

          const responseData = (await response.json()) as UploadedFile;
          setResume(responseData);
          toast.success("Resume extracted successfully");
          router.push("/result");
        } catch (error) {
          console.error(error);
          toast.error("Failed to extract resume. Please try again.");
        }
      });
    },
    [setResume, router],
  );

  return (
    <div>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />
            <div className="animation-delay-150 absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-purple-500" />
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-slate-200">
                  Attachments
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onValueChange={field.onChange}
                    accept="application/pdf"
                    maxFiles={1}
                    maxSize={5 * 1024 * 1024}
                    onFileReject={(_, message) => {
                      form.setError("files", {
                        message,
                      });
                    }}
                    multiple={false}
                    disabled={isPending}
                  >
                    <FileUploadDropzone className="rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/30 p-8 text-center transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/50">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                          <CloudUpload className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="text-slate-300">
                          Drag and drop or{" "}
                          <FileUploadTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-blue-400 hover:text-blue-300"
                            >
                              choose files
                            </Button>
                          </FileUploadTrigger>{" "}
                          to upload
                        </div>
                      </div>
                    </FileUploadDropzone>
                    <FileUploadList>
                      {field.value.length > 0 && (
                        <FileUploadItem
                          key={0}
                          value={field.value[0]}
                          className="rounded-lg border border-slate-700/50 bg-slate-800/50"
                        >
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata className="text-slate-300" />
                          <FileUploadItemDelete asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      )}
                    </FileUploadList>
                  </FileUpload>
                </FormControl>
                <FormDescription className="text-sm text-slate-400">
                  Upload a PDF file containing your resume.
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="relative w-full overflow-hidden rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-600 to-teal-600 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            disabled={isPending}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
            <div className="relative flex items-center justify-center gap-2">
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CloudUpload className="h-4 w-4" />
              )}
              {isPending ? "Uploading..." : "Upload Resume"}
            </div>
          </Button>
        </form>
      </Form>
    </div>
  );
}
