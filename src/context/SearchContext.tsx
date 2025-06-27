// SearchContex.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContexType {
    searchData: string;
    setData: (value: string) => void;
}

const SearchContex = createContext<SearchContexType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const SearchProvider: React.FC<Props> = ({ children }) => {
    const [searchData, setData] = useState<string>("");

    return (
        <SearchContex.Provider value={{ searchData, setData }}>
            {children}
        </SearchContex.Provider>
    );
};

export const useData = (): SearchContexType => {
    const context = useContext(SearchContex);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
