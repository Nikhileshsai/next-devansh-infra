'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { UI_TEXT } from '@/constants';
import Icon from './Icon';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
    const { theme, setTheme, language, setLanguage } = useAppContext();
    const pathname = usePathname();
    const text = UI_TEXT[language];
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    const toggleLanguage = () => setLanguage(language === 'en' ? 'te' : 'en');
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navLinkClass = (path: string) =>
        `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === path
            ? 'bg-primary text-white'
            : 'text-text-light dark:text-text-dark hover:bg-primary/10 dark:hover:bg-primary/20'
        }`;

    return (
        <>
            <header className="bg-background-light dark:bg-background-dark shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold text-primary">
                                Devansh Infra
                            </Link>
                        </div>
                        <nav className="hidden md:flex items-center space-x-4">
                            <Link href="/" className={navLinkClass('/')}>{text.home}</Link>
                            <Link href="/properties" className={navLinkClass('/properties')}>{text.properties}</Link>
                            <Link href="/blogs" className={navLinkClass('/blogs')}>{text.blogs}</Link>
                            <Link href="/about" className={navLinkClass('/about')}>{text.about}</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                                <span className="font-semibold text-text-light dark:text-text-dark">{language === 'en' ? 'తె' : 'EN'}</span>
                            </button>
                            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                                <Icon name={theme === 'light' ? 'dark_mode' : 'light_mode'} className="text-text-light dark:text-text-dark" />
                            </button>
                            <div className="md:hidden">
                                <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                                    <Icon name="menu" className="text-text-light dark:text-text-dark" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </>
    );
};

export default Header;