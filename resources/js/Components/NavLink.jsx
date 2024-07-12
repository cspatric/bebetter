import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'ml-6 w-52 p-3 rounded-lg flex gap-2 items-center justify-start cursor-pointer text-lg font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-white focus:border-indigo-700 '
                    : 'border-transparent text-[#bea0ed] hover:border-gray-300 focus:border-gray-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
