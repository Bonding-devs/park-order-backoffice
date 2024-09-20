import { useState } from 'react';

export const useTabs = () => {
    const [activeTab, setActiveTab] = useState('all');

    const changeTab = (newTab: string) => {
        setActiveTab(newTab);
    };

    return {
        activeTab,
        changeTab,
    };
};
