import { UploadedFile } from "@/lib/types";
import { createStore } from "zustand/vanilla";

export type ResumeState = {
  resume: UploadedFile;
};

export type ResumeActions = {
  setResume: (resume: ResumeState["resume"]) => void;
};

export type ResumeStore = ResumeState & ResumeActions;

export const defaultInitState: ResumeState = {
  resume: {
    fileName: "",
    fileContent: "",
  },
};

export const createResumeStore = (
  initState: ResumeState = defaultInitState,
) => {
  return createStore<ResumeStore>()((set) => ({
    ...initState,
    setResume: (resume) => set({ resume }),
  }));
};
