import { createContext } from "react";

interface TotalUsageContextType {
    totalUsage: number;
    setTotalUsage: React.Dispatch<React.SetStateAction<number>>;
}

// Providing default values to avoid undefined errors
export const TotalUsageContext = createContext<TotalUsageContextType>({
    totalUsage: 0,
    setTotalUsage: () => {},  // Default no-op function
});
