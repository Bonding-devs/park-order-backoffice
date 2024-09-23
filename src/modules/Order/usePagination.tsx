import { useState } from 'react';

export const usePagination = ({ limit }: { limit: number }) => {
    const [currPage, setCurrPage] = useState(0);
    const [lastList, setLastList] = useState(false);

    const getOffset = () => currPage * limit;

    const incrementPage = () => {
        if (!lastList) {
            setCurrPage((prevPage) => prevPage + 1);
        }
    };

    const resetPagination = () => {
        setCurrPage(0);
        setLastList(false);
    };

    return {
        currPage,
        lastList,
        incrementPage,
        resetPagination,
        getOffset,
        setLastList,
    };
};
