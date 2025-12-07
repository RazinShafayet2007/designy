"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof SignUpSchema>;

const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignUpSchema = z.object({
    firstname: z.string().min(2, 'First name must be at least 2 characters'),
    lastname: z.string().min(2, 'First name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const useAuth = () => {
    const { signIn, signOut } = useAuthActions();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const signInForm = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const signUpForm = useForm<SignUpData>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        },
    })

    const handleSignIn = async (data: SignInData) => {
        setIsLoading(true);
        try {
            await signIn('password', {
                email: data.email,
                password: data.password,
                flow: 'signIn',
            })
            router.push('/dashboard')
        } catch(error) {
            console.error(error)
            signInForm.setError('password', {
                message: 'Invalid email or password',
            })
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignUp = async (data: SignUpData) => {
        setIsLoading(true);
        try {
            await signIn('password', {
                email: data.email,
                password: data.password,
                name: `${data.firstname} ${data.lastname}`,
                flow: 'signUp',
            })
            router.push('/dashboard')
        } catch(error) {
            console.error("Sign Up error:", error)
            signUpForm.setError('root', {
                message: 'Failed to create account. Email may already exist.',
            })
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut()
            router.push('/auth/sign-in');
        } catch (error) {
            console.error("Sign Out error:", error)
        }
    }

    return {
        signInForm,
        signUpForm,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        isLoading,
    }
}