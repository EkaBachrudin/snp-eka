// SearchContex.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContexType {
    data: string;
    setData: (value: string) => void;
}

// Creating the context with an undefined default value which will be overwritten by the Provider
const SearchContex = createContext<SearchContexType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const SearchProvider: React.FC<Props> = ({ children }) => {
    const [data, setData] = useState<string>(""); // Initial state can be an empty string

    return (
        <SearchContex.Provider value={{ data, setData }}>
            {children}
        </SearchContex.Provider>
    );
};

// Custom hook to use the data context
export const useData = (): SearchContexType => {
    const context = useContext(SearchContex);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};