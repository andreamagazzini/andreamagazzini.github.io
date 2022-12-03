import React, { useEffect, useState } from "react";

interface IPopover {
    children: React.ReactNode,
    body: React.ReactNode,
}

export const Popover = ({ children, body }: IPopover) => {
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
        // Copy the text inside the text field
         navigator.clipboard.writeText(body);
         setHasBeenCopied(true);
        }
     }

    return (
        <>
            <div className="inline-block relative">
                <div onClick={handleCopy} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>{children}</div>
                {
                    isVisible && (
                        <div className="p-6 absolute w-auto bg-gray-200 rounded-b-lg rounded-tl-lg">
                            <>{
                                hasBeenCopied ?
                                    `Copied!`
                                    : 
                                    body
                            }</>
                        </div>
                    )
                }
            </div>
        </>
    );
}
