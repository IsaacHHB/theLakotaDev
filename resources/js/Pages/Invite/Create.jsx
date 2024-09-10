import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from 'react';

export default function Create({ auth, events }) {
    const [errors, setErrors] = useState({});

    const { data, setData, post, reset } = useForm({
        event_id: '',
        invites: [],
    });

    const handleInputChange = (key, value) => {
        setData(key, value);
    };

    const handleInviteChange = (index, key, value) => {
        const newInvites = [...data.invites];
        newInvites[index][key] = key === 'plus_one' ? (value === '1') : value;
        setData('invites', newInvites);
    };

    const removeInvite = (index) => {
        const newInvites = data.invites.filter((_, i) => i !== index);
        setData('invites', newInvites);
    };

    const addInvite = () => {
        const newInvites = [...data.invites, {
            name: '',
            email: '',
            plus_one: false,
            plus_one_name: '',
            lock_plus_one: false,
        }];
        setData('invites', newInvites);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('event-invite.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => setErrors(errors),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">Create Invites</h2>}
        >
            <Head title="Create Invites" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg space-y-6">
                            <div className="mt-4">
                                <InputLabel htmlFor="event_id" value="Select Event" />
                                <SelectInput
                                    name="event_id"
                                    id="event_id"
                                    className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                    onChange={(e) => handleInputChange('event_id', e.target.value)}
                                >
                                    <option value="">Select an Event</option>
                                    {events.map(event => (
                                        <option key={event.id} value={event.id}>
                                            {event.title}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.event_id} className="mt-2" />
                            </div>

                            {data.invites.map((invite, index) => (
                                <div key={index} className="mt-4 border-t pt-4 relative space-y-4">
                                    <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">Invite {index + 1}</h3>
                                    <button 
                                        type="button" 
                                        className="absolute top-0 right-0 mt-5 mr-2 text-red-600 text-xl"
                                        onClick={() => removeInvite(index)}
                                    >
                                        <FaTrash />
                                    </button>
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor={`name_${index}`} value="Name" />
                                            <TextInput
                                                id={`name_${index}`}
                                                type="text"
                                                name={`name_${index}`}
                                                value={invite.name}
                                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                                onChange={(e) => handleInviteChange(index, 'name', e.target.value)}
                                            />
                                            <InputError message={errors[`invites.${index}.name`]} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor={`email_${index}`} value="Email" />
                                            <TextInput
                                                id={`email_${index}`}
                                                type="email"
                                                name={`email_${index}`}
                                                value={invite.email}
                                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                                onChange={(e) => handleInviteChange(index, 'email', e.target.value)}
                                            />
                                            <InputError message={errors[`invites.${index}.email`]} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor={`plus_one_${index}`} value="Plus One" />
                                            <SelectInput
                                                name={`plus_one_${index}`}
                                                id={`plus_one_${index}`}
                                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                                value={invite.plus_one ? '1' : '0'}
                                                onChange={(e) => handleInviteChange(index, 'plus_one', e.target.value)}
                                            >
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>
                                            </SelectInput>
                                            <InputError message={errors[`invites.${index}.plus_one`]} className="mt-2" />
                                        </div>
                                        {invite.plus_one && (
                                            <div>
                                                <InputLabel htmlFor={`plus_one_name_${index}`} value="Plus One Name" />
                                                <TextInput
                                                    id={`plus_one_name_${index}`}
                                                    type="text"
                                                    name={`plus_one_name_${index}`}
                                                    value={invite.plus_one_name}
                                                    className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                                    onChange={(e) => handleInviteChange(index, 'plus_one_name', e.target.value)}
                                                />
                                                <InputError message={errors[`invites.${index}.plus_one_name`]} className="mt-2" />
                                            </div>
                                        )}
                                        {invite.plus_one && (
                                            <div className="flex items-center mt-4">
                                                <input
                                                    id={`lock_plus_one_${index}`}
                                                    type="checkbox"
                                                    name={`lock_plus_one_${index}`}
                                                    checked={invite.lock_plus_one}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                    onChange={(e) => handleInviteChange(index, 'lock_plus_one', e.target.checked)}
                                                />
                                                <InputLabel htmlFor={`lock_plus_one_${index}`} value="Lock Plus One" className="ml-2" />
                                                <InputError message={errors[`invites.${index}.lock_plus_one`]} className="ml-2" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 py-2 px-4 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ease-in-out"
                                    onClick={addInvite}
                                    aria-label="Add Invite"
                                >
                                    <FaPlus className="mr-2" />
                                    <span>Add Invite</span>
                                </button>
                            </div>
                            <div className="mt-4 text-right">
                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
