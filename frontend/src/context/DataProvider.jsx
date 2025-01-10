import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [clusters, setClusters] = useState([]);
    const [skip, setSkip] = useState(0);
    const [field, setField] = useState("name");
    const [sorted, setSorted] = useState("asc");

    return (
        <>
            <DataContext.Provider value={{ clusters, setClusters, skip, setSkip, field, setField, sorted, setSorted }}>
                {children}
            </DataContext.Provider>
        </>
    )
}

export default DataProvider;