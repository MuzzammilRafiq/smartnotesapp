import { createClient } from "~/utils/supabase/server"
import LogoutButton from "./LogoutButton"

export async function Header({ logout }: { logout: () => void }) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()

    return (
        <header className="bg-white border-b">
            <div className="mx-auto max-w-4xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={data.user?.user_metadata.avatar_url || "/placeholder.svg"}
                            alt={data.user?.user_metadata.full_name}
                            className="h-10 w-10 rounded-full"
                        />
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800">{data.user?.user_metadata.full_name}</h2>
                            <p className="text-xs text-gray-600">{data.user?.email}</p>
                        </div>
                    </div>
                    <LogoutButton logout={logout} />
                </div>
            </div>
        </header>
    )
}

