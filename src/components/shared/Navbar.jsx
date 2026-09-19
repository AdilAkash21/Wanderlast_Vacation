'use client';

import { Avatar, Button } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const signOut = async () => await authClient.signOut();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
    const navLinkClass = (href) => isActive(href)
        ? 'relative inline-flex overflow-hidden rounded-full bg-white/70 px-4 py-2 text-[#08726f] shadow-sm'
        : 'group relative inline-flex overflow-hidden rounded-full px-4 py-2 text-black';
    const navLinkContent = (href, label) => (
        <>
            <span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#08726f]">{label}</span>
        </>
    );

    return (
        <nav aria-label="Main navigation" className="fixed left-1/2 top-0 z-50 h-[90px] w-full max-w-[1280px] -translate-x-1/2 rounded-b-2xl border border-white/45 bg-[#0f9f9a]/75 shadow-xl shadow-black/10 backdrop-blur-2xl backdrop-saturate-150">
            <div className="relative mx-auto flex h-full w-full items-center justify-between px-3 lg:px-5">
                <button
                    type="button"
                    aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="rounded-full border border-white/70 bg-white/40 px-3 py-2 text-sm font-semibold text-black hover:bg-white/80 md:hidden"
                >
                    {menuOpen ? 'Close' : 'Menu'}
                </button>
                <ul className="hidden items-center gap-1 rounded-full border border-white/60 bg-white/30 p-1 text-sm font-semibold text-black md:flex">
                    <li><Link href="/" className={navLinkClass('/')}><span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" /><span className="relative z-10 transition-colors duration-300 group-hover:text-[#08726f]">Home</span></Link></li>
                    <li><Link href="/destinations" className={navLinkClass('/destinations')}><span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" /><span className="relative z-10 transition-colors duration-300 group-hover:text-[#08726f]">Destinations</span></Link></li>
                    <li><Link href="/my-bookings" className={navLinkClass('/my-bookings')}><span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" /><span className="relative z-10 transition-colors duration-300 group-hover:text-[#08726f]">My Bookings</span></Link></li>
                </ul>

                <Link href="/" aria-label="Wanderlast home" className="rounded-xl px-2 py-1 hover:bg-white/40 sm:px-3">
                    <Image src="/assets/Wanderlast.png" alt="Wanderlast" width={150} height={50} className="wanderlast-logo h-[42px] w-[126px] object-contain transition-[filter] duration-300 sm:h-[50px] sm:w-[150px]" loading="eager" />
                </Link>

                <ul className="flex items-center gap-1 rounded-full border border-white/60 bg-white/30 p-1 text-sm font-semibold text-black">
                    <li>
                        <Link href="/profile" className={`hidden sm:inline-flex ${navLinkClass('/profile')}`}>
                            {navLinkContent('/profile', 'Profile')}
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Avatar className="h-9 w-9 ring-2 ring-[#b9eeea]">
                                    <Avatar.Image alt={user.name ?? 'User'} src={user.image} referrerPolicy="no-referrer" />
                                    <Avatar.Fallback>{user.name?.charAt(0) || 'J'}</Avatar.Fallback>
                                </Avatar>
                            </li>
                            <li><Button className="rounded-full" variant="danger" onClick={signOut}>Logout</Button></li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/login" className={navLinkClass('/login')}>{navLinkContent('/login', 'Login')}</Link></li>
                            <li><Link href="/signup" className={navLinkClass('/signup')}>{navLinkContent('/signup', 'Sign Up')}</Link></li>
                        </>
                    )}
                </ul>
                {menuOpen && (
                    <div className="absolute left-3 right-3 top-[76px] rounded-2xl border border-white/70 bg-white/90 p-2 shadow-xl backdrop-blur-2xl md:hidden">
                        <Link onClick={() => setMenuOpen(false)} href="/" className={`${navLinkClass('/')} w-full justify-start`}>{navLinkContent('/', 'Home')}</Link>
                        <Link onClick={() => setMenuOpen(false)} href="/destinations" className={`${navLinkClass('/destinations')} w-full justify-start`}>{navLinkContent('/destinations', 'Destinations')}</Link>
                        <Link onClick={() => setMenuOpen(false)} href="/my-bookings" className={`${navLinkClass('/my-bookings')} w-full justify-start`}>{navLinkContent('/my-bookings', 'My Bookings')}</Link>
                        <Link onClick={() => setMenuOpen(false)} href="/profile" className={`${navLinkClass('/profile')} w-full justify-start`}>{navLinkContent('/profile', 'Profile')}</Link>
                        <Link onClick={() => setMenuOpen(false)} href="/login" className={`${navLinkClass('/login')} w-full justify-start`}>{navLinkContent('/login', 'Login')}</Link>
                        <Link onClick={() => setMenuOpen(false)} href="/signup" className={`${navLinkClass('/signup')} w-full justify-start`}>{navLinkContent('/signup', 'Sign Up')}</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
