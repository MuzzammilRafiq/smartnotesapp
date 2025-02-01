import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import ErrorPage from "../../error/page";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}