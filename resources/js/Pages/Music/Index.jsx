import { useState } from 'react';
import WeddingLayout from '@/Layouts/WeddingLayout';
import { Head, useForm, router, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { CheckIcon, XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function Index({ invite, encrypted, musicSuggestions, success }) {
    // For adding new music suggestion
    const { data, setData, post, errors, reset } = useForm({
        artist: "",
        title: "",
        event_invite_id: invite.id,
        event_id: invite.event_id,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        // Append the encrypted parameter
        const storeUrl = `${route("music.store")}?encrypted=${encodeURIComponent(encrypted)}`;
        post(storeUrl, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // For editing music suggestion
    const [editing, setEditing] = useState(null);
    const { data: editData, setData: setEditData, post: editPost, errors: editErrors, reset: editReset } = useForm({
        artist: "",
        title: "",
        _method: "PUT",
    });

    const handleEdit = (suggestion) => {
        setEditing(suggestion.id);
        setEditData({
            artist: suggestion.artist,
            title: suggestion.title,
            _method: "PUT",
        });
    };

    const handleCancelEdit = () => {
        setEditing(null);
        editReset({
            artist: "",
            title: "",
            _method: "PUT",
        });
    };

    const handleSaveEdit = (e, suggestion) => {
        e.preventDefault();
        // Append the encrypted parameter
        const updateUrl = `${route("music.update", suggestion.id)}?encrypted=${encodeURIComponent(encrypted)}`;
        editPost(updateUrl, {
            data: { ...editData, event_invite_id: invite.id },
            preserveScroll: true,
            onSuccess: () => setEditing(null),
        });
    };

    // For deleting music suggestion
    const deleteSuggestion = (suggestion) => {
        if (!window.confirm('Are you sure you want to delete this suggestion?')) {
            return;
        }
        // Append the encrypted parameter
        const deleteUrl = `${route('music.destroy', suggestion.id)}?encrypted=${encodeURIComponent(encrypted)}`;
        router.delete(deleteUrl);
    }

    return (
        <WeddingLayout>
            <Head title="Music" />

            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-5xl p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    {success &&
                        <div className='bg-emerald-500 py-2 px-4 text-white rounded mb-4 text-center'>
                            {success}
                        </div>
                    }
                    <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">
                        Make Music Suggestions, {invite.name}!
                    </h1>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="artist" value="Artist" />
                            <TextInput
                                id="artist"
                                type="text"
                                name="artist"
                                value={data.artist}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                onChange={(e) => setData("artist", e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={errors.artist} className="mt-2 text-red-600 dark:text-red-400" />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                onChange={(e) => setData("title", e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2 text-red-600 dark:text-red-400" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                        <Link 
                            href={route("invite.wedding", { encrypted })}
                            className="text-blue-600 hover:underline me-5"
                        >
                            Wedding Website
                        </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 font-semibold bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Submit Suggestion
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Your Music Suggestions</h2>
                        {musicSuggestions.length > 0 ? (
                            <ul className="mt-4 space-y-2">
                                {musicSuggestions.map((suggestion) => (
                                    <li key={suggestion.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-md">
                                        {editing === suggestion.id ? (
                                            <form onSubmit={(e) => handleSaveEdit(e, suggestion)} className="flex flex-col space-y-2">
                                                <TextInput
                                                    type="text"
                                                    value={editData.artist}
                                                    onChange={(e) => setEditData("artist", e.target.value)}
                                                    className="block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                                                />
                                                <TextInput
                                                    type="text"
                                                    value={editData.title}
                                                    onChange={(e) => setEditData("title", e.target.value)}
                                                    className="block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                                                />
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        type="submit"
                                                        className="text-green-500 hover:text-green-700 focus:outline-none"
                                                    >
                                                        <CheckIcon className="w-6 h-6" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelEdit}
                                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                                    >
                                                        <XMarkIcon className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{suggestion.title}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.artist}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(suggestion)}
                                                        className="text-cyan-500 hover:text-cyan-700 focus:outline-none"
                                                    >
                                                        <PencilSquareIcon className="w-6 h-6" />
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => deleteSuggestion(suggestion)}
                                                        className="text-red-600 hover:text-red-800 focus:outline-none"
                                                    >
                                                        <TrashIcon className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-4 text-gray-700 dark:text-gray-400">You haven't made any music suggestions yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </WeddingLayout>
    );
}
