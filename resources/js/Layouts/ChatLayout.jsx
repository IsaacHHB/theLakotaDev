import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});

    console.log('conversations from props:', page.props);

    const isUserOnline = (userId) => onlineUsers[userId];

    console.log(conversations);
    console.log(selectedConversation);

    useEffect(() => {
        if (Array.isArray(localConversations)) {
            setSortedConversations(
                localConversations.sort((a, b) => {
                    if (a.blocked_at && b.blocked_at) {
                        return a.blocked_at > b.blocked_at ? 1 : -1;
                    } else if (a.blocked_at) {
                        return 1;
                    } else if (b.blocked_at) {
                        return -1;
                    }
    
                    if (a.last_message_date && b.last_message_date) {
                        return b.last_message_date.localeCompare(a.last_message_date);
                    } else if (a.last_message_date) {
                        return -1;
                    } else if (b.last_message_date) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            );
        } else {
            console.warn('localConversations is not an array:', localConversations);
        }
    }, [localConversations]);

    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        Echo.join('online')
            .here((users) => {
                const onlineUsersObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );

                setOnlineUsers((prevOnlineUsers) => {
                    return {...prevOnlineUsers, ...onlineUsersObj};
                });
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = {...prevOnlineUsers};
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = {...prevOnlineUsers};
                    delete updatedUsers[user.id];
                    return updatedUsers;
                });
            }).error((error) => {
                console.error('error', error);
            });

        return () => {
            Echo.leave('online');
        }
    }, []);

    return(
        <>
            ChatLayout
            <div>
                {children}
            </div>
        </>
    );
}

export default ChatLayout;