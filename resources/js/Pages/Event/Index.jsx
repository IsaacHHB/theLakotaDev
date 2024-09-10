import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import Pagination from '@/Components/Pagination';
import TableHeading from '@/Components/TableHeading';
import ActionsDropdown from '@/Components/ActionsDropdown';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, events, queryParams = null, success }) {

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

    const deleteEvent = (event) => {
        if(!window.confirm('Are you sure you want to delete this event?')) {
            return;
        }
        router.delete(route('event.destroy', event.id));

    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight">Event Manager</h2>
                    <div>
                        <Link href={route("event.create")} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Create Event</Link>
                        {events.data.length > 0 && 
                            <Link href={route("event-invite.create")} className="bg-purple-500 py-1 px-3 m-2 text-white rounded shadow transition-all hover:bg-purple-600">Create Invites</Link>
                        }
                    </div>

                </div>
            }
        >

            <Head title="Event Manager" />


            <div className="py-12">
                {/* {JSON.stringify(events)} */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success &&
                        <div className='bg-emerald-500 py-2 px-4 text-white rounded mb-4 text-center'>
                            {success}
                        </div>
                    }
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading 
                                                name="title"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            > 
                                                Title
                                            </TableHeading>
                                            <TableHeading 
                                                name="type"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            > 
                                                Event Type
                                            </TableHeading>
                                            <TableHeading 
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            > 
                                                Create Date
                                            </TableHeading>
                                            <th className="px-3 py-3 text-center">Invites Created</th>
                                            <th className="px-3 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">
                                                <TextInput 
                                                    className="w-full"
                                                    defaultValue={queryParams.title}
                                                    placeholder="Title"
                                                    onBlur={e => searchFieldChanged('title', e.target.value)}
                                                    onKeyPress={e => onKeyPress('title', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.data.map((event) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={event.id}>
                                                <td className="px-3 py-2 dark:text-gray-100 text-nowrap">
                                                    <Link href={route('event.show', event.id)}>
                                                        {event.title}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2">{event.type}</td>
                                                <td className="px-3 py-2 text-nowrap">{event.date}</td>
                                                <td className="px-3 py-2 text-center">{event.invite_count}</td>
                                                <td className="px-3 py-2 text-end text-nowrap">
                                                    <ActionsDropdown 
                                                        customActions={[
                                                            {
                                                                type: 'link',
                                                                href: route('events.sendInviteEmails', event.id),
                                                                text: 'Send Invite Emails',
                                                                textColor: 'text-gray-800 dark:text-gray-300',
                                                                activeBgColor: 'bg-gray-100 dark:bg-gray-800',
                                                                disabled: event.invite_count === 0
                                                            },
                                                            {
                                                                type: 'link',
                                                                href: route('event-invite.edit', event.id),
                                                                text: 'Invites',
                                                                textColor: 'text-gray-800 dark:text-gray-300',
                                                                activeBgColor: 'bg-gray-100 dark:bg-gray-800',
                                                                disabled: event.invite_count === 0
                                                            },
                                                            {
                                                                type: 'link',
                                                                href: route('event.edit', event.id),
                                                                text: 'Edit',
                                                                textColor: 'text-blue-600 dark:text-blue-500',
                                                                activeBgColor: 'bg-gray-100 dark:bg-gray-800'
                                                            },
                                                            {
                                                                type: 'button',
                                                                onClick: () => deleteEvent(event),
                                                                text: 'Delete',
                                                                textColor: 'text-red-600 dark:text-red-500',
                                                                activeBgColor: 'bg-gray-100 dark:bg-gray-800'
                                                            }
                                                        ]}
                                                    />
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={events.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}