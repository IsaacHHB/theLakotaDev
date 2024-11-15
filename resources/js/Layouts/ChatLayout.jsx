import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    console.log(conversations);
    console.log(selectedConversation);

    return(
        <AuthenticatedLayout>
            ChatLayout
            <div>
                {children}
            </div>
        </AuthenticatedLayout>
    );
}

export default ChatLayout;