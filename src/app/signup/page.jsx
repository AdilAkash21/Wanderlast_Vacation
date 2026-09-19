import { SignUpForm } from '@/components/signup/SignUpForm';
import React from 'react';

const SignUpPage = () => {
    return (
        <main className="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
            <section className="auth-surface w-full max-w-md rounded-3xl border border-[#dce9e7] bg-white p-6 shadow-xl shadow-[#102a2e]/5 sm:p-8 md:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0f9f9a]">Begin anywhere</p>
                <h1 className="mt-3 text-3xl font-bold text-[#173a3d]">Create your Wanderlast account</h1>
                <p className="mt-3 text-sm leading-6 text-[#5d7375]">Save your favorite escapes and book your next adventure.</p>
                <SignUpForm />
            </section>
        </main>
    );
};

export default SignUpPage;