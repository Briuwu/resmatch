"use client";

import * as React from "react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, X } from "lucide-react";
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
import { UploadedFile } from "@/lib/types";

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
          toast("Uploading resume...");
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
        } catch (error) {
          console.error(error);
          toast.error("Failed to extract resume. Please try again.");
        }
      });
    },
    [setResume],
  );

  return (
    <div className="order-2 md:order-1">
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-t-4 border-t-blue-500"></div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attachments</FormLabel>
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
                    <FileUploadDropzone className="flex-row border-dotted">
                      <CloudUpload className="size-4" />
                      Drag and drop or
                      <FileUploadTrigger asChild>
                        <Button variant="link" size="sm" className="p-0">
                          choose files
                        </Button>
                      </FileUploadTrigger>
                      to upload
                    </FileUploadDropzone>
                    <FileUploadList>
                      {field.value.length > 0 && (
                        <FileUploadItem key={0} value={field.value[0]}>
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata />
                          <FileUploadItemDelete asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7"
                            >
                              <X />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      )}
                    </FileUploadList>
                  </FileUpload>
                </FormControl>
                <FormDescription>
                  <span>Upload a PDF file containing your resume.</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 w-full bg-emerald-500"
            disabled={isPending}
          >
            Upload Resume
          </Button>
        </form>
      </Form>
    </div>
  );
}
