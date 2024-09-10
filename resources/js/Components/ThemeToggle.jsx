import { IoSunny, IoMoon } from "react-icons/io5";
import { IconContext } from "react-icons";
import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
    // Local component state to handle dark mode
    const [dark, setDark] = useState(() => {
        // Initialize state based on preference stored in localStorage
        const isDark = localStorage.getItem('theme') === 'dark';
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        return isDark;
    });

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        const isDark = !dark;
        setDark(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.body.classList.toggle('dark', isDark);
    };

    return (
        <div className="bg-white dark:bg-gray-800 flex justify-center items-center transition-all ease-in-out rounded-full">
            <div className="flex items-center">
                <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input 
                            type="checkbox" 
                            id="dark-toggle" 
                            className="sr-only" 
                            checked={dark}
                            onChange={toggleDarkMode}
                        />
                        <div className="block bg-gray-200 dark:bg-gray-600 border border-gray-400 dark:border-gray-600 w-14 h-8 rounded-full transition-colors duration-300"></div>
                        <div className={`dot absolute left-1 top-1 bg-white dark:bg-gray-900 w-6 h-6 rounded-full transition transform ${dark ? 'translate-x-6' : ''}`}>
                            {dark ? (
                                <IoMoon className="text-gray-100 text-lg absolute inset-0 m-auto" />
                            ) : (
                                <IoSunny className="text-yellow-500 text-lg absolute inset-0 m-auto" />
                            )}
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};