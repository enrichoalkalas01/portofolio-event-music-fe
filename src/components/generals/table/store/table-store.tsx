import { create } from "zustand";

interface IUseTableStore {
    // Pagination
    pagination: IPagination;
    setPagination: ({ pageIndex, pageSize }: IPagination) => void;

    pagesData: number[];
    setPagesData: (value: number[]) => void;

    totalData: number;
    setTotalData: (value: number) => void;
    pagePerSize: number;
    setPagePerSize: (value: number) => void;

    // Sorting
    sorting: any[];
    setSorting: (value: any[]) => void;

    // Selected Row
    selectedRow: any[];
    setSelectedRow: (value: any) => void;

    // Search/Filter
    searchValue: string;
    setSearchValue: (value: string) => void;
    clearSearch: () => void;
}

interface IPagination {
    pageIndex: number;
    pageSize: number;
}

export const useTableStore = create<IUseTableStore>((set) => {
    return {
        // Pagination
        pagination: { pageIndex: 0, pageSize: 6 },
        setPagination: ({ pageIndex, pageSize }: IPagination) =>
            set({ pagination: { pageSize: pageSize, pageIndex: pageIndex } }),

        pagesData: [1, 2, 5, 10, 20, 30, 50],
        setPagesData: (value: number[]) => set({ pagesData: value }),

        totalData: 0,
        setTotalData: (value: number) => set({ totalData: value }),
        pagePerSize: 6,
        setPagePerSize: (value: number) => set({ pagePerSize: value }),

        // Sorting
        sorting: [{ id: "name", desc: false }],
        setSorting: (value: any[]) => set({ sorting: value }),

        // Selected Row
        selectedRow: [],
        setSelectedRow: (value: any) => set({ selectedRow: value }),

        // Search/Filter
        searchValue: "",
        setSearchValue: (value: string) => set({ searchValue: value }),
        clearSearch: () => set({ searchValue: "" }),
    };
});
