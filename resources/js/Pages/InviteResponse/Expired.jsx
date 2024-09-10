import WeddingLayout from '@/Layouts/WeddingLayout';
import { Head, Link } from "@inertiajs/react";

export default function Expired() {

    return (
        <WeddingLayout>
            <Head title="Event" />
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-5xl p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">Invite Has Expired</h1>

                    <div className="col-span-1 md:col-span-2 flex flex-col text-center items-center py-8 px-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
                        <p className="text-gray-700 dark:text-gray-200 text-xl mb-4">
                            Invites were set to expire September 3rd, 2024. If you wish to attend the wedding <a href="mailto:isaachollowhorn@gmail.com" className="text-blue-500 hover:underline">contact Isaac </a>
                            and see if you are still able to attend.
                        </p>
                        <p className="text-gray-700 dark:text-gray-200 text-xl mb-4">
                            Isaac's email: <a href="mailto:isaachollowhorn@gmail.com" className="text-blue-500 hover:underline">isaachollowhorn@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </WeddingLayout>
    );
}