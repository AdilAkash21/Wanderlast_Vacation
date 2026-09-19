import Link from 'next/link';
import { headers } from 'next/headers';

const ProfilePage = async () => {
    let user;

    if (process.env.MONGODB_URI) {
        try {
            const { auth } = await import('@/lib/auth');
            const session = await auth.api.getSession({
                headers: await headers(),
            });
            user = session?.user;
        } catch (error) {
            console.error('Unable to load the profile session.', error);
        }
    }

    if (!user) {
        return (
            <main className="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
                <section className="auth-surface w-full max-w-lg rounded-3xl border border-[#dce9e7] bg-white p-8 text-center shadow-xl shadow-[#102a2e]/5">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0f9f9a]">Your journey</p>
                    <h1 className="mt-3 text-3xl font-bold text-[#173a3d]">Your profile awaits</h1>
                    <p className="mt-3 text-[#5d7375]">Sign in to view your account details and keep planning your next escape.</p>
                    <Link className="mt-8 inline-flex rounded-full border border-white/60 bg-white/30 px-6 py-3 font-bold text-black transition-colors duration-300 hover:border-[#0f9f9a] hover:bg-[#0f9f9a] hover:text-white" href="/login">
                        Sign in
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
            <section className="auth-surface w-full max-w-lg rounded-3xl border border-[#dce9e7] bg-white p-6 text-[#173a3d] shadow-xl shadow-[#102a2e]/5 sm:p-10">
                <div className="border-b border-[#dce9e7] pb-6">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0f9f9a]">Your journey</p>
                    <h1 className="mt-3 text-3xl font-bold">Profile</h1>
                    <p className="mt-3 text-[#5d7375]">Manage the details connected to your Wanderlast account.</p>
                </div>
                <div className="mt-6 flex items-center gap-4 rounded-2xl border border-[#dce9e7] bg-[#f5fbfa] p-4">
                    {user.image ? <div className="h-14 w-14 rounded-full border-2 border-white bg-cover bg-center" role="img" aria-label={user.name || 'Profile photo'} style={{ backgroundImage: `url(${user.image})` }} /> : <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-[#08726f]">{user.name?.charAt(0) || 'U'}</div>}
                    <div>
                        <p className="font-bold">{user.name || 'Wanderlast traveler'}</p>
                        <p className="text-sm text-black/65">{user.email}</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProfilePage;
