import Clock from '@/Components/Clock';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Report" />

            <div>
                <div className="bg-white flex min-h-screen items-start mx-auto sm:px-6 lg:px-8 relative">
                    <div className="bg-red-800 h-64 overflow-hidden shadow-sm sm:rounded-lg mt-3">
                        <div className="p-6 text-gray-900"><Clock /></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
