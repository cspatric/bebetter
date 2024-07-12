import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div>
                <div className="bg-white flex min-h-screen items-start mx-auto sm:px-6 lg:px-8 relative">
                    <div className="bg-[#925fe2] h-64 w-full overflow-hidden shadow-sm sm:rounded-lg mt-3 flex">
                        <div className="p-6 text-gray-900">Works</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
