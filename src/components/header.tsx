// header.tsx
"use client"
import { createClient } from "~/utils/supabase/client"
import LogoutButton from "./LogoutButton"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

// Skeleton component
const HeaderSkeleton = () => (
    <header className="bg-white border-b animate-pulse">
        <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                        <div className="h-6 w-24 bg-gray-300 rounded"></div>
                        <div className="h-4 w-32 bg-gray-300 rounded mt-1"></div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-20 bg-gray-300 rounded"></div>
                    <div className="h-10 w-20 bg-gray-300 rounded"></div>
                    <div className="h-10 w-16 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    </header>
);


export function Header({ logout }: { logout: () => void }) {
    const pathname = usePathname()
    const isMarkdownPage = pathname === '/md'
    const [user, setUser] = useState<User | null>(null)
    const supabase = createClient()

    useEffect(() => {

        // Function to fetch the current session. This is called initially
        // and also within the auth state change listener.
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null); // Update the user state with the current user or null if no session
        };

        // Set up a listener for authentication state changes. This will be called
        // whenever the user logs in, logs out, or the session changes in any way.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null); // Update the user state whenever the auth state changes
            }
        );

        // Fetch the initial session when the component mounts. This ensures
        // the user state is correctly set even if the user already has a valid session.
        fetchSession();

        // Cleanup function. This is crucial to prevent memory leaks. It unsubscribes
        // from the auth state change listener when the component unmounts. This prevents
        // the listener from trying to update the state of an unmounted component, which
        // would cause an error.
        return () => subscription?.unsubscribe(); // Unsubscribe from the listener
    }, []);

    if (!user) return <HeaderSkeleton />; // Render skeleton while loading

    return (
        <header className="bg-white border-b">
            <div className="mx-auto max-w-4xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.user_metadata.avatar_url || "/placeholder.svg"}
                            alt={user.user_metadata.full_name}
                            className="h-10 w-10 rounded-full"
                        />
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800">{user.user_metadata.full_name}</h2>
                            <p className="text-xs text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {!isMarkdownPage && (
                            <a
                                href="/md"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                New Note
                            </a>
                        )}
                        <LogoutButton logout={logout} />
                    </div>
                </div>
            </div>
        </header>
    )
}