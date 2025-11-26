import React, { useEffect, useState } from "react";

interface IPopover {
    children: React.ReactNode,
    body: React.ReactNode,
    position?: 'top' | 'bottom';
}

export const Popover = ({ children, body, position = 'top' }: IPopover) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenCopied, setHasBeenCopied] = useState(false);

    useEffect(() => {
        if (hasBeenCopied) {
            setTimeout(() => {
                setHasBeenCopied(false);
            }, 2000);
        }
    }, [hasBeenCopied])

    const handleCopy = () => {
        if (body && typeof body === "string") {
            navigator.clipboard.writeText(body);
            setHasBeenCopied(true);
        }
    }

    const isTop = position === 'top';

    return (
        <div className="inline-block relative group">
            <div 
                onClick={handleCopy} 
                onMouseEnter={() => setIsVisible(true)} 
                onMouseLeave={() => setIsVisible(false)}
                className="cursor-pointer"
            >
                {children}
            </div>
            {isVisible && (
                <div className={`absolute ${isTop ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-sm whitespace-nowrap shadow-lg z-50 pointer-events-none animate-fade-in`}>
                    <div className={`absolute ${isTop ? 'top-full -mt-1' : 'bottom-full -mb-1'} left-1/2 transform -translate-x-1/2`}>
                        <div className={`border-4 border-transparent ${isTop ? 'border-t-gray-900 dark:border-t-gray-100' : 'border-b-gray-900 dark:border-b-gray-100'}`}></div>
                    </div>
                    {hasBeenCopied ? (
                        <span className="text-primary-400 dark:text-primary-600 font-semibold">✓ Copied!</span>
                    ) : (
                        <span>{body}</span>
                    )}
                </div>
            )}
        </div>
    );
}
