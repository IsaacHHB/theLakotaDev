import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import Pagination from '@/Components/Pagination';
import ActionsDropdown from '@/Components/ActionsDropdown';

export default function Show ({ auth, event, invites, queryParams = null}) {

    queryParams = queryParams || {};

    const searchFieldChanged = (title, value) => {
        if(value) {
            queryParams[title] = value;
        } else {
            delete queryParams[title];
        }

        router.get(route('event.index', queryParams));
    }

    const onKeyPress = (title, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(title, e.target.value);
    }

    const sortChanged = (name) => {

        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('event.index', queryParams));
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Event "${event.title}"`}</h2>
                    <Link href={route("event.edit", event.id)} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Edit</Link>
                </div>
            }
        >
            <Head title={`Event "${event.title}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-3xl font-bold mb-6 text-center">{event.title}</h2>
                            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                                <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-semibold mb-4">Event Details</h3>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Location</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.location}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Street Address 1</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.street_address1}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Street Address 2</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.street_address2}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">City</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.city}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">State</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.state}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Zip Code</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.zip_code}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Date</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Start Time</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.start_time}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">End Time</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.end_time}</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-semibold mb-4">Additional Info</h3>
                                    <div className="mt-2">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.createdBy.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created At</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated At</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.updated_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{event.updatedBy.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Food Options</label>
                                        <ul className="mt-1 list-disc list-inside text-gray-600 dark:text-gray-300">
                                            {event.foodOptions.map((option) => (
                                                <li key={option.id}>{option.main_course}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                                <h3 className="font-bold text-2xl">Event Description</h3>
                                <p className="mt-1 text-gray-600 dark:text-gray-300">{event.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-5 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading 
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            > 
                                                Name
                                            </TableHeading>
                                            <TableHeading 
                                                name="email"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            > 
                                                Email
                                            </TableHeading>
                                            <TableHeading 
                                                name="type"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            > 
                                                Attending
                                            </TableHeading>
                                            <TableHeading 
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            > 
                                                Plus One
                                            </TableHeading>
                                            <th className="px-3 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">
                                                <TextInput 
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="Name"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invites.data.map((invite) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={invite.id}>
                                                <td className="px-3 py-2 dark:text-gray-100 text-nowrap">
                                                        {invite.name}
                                                </td>
                                                <td className="px-3 py-2 dark:text-gray-100 text-nowrap">
                                                        {invite.email}
                                                </td>
                                                <td className="px-3 py-2">{invite.is_attending}</td>
                                                <td className="px-3 py-2 text-nowrap">{invite.plus_one}</td>
                                                <td className="px-3 py-2 text-end text-nowrap">
                                                    <Link href={route('invite.sendInviteEmail', invite.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                        Send Invite
                                                    </Link>
                                                    <button 
                                                        onClick={e => deleteInvite(invite)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                            Delete
                                                    </button>
                                                    {/* <ActionsDropdown 
                                                        customActions={[
                                                            {
                                                                type: 'link',
                                                                href: route('invite.sendInviteEmail', invite.id),
                                                                text: 'Send Invite Emails',
                                                                textColor: 'text-gray-800 dark:text-gray-300',
                                                                activeBgColor: 'bg-gray-100 dark:bg-gray-800',
                                                                disabled: event.invite_count === 0
                                                            },
                                                            {
                                                                type: 'button',
                                                                onClick: () => deleteEvent(invite),
                                                                text: 'Delete',
                                                                textColor: 'text-red-600 dark:text-red-500',
                                                                activeBgColor: 'bg-gray-100 dark:bg-gray-800'
                                                            }
                                                        ]}
                                                    /> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={invites.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}