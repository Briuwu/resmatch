import { UploadedFile } from "@/lib/types";
import { createStore } from "zustand/vanilla";

export type ResumeState = {
  resume: UploadedFile;
  extractedResume: {
    name: string;
    location: string;
    keywords: string[];
    isLoading: boolean;
  };
  result: {
    jobs: {
      title: string;
      company: string;
      location: string;
      description: string;
      url: string;
    }[];
    totalResults: number;
    isLoading: boolean;
  };
};

export type ResumeActions = {
  setResume: (resume: ResumeState["resume"]) => void;
  setExtractedResume: (extractedResume: ResumeState["extractedResume"]) => void;
  setResult: (result: ResumeState["result"]) => void;
};

export type ResumeStore = ResumeState & ResumeActions;

export const defaultInitState: ResumeState = {
  resume: {
    fileName: "",
    fileContent: "",
  },
  extractedResume: {
    name: "",
    location: "",
    keywords: [],
    isLoading: false,
  },
  result: {
    jobs: [],
    totalResults: 0,
    isLoading: false,
  },
};

export const createResumeStore = (
  initState: ResumeState = defaultInitState,
) => {
  return createStore<ResumeStore>()((set) => ({
    ...initState,
    setResume: (resume) => set({ resume }),
    setExtractedResume: (extractedResume) => set({ extractedResume }),
    setResult: (result) => set({ result }),
  }));
};
