"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

// Run: npx shadcn-ui@latest add card
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env/public";

import AuthInput from "./AuthInput";

function AuthForm() {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: sign in logic
    signIn("credentials", {
      username,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/chats`,
    });
  };

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <AuthInput
            label="Name"
            type="name"
            value={username}
            setValue={setUsername}
          />
        </form>
      </CardContent>
    </Card>
  );
}

export default AuthForm;
