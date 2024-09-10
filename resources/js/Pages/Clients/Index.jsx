import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';

export default function Index({ auth, clients: initialClients }) {
    const [clients, setClients] = useState(initialClients.data || []);
    const [errors, setErrors] = useState({});

    const { data, setData, reset } = useForm({
        name: "",
        redirect: ""
    });

    const deleteClient = async (clientId) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                const response = await axios.delete(`https://thelakotadev.com/oauth/clients/${clientId}`);

                console.log('Delete response:', response);

                const updatedClients = clients.filter(client => client.id !== clientId);
                setClients(updatedClients);
                alert('Client deleted successfully.');
            } catch (error) {
                console.error('Failed to delete client:', error);
                alert('Failed to delete client.');
            }
        } else {
            // If the user clicks 'cancel' in the confirm dialog, do nothing
            console.log("Client deletion cancelled.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/oauth/clients', {
                name: data.name,
                redirect: data.redirect,
            });

            const newClient = {
                ...response.data,
                createdBy: {
                    name: auth.user.name
                }
            };

            setClients([...clients, newClient]);
            reset();
            setErrors({});
        } catch (error) {
            if (error.response) {
                // Here we check if the error response has specific field errors
                const fieldErrors = error.response.data.errors;
                const message = error.response.data.message;
                setErrors({ general: message, ...fieldErrors });
            } else {
                // This handles unexpected errors that may not come from axios
                setErrors({ general: error.message });
            }
            console.error('Error creating client:', error.response ? error.response.data : error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Clients</h2>
                </div>
            }
        >
            <Head title="Clients" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <React.Fragment>
                            <div className="max-w-full overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-nowrap">
                                                Client ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Secret
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Redirect URI
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Array.isArray(clients) && clients.map((client) => (
                                            <tr key={client.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.secret}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.redirect}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => deleteClient(client.id)} className="text-red-600 hover:text-red-900">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </React.Fragment>
                    </div>
                    <div className="mt-3 p-6 bg-white border-b border-gray-200">
                        {errors.general && (
                            <div className="bg-red-500 text-white text-center p-3 mb-3">
                                {errors.general}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputLabel htmlFor="name" value="Client Name" />
                                <TextInput 
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    placeholder="My Client"
                                    className="block mt-1 w-full border-gray-300"
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="redirect" value="Redirect URI" />
                                <TextInput
                                    id="redirect"
                                    type="text"
                                    name="redirect"
                                    value={data.redirect}
                                    placeholder="https://my-url.com/callback"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("redirect", e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mt-3">Create Client</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}