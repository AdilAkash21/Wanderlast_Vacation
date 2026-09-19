'use client';
import React from 'react';
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { useRouter } from 'next/navigation';
const LoginPageForm = () => {
      const router = useRouter();
      const onSubmit = async (e) => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            console.log(formData);
            const {data, error } = await authClient.signIn.email({
                    ...formData, 
            })
            console.log(data, error);
            if(data)
            {
                router.push("/");
            }
            if(!data){
                alert(error.message)
            }
            
        };
        const handleGoogleSignIn = async () => {
                const {data, error } = await authClient.signIn.social(
                    {
                        provider: "google",
                    }
                )
                if(data)
                {
                    router.push("/");
                }
                if(!data){
                    alert(error.message)
                }
        
            }
    return (
        <>
            <Form
                className="mx-auto my-8 flex w-full flex-col gap-5"
                render={(props) => <form {...props} data-custom="foo" />}
                onSubmit={onSubmit}
            >
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }

                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button className="w-full rounded-full border border-white/60 bg-white/30 px-5 py-3 font-bold text-black transition-colors duration-300 hover:border-[#0f9f9a] hover:bg-[#0f9f9a] hover:text-white" onSubmit={onSubmit} type="submit">
                        <Check />
                        Login
                    </Button>
                </div>
            </Form>
            <div className="my-4 text-center text-sm font-semibold uppercase tracking-widest text-[#8aa3a0]">or continue with</div>
                    <Separator />
                    <div className="flex gap-2 justify-center">
                        <Button onClick={handleGoogleSignIn} className="w-full rounded-full border border-white/60 bg-white/30 px-5 py-2 text-sm font-semibold text-black transition-colors duration-300 hover:border-[#0f9f9a] hover:bg-[#0f9f9a] hover:text-white">
                            Continue with Google
                        </Button>
            
                    </div>
        </>
    );
};

export default LoginPageForm;