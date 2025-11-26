import { useState, useRef, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Icon } from '@iconify-icon/react';
import { ToastContainer, toast } from 'react-toastify';
import { ResumeDocument } from './ResumeDocument';
import profileData from '../../data/profile.json';

type ResumeFormat = 'standard' | 'european' | 'us';

interface FormatOption {
  id: ResumeFormat;
  label: string;
  description: string;
  icon: string;
}

const formatOptions: FormatOption[] = [
  {
    id: 'standard',
    label: 'PDF (Standard)',
    description: 'Standard format suitable for most countries',
    icon: 'mdi:file-pdf-box'
  },
  {
    id: 'european',
    label: 'PDF (European CV)',
    description: 'European format with detailed personal information',
    icon: 'mdi:file-pdf-box'
  },
  {
    id: 'us',
    label: 'PDF (US Resume)',
    description: 'US format - concise and skills-focused',
    icon: 'mdi:file-pdf-box'
  }
];

export const ResumeGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const convertImageToBase64 = (imagePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          try {
            const base64 = canvas.toDataURL('image/png');
            resolve(base64);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      img.onerror = (error) => reject(error);
      img.src = imagePath;
    });
  };

  const generateResume = async (format: ResumeFormat) => {
    try {
      setIsOpen(false);
      toast.info('Generating your resume...', { autoClose: 2000 });
      
      // Convert profile image to base64 for European CV
      let profileImageBase64: string | undefined;
      if (format === 'european' && profileData.personal.profileImage) {
        try {
          profileImageBase64 = await convertImageToBase64(profileData.personal.profileImage);
        } catch (error) {
          console.warn('Could not load profile image:', error);
          // Continue without image if it fails
        }
      }
      
      const blob = await pdf(
        <ResumeDocument 
          data={profileData} 
          format={format} 
          profileImageBase64={profileImageBase64}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      
      // Open PDF in a new tab instead of downloading
      window.open(url, '_blank');
      
      // Clean up the URL after a delay to allow the browser to load it
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
      toast.success('Resume opened in new tab!', { autoClose: 3000 });
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error('Failed to generate resume. Please try again.', { autoClose: 3000 });
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        aria-label="View Resume"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon icon="mdi:file-pdf-box" width={24} height={24} />
        <span className="hidden sm:inline">View Resume</span>
        <span className="sm:hidden">Resume</span>
        <Icon 
          icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} 
          width={20} 
          height={20}
          className="transition-transform"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <div className="py-2">
            {formatOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => generateResume(option.id)}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-start gap-3 group"
              >
                <Icon 
                  icon={option.icon} 
                  width={24} 
                  height={24}
                  className="text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {option.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
