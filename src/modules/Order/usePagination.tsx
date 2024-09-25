import { useState } from 'react';

export const usePagination = ({ limit }: { limit: number }) => {
    const [currPage, setCurrPage] = useState(0);
    const [isLastList, setIsLastList] = useState(false);

    const getOffset = () => currPage * limit;

    const incrementPage = () => {
        if (!isLastList) {
            setCurrPage((prevPage) => prevPage + 1);
        }
    };

    const resetPagination = () => {
        setCurrPage(0);
        setIsLastList(false);
    };

    return {
        currPage,
        incrementPage,
        resetPagination,
        getOffset,
        setIsLastList,
    };
};
