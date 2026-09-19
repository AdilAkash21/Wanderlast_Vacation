'use client';

import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('wanderlast-theme');
        const shouldUseDark = storedTheme ? storedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

        document.documentElement.classList.toggle('dark', shouldUseDark);
        if (shouldUseDark) {
            window.setTimeout(() => setIsDark(true), 0);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        document.documentElement.classList.toggle('dark', nextIsDark);
        window.localStorage.setItem('wanderlast-theme', nextIsDark ? 'dark' : 'light');
        setIsDark(nextIsDark);
    };

    return (
        <button
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            className="fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-[#0f9f9a] text-xl text-black shadow-xl shadow-black/20 transition-all duration-300 hover:scale-110 hover:bg-[#08726f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9f9a] focus-visible:ring-offset-2 dark:border-white/30 dark:text-white sm:bottom-7 sm:right-7"
        >
            <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
        </button>
    );
};

export default ThemeToggle;
