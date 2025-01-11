import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [clusters, setClusters] = useState([]);
    const [skip, setSkip] = useState(0);
    const [field, setField] = useState("name");
    const [sorted, setSorted] = useState("asc");
    const [alert, setalert] = useState({
        colour: '',      // red: #f71505, green: #1cba34
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <DataContext.Provider value={{ clusters, setClusters, skip, setSkip, field, setField, sorted, setSorted, alert, setalert, isLoading, setIsLoading }}>
                {children}
            </DataContext.Provider>
        </>
    )
}

export default DataProvider;