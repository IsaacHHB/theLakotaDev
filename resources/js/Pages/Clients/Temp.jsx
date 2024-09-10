import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Pagination from '@/Components/Pagination';
import InputLabel from '@/Components/InputLabel';
import TableHeading from '@/Components/TableHeading';
import { Head, Link, router, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Index({ auth, clients }) {

    const { data, setData, post, errors, reset } = useForm({
        name: "",
        redirect: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/oauth/clients', {
                name: data.name,
                redirect: data.redirect,
            });
            console.log('Client created:', response.data);
        } catch (error) {
            console.error('Error creating client:', error.response.data || error.message);
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
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
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
                                            Created By
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clients.data.map((client) => (
                                        <tr key={client.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.secret}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.redirect}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.createdBy.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-3 p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputLabel 
                                    htmlFor="name" 
                                    value="Client Name" 
                                />
                                <TextInput 
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    placeholder="My Client"
                                    isFocused={true}
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
                            <div className="mt-4">
                                <button type="submit" className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Create Client</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}