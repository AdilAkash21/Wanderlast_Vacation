import MyBookingCard from '@/components/mybookings/BookingsCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import { apiUrl } from '@/lib/api-url';

export const dynamic = 'force-dynamic';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    // const {data: tokenData} = await authClient.token()
    const user = session?.user;

    if (!user?.id) {
        return (
            <div className='container mx-auto flex justify-center items-center flex-col py-20'>
                <p className='text-center text-lg font-medium text-gray-200'>
                    Please log in to view your bookings.
                </p>
            </div>
        );
    }

    const res = await fetch(apiUrl(`/api/booking/${user.id}`), {
        headers: {
            'Content-Type': 'application/json',
            cookie: (await headers()).get('cookie') || '',
        }
    });
    const data = await res.json();

    return (
        <div className='container mx-auto flex justify-center items-center flex-col'>
            <MyBookingCard data={data} />
        </div>
    );
};

export default MyBookingPage;