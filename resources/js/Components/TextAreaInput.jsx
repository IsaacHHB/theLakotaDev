import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextAreaInput(
    { className = "", isFocused = false, children, ...props },
        ref
    ) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
        input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'border-gray-300 dark:border-gray-600 ' +
                'focus:border-indigo-500 dark:focus:border-indigo-600 ' +
                'focus:ring-indigo-500 dark:focus:ring-indigo-500 ' +
                'rounded-md shadow-sm ' +
                'bg-white dark:bg-gray-900 ' +
                'text-black dark:text-white ' +
                className
            }
            ref={input}
        >
        {children}
        </textarea>
    );
});