export enum ManageData {
    CREATE,
    DELETE,
    EDIT,
}

export interface DataFetchResult<T> {
    data: T[];
    loading: boolean;
    error: string | null;
    externalRef: React.RefObject<HTMLDivElement>;
    selectedItem: T | null;
    setSelectedItem: (value: T | null) => void;
    setExternalLoad: (value: boolean) => void;
    manageData: (data: T, action: ManageData) => void;
}