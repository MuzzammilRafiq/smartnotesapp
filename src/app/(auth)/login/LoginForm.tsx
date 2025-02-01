"use client";

import {
  Card,
  CardContent,
} from "~/components/ui/card";
import React from "react";
import GoogleSignin from "./GoogleSignin";

export default function LoginForm() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent className="flex flex-col items-center space-y-6 pt-6">
          <h1 className="text-2xl font-bold text-gray-900">Continue with Google</h1>
          <p className="text-gray-500 text-center">
            Login or Register with your google account to continue.
          </p>
          <GoogleSignin />
        </CardContent>
      </Card>
    </main>
  );
}