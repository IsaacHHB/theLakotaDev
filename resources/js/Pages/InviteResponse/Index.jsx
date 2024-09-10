import WeddingLayout from '@/Layouts/WeddingLayout';
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";

export default function Index({ invite }) {

    const foodOptions = invite.foodOptions;


    const { data, setData, post, errors, reset } = useForm({
        name: invite.name || "",
        email: invite.email || "",
        is_attending: invite.is_attending || "",
        plus_one_attending: invite.plus_one_attending || false,
        plus_one_name: invite.plus_one_name || "",
        lock_plus_one: invite.lock_plus_one || false,
        food_preference: invite.food_preference || "",
        plus_one_food_preference: invite.plus_one_food_preference || "",
        dietary_restrictions: invite.dietary_restrictions || "",
        plus_one_dietary_restrictions: invite.plus_one_dietary_restrictions || "",
        message: invite.message || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const encrypted = invite.encrypted;

        const updateUrl = `${route("invite.update", invite.id)}?encrypted=${encodeURIComponent(encrypted)}`;

        post(updateUrl);
    };

    return (
        <WeddingLayout>
            <Head title="Event" />
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-5xl p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">Welcome to the Wedding {invite.name}!</h1>
                    <p className="text-xl font-bold text-center text-gray-700 dark:text-gray-200">Please enter your correct email so we can send you the wedding information.</p>
                    <form 
                        className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                        onSubmit={onSubmit}
                    >
                        <div className="col-span-1 md:col-span-2 flex flex-col">
                            <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2 text-red-600 dark:text-red-400" />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                onChange={(e) => setData("name", e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={errors.name} className="mt-2 text-red-600 dark:text-red-400" />
                        </div>

                        {invite.plus_one === 1 && (
                            <div className="flex flex-col">
                                <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="plus_one_name" value="Plus One Name" />
                                <TextInput
                                    id="plus_one_name"
                                    type="text"
                                    name="plus_one_name"
                                    readOnly={data.lock_plus_one}
                                    value={data.plus_one_name}
                                    className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                    onChange={(e) => setData("plus_one_name", e.target.value)}
                                />
                                <InputError message={errors.plus_one_name} className="mt-2 text-red-600 dark:text-red-400" />
                            </div>
                        )}

                        <div className="flex flex-col">
                            <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="is_attending" value="Are you attending?" />
                            <SelectInput
                                id="is_attending"
                                name="is_attending"
                                value={data.is_attending}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                onChange={(e) => setData("is_attending", e.target.value)}
                            >
                                <option value="">Select Attendance</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </SelectInput>
                            <InputError message={errors.is_attending} className="mt-2 text-red-600 dark:text-red-400" />
                        </div>

                        {invite.plus_one === 1 && (
                            <div className="flex flex-col">
                                <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="is_attending" value="Plus one attending?" />
                                <SelectInput
                                    id="plus_one_attending"
                                    name="plus_one_attending"
                                    value={data.plus_one_attending}
                                    className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                    onChange={(e) => setData("plus_one_attending", e.target.value)}
                                >
                                    <option value="">Select Attendance</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </SelectInput>
                                <InputError message={errors.plus_one_attending} className="mt-2 text-red-600 dark:text-red-400" />
                            </div>
                        )}

                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="food_preference" value="Food Preference" />
                                <SelectInput
                                    id="food_preference"
                                    name="food_preference"
                                    value={data.food_preference}
                                    className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                    onChange={(e) => setData({ ...data, food_preference: e.target.value })}
                                >
                                    <option value="">Select a food preference</option>
                                    {foodOptions.length === 0 ? (
                                        <option value="0">No food options provided</option>
                                    ) : (
                                        foodOptions.map((option) => (
                                            <option key={option.id} value={option.main_course}>
                                                {option.main_course}
                                            </option>
                                        ))
                                    )}
                                </SelectInput>
                                <InputError message={errors.food_preference} className="mt-2 text-red-600 dark:text-red-400" />
                            </div>

                            {invite.plus_one === 1 && (
                                <div className="flex flex-col">
                                    <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="plus_one_food_preference" value="Plus One Food Preference" />
                                    <SelectInput
                                        id="plus_one_food_preference"
                                        name="plus_one_food_preference"
                                        value={data.plus_one_food_preference}
                                        className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                        onChange={(e) => setData({ ...data, plus_one_food_preference: e.target.value })}
                                    >
                                        <option value="">Select a food preference</option>
                                        {foodOptions.map((option) => (
                                            <option key={option.id} value={option.main_course}>
                                                {option.main_course}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.plus_one_food_preference} className="mt-2 text-red-600 dark:text-red-400" />
                                </div>
                            )}
                        </div>
                        
                        <div className="col-span-1 md:col-span-2 flex flex-col">
                            <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="dietary_restrictions" value="Dietary Restrictions" />
                            <TextAreaInput
                                id="dietary_restrictions"
                                name="dietary_restrictions"
                                value={data.dietary_restrictions}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                onChange={(e) => setData("dietary_restrictions", e.target.value)}
                            />
                            <InputError message={errors.dietary_restrictions} className="mt-2 text-red-600 dark:text-red-400" />
                        </div>

                        {invite.plus_one === 1 && (
                            <div className="col-span-1 md:col-span-2 flex flex-col">
                                <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="plus_one_dietary_restrictions" value="Plus One Dietary Restrictions" />
                                <TextAreaInput
                                    id="plus_one_dietary_restrictions"
                                    name="plus_one_dietary_restrictions"
                                    value={data.plus_one_dietary_restrictions}
                                    className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                    onChange={(e) => setData("plus_one_dietary_restrictions", e.target.value)}
                                />
                                <InputError message={errors.plus_one_dietary_restrictions} className="mt-2 text-red-600 dark:text-red-400" />
                            </div>
                        )}

                        <div className="col-span-1 md:col-span-2 flex flex-col">
                            <InputLabel className="text-gray-700 dark:text-gray-200" htmlFor="message" value="Message" />
                            <TextAreaInput
                                id="message"
                                name="message"
                                value={data.message}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:focus:border-indigo-600 dark:focus:ring-indigo-500"
                                onChange={(e) => setData("message", e.target.value)}
                            />
                            <InputError message={errors.message} className="mt-2 text-red-600 dark:text-red-400" />
                        </div>

                        <div className="col-span-1 md:col-span-2 flex flex-col text-center items-center py-8 px-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
                            <h2 className="text-red-500 dark:text-red-500 text-4xl font-bold mb-4">Important!</h2>
                            <p className="text-gray-700 dark:text-gray-200 text-xl mb-4">
                                Once you confirm your attendance, you will receive an email with all the updated details. This email will include:
                            </p>
                            <ul className="text-gray-700 dark:text-gray-200 text-lg list-none mb-4 italic">
                                <li>A link to make music suggestions for our wedding playlist</li>
                                <li>A link to our wedding website with additional info</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-200 text-xl">
                                We're excited to celebrate with you and can't wait to see your music choices!
                            </p>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex items-center justify-end mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 font-semibold bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </WeddingLayout>
    );
}