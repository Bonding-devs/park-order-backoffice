import { useState } from 'react';

export enum WorkOrderFilter {
    All = 'all',
    Done = 'done',
}

export const useTabs = () => {
    const [activeTab, setActiveTab] = useState<WorkOrderFilter>(WorkOrderFilter.All);

    const changeTab = (newTab: WorkOrderFilter) => {
        setActiveTab(newTab);
    };

    return {
        activeTab,
        changeTab,
    };
};
