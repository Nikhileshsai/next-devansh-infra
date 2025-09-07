'use client';

import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { UI_TEXT } from '@/constants';
import Icon from '@/components/Icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage: React.FC = () => {
    const { language, footerContent } = useAppContext();
    const text = UI_TEXT[language];

    if (!footerContent) {
        return null;
    }

    const {
        phone_number,
        email,
        company_address,
        instagram_url,
        facebook_url,
        youtube_url,
    } = footerContent;

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-4xl font-bold text-center mb-12">{text.about}</h1>
                    
                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Mission Section */}
                        <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold mb-4 text-primary">{text.missionTitle}</h2>
                            <p className="text-secondary dark:text-gray-300 leading-relaxed">
                                {text.missionDescription}
                            </p>
                        </div>

                        {/* Contact Info Section */}
                         <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold mb-4 text-primary">{text.contactUs}</h2>
                            <ul className="space-y-4 text-secondary dark:text-gray-300">
                                <li className="flex items-center">
                                    <Icon name="call" className="mr-4 text-primary text-2xl" />
                                    <span className="text-lg">{phone_number}</span>
                                </li>
                                <li className="flex items-center">
                                    <Icon name="email" className="mr-4 text-primary text-2xl" />
                                    <a href={`mailto:${email}`} className="text-lg hover:text-primary transition-colors">{email}</a>
                                </li>
                                <li className="flex items-start">
                                    <Icon name="location_on" className="mr-4 text-primary text-2xl mt-1" />
                                    <span className="text-lg">{company_address}</span>
                                </li>
                            </ul>
                             <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                 <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Follow Us</h3>
                                 <div className="flex space-x-6">
                                    <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                                       <Image src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram" width={32} height={32}/>
                                    </a>
                                    <a href={facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                                       <Image src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" width={32} height={32}/>
                                    </a>
                                    <a href={youtube_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                                        <Image src="https://img.icons8.com/fluent/48/000000/youtube-play.png" alt="YouTube" width={32} height={32}/>
                                    </a>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;