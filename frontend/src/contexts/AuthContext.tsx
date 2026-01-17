/* eslint-disable react-refresh/only-export-components */
import { TrophySpin } from 'react-loading-indicators'
import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { authApi } from '../api/client';
interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 初期化時に認証状態を確認
    useEffect(() => {
        checkAuth();
    }, []);


    const checkAuth = async () => {
        try {
            await authApi.getCurrentUser();
            setIsAuthenticated(true);
        } catch {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        await authApi.login(email, password);
        setIsAuthenticated(true);
    }

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('ログアウトエラー:', error);
        } finally {
            setIsAuthenticated(false);
        }
    }

    if (isLoading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <TrophySpin color='skyblue' size="large" text="読み込み中です。しばらくお待ちください。" />
            </div>
        )
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};