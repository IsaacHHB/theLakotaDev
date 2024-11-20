import { Fragment, useState } from 'react';
import {
    PhotoIcon,
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon,
    PaperClipIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";
import NewMessageInput from '@/Components/App/NewMessageInput';
import EmojiPicker from 'emoji-picker-react';
import { Popover, Transition } from '@headlessui/react'
import axios from 'axios';

const MessageInput = ({ conversation = null }) => {
    const [newMessage, setNewMessage] = useState('');
    const [inputErrorMessages, setInputErrorMessages] = useState("");
    const [messageSending, setMessageSending] = useState(false);
    const [chosenFiles, setChosenFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onFileChange = (e) => {
        setChosenFiles(e.target.files);

        const updatedFiles = [...files].map((file) => {
            return {
                file:file,
                url: URL.createObjectURL(file),
            };
        });

        setChosenFiles((prevFiles) => {
            return [...prevFiles, ...updatedFiles];
        });
    };

    const onSendClick = () => {
        if (messageSending) {
            return;
        }
        if (newMessage.trim() === "") {
            setInputErrorMessages("Please proved a message or upload attachments.");

            setTimeout(() => {
                setInputErrorMessages("");
            }, 3000);
            return;
        }

        const formData = new FormData();

        chosenFiles.forEach((file) => {
            formData.append('attachments[]', file.file);
        });

        formData.append('message', newMessage);

        if(conversation.is_user){
            formData.append('receiver_id', conversation.id);
        } else if (conversation.is_group) {
            formData.append('group_id', conversation.id);
        }

        setMessageSending(true);
        axios.post(route('message.store'), formData, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                );
                console.log(progress);
                setUploadProgress(progress);
            }
        }).then((response) => {
            setNewMessage('');
            setMessageSending(false);
            setUploadProgress(0);
            setChosenFiles([]);
        }).catch((error) => {
            setMessageSending(false);
            setChosenFiles([]);
            const message = error?.response?.data?.message;
            setInputErrorMessages(
                message || "An error occurred while sending the message."
            );
        });

    };

    const onLikeClick = () => {
        if (messageSending) {
            return;
        }

        const data = {
            message: '👍'
        };

        if(conversation.is_user){
            data['receiver_id'] = conversation.id;
        } else if (conversation.is_group) {
            data['group_id'] = conversation.id;
        }

        axios.post(route('message.store'), data);
    };


    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
            <div className="order-2 flex-1 xs:flex-none xs:order-1 p-2">
                <button className='p-1 text-gray-400 hover:text-gray-300 relative'>
                    <PaperClipIcon className="w-6" />
                    <input 
                        type='file'
                        multiple
                        className='absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer'
                    />
                </button>
                <button className='p-1 text-gray-400 hover:text-gray-300 relative'>
                    <PhotoIcon className='w-6' />
                    <input 
                        type='file'
                        multiple
                        accept='image/*'
                        className='absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer'
                    />
                </button>
            </div>
            <div className='order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative'>
                <div className='flex '>
                    <NewMessageInput
                        value={newMessage}
                        onSend={onSendClick}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />

                    <button 
                        onClick={onSendClick}
                        className='btn btn-info rounded-l-none'
                        disabled={messageSending}
                    >
                        <PaperAirplaneIcon className='w-6' />
                        <span className='hidden sm:inline'>Send</span>
                    </button>
                </div>
                {!!uploadProgress && (
                    <progress
                        className='progress progress-info w-56'
                        value={uploadProgress}
                        max='100'
                    ></progress>
                )}
                {inputErrorMessages && (
                    <div className='text-red-400 text-xs mt-1'>
                        {inputErrorMessages}
                    </div>
                )}
                <div className='flex flex-wrap gap-1 mt-2'>
                    {chosenFiles.map((file) => (
                        <div 
                            key={file.file.name} 
                            className={
                                `relative flex justify-between cursor-pointer ` +
                                (!isImage(file.file) ? " w-[240px]" : "")
                            }
                        >
                            {isImage(file.file) && (
                                <img
                                    src={file.url}
                                    alt={file.file.name}
                                    className='w-16 h-16 object-cover'
                                />
                            )}
                            {isAudio(file.file) && (
                                <CustomAudioPlayer
                                    src={file}
                                    showVolume={false}
                                />
                            )}
                            {!isImage(file.file) && !isAudio(file.file) && (
                                <AttachmentPreview file={file} />
                            )}

                            <button
                                onClick={() =>
                                    setChosenFiles(
                                        chosenFiles.filter(
                                            (f) => 
                                                f.file.name !== file.file.name
                                        )
                                    )
                                }
                                className="absolute w-6 h-6 rounded-full bg-gray-800 -right-2 -top-2 text-gray-300 hover:text-gray-100 z-10"
                            >
                                <XCircleIcon className="w-6" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* <EmojiPicker /> */}
            <div className='order-3 xs:order-3 p-2 flex'>
                <Popover className='relative'>
                    <Popover.Button className='p-1 text-gray-400 hover:text-gray-300'>
                        <FaceSmileIcon className='w-6 h-6' />
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 right-0 bottom-full">
                        <EmojiPicker
                            theme='dark'
                            onEmojiClick={(e) => 
                                setNewMessage(newMessage + e.emoji)
                            }
                        />
                    </Popover.Panel>
                </Popover>
                <button onClick={onLikeClick} className='p-1 text-gray-400 hover:text-gray-300'>
                    <HandThumbUpIcon className='w-6 h-6' />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;