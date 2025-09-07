'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { UI_TEXT } from '@/constants';
import { submitToGoogleSheets } from '@/services/googleSheetsService';

const ContactForm: React.FC = () => {
  const { language } = useAppContext();
  const text = UI_TEXT[language].contactForm;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const result = await submitToGoogleSheets(formData);
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  
  const inputClasses = "w-full px-4 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow";

  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">{UI_TEXT[language].getInTouch}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">{text.name}</label>
          <input type="text" name="name" id="name" placeholder={text.name} value={formData.name} onChange={handleChange} required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">{text.email}</label>
          <input type="email" name="email" id="email" placeholder={text.email} value={formData.email} onChange={handleChange}  className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">{text.phone}</label>
          <input type="tel" name="phone" id="phone" placeholder={text.phone} value={formData.phone} onChange={handleChange} required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="message" className="sr-only">{text.message}</label>
          <textarea name="message" id="message" placeholder={text.message} value={formData.message} onChange={handleChange}  rows={4} className={inputClasses}></textarea>
        </div>
        <button type="submit" disabled={status === 'loading'} className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-hover disabled:bg-gray-400 transition-colors">
          {status === 'loading' ? 'Sending...' : text.send}
        </button>
      </form>
      {status === 'success' && <p className="mt-4 text-green-600">{text.success}</p>}
      {status === 'error' && <p className="mt-4 text-red-600">{text.error}</p>}
    </div>
  );
};

export default ContactForm;
