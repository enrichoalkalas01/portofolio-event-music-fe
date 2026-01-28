import { create } from "zustand";

interface IUseDialogStore {
    statusDialog: boolean;
    setStatusDialog: (value: boolean) => void
}

interface IPagination {
    pageIndex: number;
    pageSize: number;
}

export const useDialogStore = create<IUseDialogStore>((set) => {
    return {
        // Dialog
        statusDialog: false,
        setStatusDialog: (value: boolean) => set({ statusDialog: value })
    };
});
