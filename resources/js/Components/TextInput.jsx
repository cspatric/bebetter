import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'bg-[#f3f1ff] focus:border-purple-200 focus:ring-[#f3f1ff] rounded-2xl shadow-sm ' +
                className 
            }
            ref={input}
        />
    );
});
