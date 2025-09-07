'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { useAppContext } from '@/context/AppContext';

const Footer: React.FC = () => {
    const { language, footerContent } = useAppContext();

    if (!footerContent) {
        return null;
    }

    const {
        company_name,
        hero_subtitle_en,
        hero_subtitle_te,
        contact_us_title_en,
        contact_us_title_te,
        phone_number,
        email,
        company_address,
        follow_us_title_en,
        follow_us_title_te,
        instagram_url,
        facebook_url,
        youtube_url,
        copyright_notice_en,
        copyright_notice_te,
    } = footerContent;

    const heroSubtitle = language === 'te' ? hero_subtitle_te : hero_subtitle_en;
    const contactUsTitle = language === 'te' ? contact_us_title_te : contact_us_title_en;
    const followUsTitle = language === 'te' ? follow_us_title_te : follow_us_title_en;
    const copyrightNotice = language === 'te' ? copyright_notice_te : copyright_notice_en;

    return (
        <footer className="bg-card-dark text-text-dark mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-text-[#F0F0F0] dark:text-text-dark mb-4">{company_name}</h3>
                        <p className="text-[#E3E3E3] dark:text-gray-300">{heroSubtitle}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-[#F0F0F0] dark:text-text-dark mb-4">{contactUsTitle}</h3>
                        <ul className="space-y-2 text-[#E3E3E3] dark:text-gray-300">
                            <li className="flex items-center">
                                <Icon name="call" className="mr-3 text-primary" />
                                <span>{phone_number}</span>
                            </li>
                            <li className="flex items-center">
                                <Icon name="email" className="mr-3 text-primary" />
                                <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
                            </li>
                            <li className="flex items-start">
                                <Icon name="location_on" className="mr-3 text-primary mt-1" />
                                <span>{company_address}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-[#F0F0F0] dark:text-text-dark mb-4">{followUsTitle}</h3>
                        <div className="flex space-x-4">
                            <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="text-secondary dark:text-gray-300 hover:text-primary transition-colors">
                               <Image src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram" width={24} height={24}/>
                            </a>
                            <a href={facebook_url} target="_blank" rel="noopener noreferrer" className="text-secondary dark:text-gray-300 hover:text-primary transition-colors">
                               <Image src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" width={24} height={24}/>
                            </a>
                            <a href={youtube_url} target="_blank" rel="noopener noreferrer" className="text-secondary dark:text-gray-300 hover:text-primary transition-colors">
                                <Image src="https://img.icons8.com/fluent/48/000000/youtube-play.png" alt="YouTube" width={24} height={24}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-[#E3E3E3] dark:text-gray-400">
                    <p>{copyrightNotice}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
