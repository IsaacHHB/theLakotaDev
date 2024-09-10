import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Link } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';

export default function ActionsDropdown({ customActions }) {
    const [isOpen, setIsOpen] = useState(false);
    const referenceElement = useRef(null);
    const popperElement = useRef(null);

    // Handle clicking outside the dropdown to close it
    const handleDocumentClick = (e) => {
        if (popperElement.current && !popperElement.current.contains(e.target) && !referenceElement.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleDocumentClick);
        } else {
            document.removeEventListener('click', handleDocumentClick);
        }
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleItemClick = (callback) => {
        callback();
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                    ref={referenceElement}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                    onClick={toggleDropdown}
                >
                    Actions
                    <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Transition
                    as={React.Fragment}
                    show={isOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        ref={popperElement}
                        className="fixed w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
                        style={{ zIndex: 2000 }}
                    >
                        <div className="py-1">
                            {customActions.map((action, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <div
                                            onClick={(e) => {
                                                if (!action.disabled) {
                                                    e.stopPropagation();
                                                    handleItemClick(action.onClick);
                                                }
                                            }}
                                            className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${action.textColor} ${active && !action.disabled ? action.activeBgColor : ''} ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {action.type === 'link' ? (
                                                <Link href={action.href} className={`w-full h-full inline-block ${action.disabled ? 'pointer-events-none' : ''}`}>
                                                    {action.text}
                                                </Link>
                                            ) : (
                                                <button className="w-full h-full text-left" disabled={action.disabled}>{action.text}</button>
                                            )}
                                        </div>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}