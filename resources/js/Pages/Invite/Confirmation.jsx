import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Confirmation({ success, error }) {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("invite.sendInvite"));
    };

    return (
        <GuestLayout>
            <Head title="Confirmation" />

            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800">
                    <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">Request Your Invitation</h1>
                    <p className="text-center text-gray-500 dark:text-gray-400">Enter your email address to receive the invite link to Isaac & Savannah's wedding.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className="w-full px-3 py-2 mt-1 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                            />
                            {errors.email && <span className="block text-sm text-red-600 dark:text-red-400 mt-2">{errors.email}</span>}
                            {error && <span className="block text-sm text-red-600 dark:text-red-400 mt-2">{error}</span>}
                            {success && <span className="block text-sm text-green-600 dark:text-green-400 mt-2">{success}</span>}
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            disabled={processing}
                        >
                            Send Invite
                        </button>
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email Not Found? <Link href="#" className="text-blue-500 hover:underline">Contact Isaac</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}