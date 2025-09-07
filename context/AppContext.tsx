'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AppContextType, Theme, Language, FooterContentType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode, footerContent: FooterContentType | null }> = ({ children, footerContent }) => {
    const [theme, setThemeState] = useState<Theme>('light');
    const [language, setLanguageState] = useState<Language>('en');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme) {
                setThemeState(savedTheme);
            }
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient) {
            const savedLang = localStorage.getItem('language') as Language;
            if (savedLang) {
                setLanguageState(savedLang);
            }
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient) {
            const root = window.document.documentElement;
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            localStorage.setItem('theme', theme);
        }
    }, [theme, isClient]);
    
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('language', language);
        }
    }, [language, isClient]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
    };

    return (
        <AppContext.Provider value={{ theme, setTheme, language, setLanguage, footerContent }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
