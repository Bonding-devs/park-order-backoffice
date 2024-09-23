import { useEffect, useState } from "react";

export const useSearch = (initialTerm: string, delay: number) => {
    const [searchTerm, setSearchTerm] = useState(initialTerm);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, delay);

        return () => clearTimeout(handler);
    }, [searchTerm, delay]);

    return { searchTerm, setSearchTerm, debouncedSearchTerm };
};