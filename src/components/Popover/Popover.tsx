import React, { useState } from "react";

interface IPopover {
    children: React.ReactNode,
    body: React.ReactNode
}

export const Popover = ({ children, body }: IPopover) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <div className="inline-block relative">
                <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>{children}</div>
                {
                    isVisible && (
                        <div className="p-6 absolute w-auto bg-gray-200 rounded-b-lg rounded-tl-lg">
                            <>{body}</>
                        </div>
                    )
                }
            </div>
        </>
    );
}
