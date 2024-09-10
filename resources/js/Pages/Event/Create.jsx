import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from 'react';

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        user_id1: auth.user.id,
        type: "",
        title: "",
        description: "",
        location: "",
        street_address1: "",
        street_address2: "",
        city: "",
        state: "",
        zip_code: "",
        start_time: "",
        end_time: "",
        date: "",
        invite_cutoff: "",
        food_options: [],
    });

    const [foodInput, setFoodInput] = useState("");
    const [foodOptions, setFoodOptions] = useState([]);

    const handleFoodInputChange = (e) => {
        setFoodInput(e.target.value);
    };

    const addFoodOption = () => {
        if (foodInput.trim() !== "") {
            setFoodOptions((prev) => [...prev, foodInput]);
            setFoodInput("");
            setData("food_options", [...foodOptions, foodInput]);
        }
    };

    const updateFoodOption = (index, value) => {
        const newOptions = [...foodOptions];
        newOptions[index] = value;
        setFoodOptions(newOptions);
        setData("food_options", newOptions);
    };

    const removeFoodOption = (index) => {
        const newOptions = foodOptions.filter((_, i) => i !== index);
        setFoodOptions(newOptions);
        setData("food_options", newOptions);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("event.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Event</h2>}
        >
            <Head title="Create Event" />
            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Event</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="type" value="Event Type" />
                                    <SelectInput
                                        name="type"
                                        id="type"
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("type", e.target.value)}
                                    >
                                        <option value="">Select Event Type</option>
                                        <option value="wedding">Wedding</option>
                                        <option value="birthday">Birthday</option>
                                        <option value="family-reunion">Family Reunion</option>
                                        <option value="anniversary">Anniversary</option>
                                        <option value="other">Other</option>
                                    </SelectInput>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        isFocused={true}
                                        onChange={(e) => setData("title", e.target.value)}
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="description" value="Event Description" />
                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("description", e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="location" value="Location Name" />
                                    <TextInput
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={data.location}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("location", e.target.value)}
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="street_address1" value="Street Address 1" />
                                    <TextInput
                                        id="street_address1"
                                        type="text"
                                        name="street_address1"
                                        value={data.street_address1}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("street_address1", e.target.value)}
                                    />
                                    <InputError message={errors.street_address1} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="street_address2" value="Street Address 2" />
                                    <TextInput
                                        id="street_address2"
                                        type="text"
                                        name="street_address2"
                                        value={data.street_address2}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("street_address2", e.target.value)}
                                    />
                                    <InputError message={errors.street_address2} className="mt-2" />
                                </div>

                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <InputLabel htmlFor="city" value="City" />
                                        <TextInput
                                            id="city"
                                            type="text"
                                            name="city"
                                            value={data.city}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                            onChange={(e) => setData("city", e.target.value)}
                                        />
                                        <InputError message={errors.city} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="state" value="State" />
                                        <SelectInput
                                            name="state"
                                            id="state"
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                            value={data.state}
                                            onChange={(e) => setData("state", e.target.value)}
                                        >
                                            <option value="">Select State</option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </SelectInput>
                                        <InputError message={errors.state} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="zip_code" value="Zip Code" />
                                        <TextInput
                                            id="zip_code"
                                            type="text"
                                            name="zip_code"
                                            value={data.zip_code}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                            onChange={(e) => setData("zip_code", e.target.value)}
                                        />
                                        <InputError message={errors.zip_code} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <InputLabel htmlFor="start_time" value="Start Time" />
                                    <TextInput
                                        id="start_time"
                                        type="time"
                                        name="start_time"
                                        value={data.start_time}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("start_time", e.target.value)}
                                    />
                                    <InputError message={errors.start_time} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="end_time" value="End Time" />
                                    <TextInput
                                        id="end_time"
                                        type="time"
                                        name="end_time"
                                        value={data.end_time}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("end_time", e.target.value)}
                                    />
                                    <InputError message={errors.end_time} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="date" value="Event Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("date", e.target.value)}
                                    />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="invite_cutoff" value="Invite Cutoff Date" />
                                    <TextInput
                                        id="invite_cutoff"
                                        type="date"
                                        name="invite_cutoff"
                                        value={data.invite_cutoff}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        onChange={(e) => setData("invite_cutoff", e.target.value)}
                                    />
                                    <InputError message={errors.invite_cutoff} className="mt-2" />
                                </div>
                            </div>
                        

                            <div>
                                <InputLabel htmlFor="food_input" value="Add Food Choice" />
                                <div className="flex mt-1">
                                    <TextInput
                                        name="food_input"
                                        id="food_input"
                                        className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        value={foodInput}
                                        onChange={handleFoodInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={addFoodOption}
                                        className="ml-2 px-3 py-2 bg-emerald-500 text-white rounded-md shadow-sm hover:bg-emerald-600"
                                    >
                                        Add
                                    </button>
                                </div>
                                <InputError message={errors.food_input} className="mt-2" />
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Food Choices</h4>
                                <ul className="mt-2 space-y-2">
                                    {foodOptions.map((food, index) => (
                                        <li key={index} className="flex items-center space-x-2">
                                            <TextInput
                                                name={`food_option_${index}`}
                                                value={food}
                                                onChange={(e) => updateFoodOption(index, e.target.value)}
                                                className="flex-grow border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFoodOption(index)}
                                                className="px-3 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6 text-right">
                                <Link
                                    href={route("user.index")}
                                    className="bg-gray-100 py-2 px-4 text-gray-800 rounded-md shadow-sm transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-emerald-500 py-2 px-4 text-white rounded-md shadow-sm transition-all hover:bg-emerald-600"
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