import { createContext, useContext, useState } from "react";

interface IAppContext {
    isAuthenticated: boolean;
    user: IUser | null;
    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: IUser) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
    children: React.ReactNode;
}
export const AppProvider = (props: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <CurrentAppContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
            {props.children}
        </CurrentAppContext.Provider>
    );
};

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <AppContext.Provider>"
        );
    }

    return currentAppContext;
};