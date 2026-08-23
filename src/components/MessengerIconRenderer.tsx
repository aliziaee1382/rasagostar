import React from 'react';
import { RubikaIcon } from './RubikaIcon';
import { Phone, ExternalLink, MessageSquare, Send, Globe } from 'lucide-react';

interface MessengerIconRendererProps {
  iconType: string;
  className?: string;
}

export const MessengerIconRenderer: React.FC<MessengerIconRendererProps> = ({ 
  iconType, 
  className = 'w-5 h-5' 
}) => {
  switch (iconType?.toLowerCase()) {
    case 'whatsapp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.09-1.1l-.29-.17-3.04.8 1.05-2.96-.19-.3a8.16 8.16 0 01-1.25-4.51c0-4.54 3.7-8.24 8.24-8.24zm4.51 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
        </svg>
      );

    case 'rubika':
      return <RubikaIcon className={className} />;

    case 'bale':
      return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="8" fill="#00A884" />
          <path d="M18 7.5C12.2 7.5 7.5 12.2 7.5 18C7.5 20.1 8.1 22.1 9.2 23.8L8 28.5L12.9 27.4C14.4 28.1 16.2 28.5 18 28.5C23.8 28.5 28.5 23.8 28.5 18C28.5 12.2 23.8 7.5 18 7.5Z" fill="white" />
          <path d="M14.5 18.2L16.8 20.5L21.5 15.5" stroke="#00A884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="ig-grad-icon" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad-icon)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="white" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.8" />
          <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
        </svg>
      );

    case 'telegram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#229ED9" />
          <path d="M5.5 11.5L18.5 6.5L15 18L11 14.5L9.5 16L9 13.5L15 8.5L8 12.5L5.5 11.5Z" fill="white" />
        </svg>
      );

    case 'eitaa':
      return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="8" fill="#E67E22" />
          <path d="M11 18C11 14.134 14.134 11 18 11C21.866 11 25 14.134 25 18C25 21.866 21.866 25 18 25C15.5 25 13.2 23.6 12 21.5L10 26L12.5 24" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="18" r="3" fill="white" />
        </svg>
      );

    case 'phone':
      return <Phone className={className} />;

    case 'link':
      return <ExternalLink className={className} />;

    default:
      return <MessageSquare className={className} />;
  }
};
