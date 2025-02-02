"use client";

import { Button } from "~/components/ui/button";

export default function LogoutButton({ logout }: { logout: () => void }) {
  return <Button onClick={() => logout()}>Logout</Button>;
}