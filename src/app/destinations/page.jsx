import DestinationCard from '@/components/destinations/DestinationCard';
import { apiUrl } from '@/lib/api-url';

export const dynamic = 'force-dynamic';

const DestinationPage = async () => {
    const res = await fetch(apiUrl('/api/destination'),{
        method: 'GET'
    })
    const payload = await res.json();
    const Destinations = Array.isArray(payload) ? payload : [];
    console.log(Destinations.length);


    return (
        <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0f9f9a]">Find your way</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#173a3d] md:text-5xl">Destinations worth the journey</h1>
                        <p className="mt-4 max-w-2xl leading-7 text-[#5d7375]">From quiet coastlines to mountain escapes, discover thoughtfully selected trips for your next unforgettable story.</p>
                    </div>
                    <div className="rounded-2xl border border-[#dce9e7] bg-white px-4 py-3 text-sm font-semibold text-[#456164] shadow-sm">{Destinations.length} experiences</div>
                </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {
                    Destinations.map((destination) => (
                        <div key={destination._id}>
                            <DestinationCard destination={destination} />
                        </div>
                    ))
                }
            </div>
            </div>
        </main>
    );
};

export default DestinationPage;