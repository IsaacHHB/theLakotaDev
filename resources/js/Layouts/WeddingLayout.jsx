import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function Wedding({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-900">
                <div className="flex-grow"></div>
                <Link href="/" className="flex-shrink-0">
                    <ApplicationLogo className="w-20 h-20 ms-10 fill-current text-gray-500" />
                </Link>
                <div className="flex-grow flex justify-end">
                    <ThemeToggle />
                </div>
            </div>


            <div className="w-full mt-6 px-6 py-4 bg-gray-100 dark:bg-gray-900">
                {children}
            </div>
        </div>
    );
}
