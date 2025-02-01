import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  console.log(JSON.stringify(data, null, 2))
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <LogoutButton />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                src={data.user.user_metadata.avatar_url} 
                alt={data.user.user_metadata.full_name}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {data.user.user_metadata.full_name}
                </h2>
                <p className="text-sm text-gray-600">{data.user.email}</p>
              </div>
            </div>

            <div className="grid gap-4 border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Account ID</p>
                  <p className="text-sm text-gray-900">{data.user.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider</p>
                  <p className="text-sm text-gray-900 capitalize">{data.user.app_metadata.provider}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created At</p>
                  <p className="text-sm text-gray-900">
                    {new Date(data.user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Sign In</p>
                  <p className="text-sm text-gray-900">
                    {new Date(data.user.last_sign_in_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}