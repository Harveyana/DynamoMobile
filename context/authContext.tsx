import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define the shape of the context value
interface AuthContextType {
    user: any; // You can replace `any` with the type of your user object
    isAuthenticated: boolean | undefined;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// Create the context with an initial value of null
export const AuthContext = createContext<AuthContextType | null>(null);

// Props for the AuthContextProvider component
interface AuthContextProviderProps {
    children: ReactNode; // ReactNode represents any JSX element
}

export const AuthContextProvider = ({children}: AuthContextProviderProps)=>{

    // State to store the user object and authentication status
    const [user, setUser] = useState<any>(null); // Replace `any` with your user object type
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);


    useEffect(()=>{
        // onAuthStatechanged
        setTimeout(() => {
            setIsAuthenticated(true)
        }, 3000);

    },[])

    const login = async(email:string,password: string)=>{
        try {
            
        } catch (error) {
            
        }
    }

    const register = async(email:string,password: string)=>{
        try {
            
        } catch (error) {
            
        }
    }

    const logout = async()=>{
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }

    return value;
}