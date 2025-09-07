'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { UI_TEXT } from '@/constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { language } = useAppContext();
    const text = UI_TEXT[language];
    const pathname = usePathname();

    const navLinkClass = (path: string) => {
        return pathname === path 
            ? 'block px-4 py-2 rounded-md bg-primary text-white' 
            : 'block px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700';
    };

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed top-0 right-0 h-full w-64 bg-card-light dark:bg-card-dark shadow-lg z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Menu</h2>
                    <nav className="space-y-2">
                        <Link href="/" className={navLinkClass('/')} onClick={onClose}>{text.home}</Link>
                        <Link href="/properties" className={navLinkClass('/properties')} onClick={onClose}>{text.properties}</Link>
                        <Link href="/blogs" className={navLinkClass('/blogs')} onClick={onClose}>{text.blogs}</Link>
                        <Link href="/about" className={navLinkClass('/about')} onClick={onClose}>{text.about}</Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
