"use client";

// import { useState } from "react";
// Run: npx shadcn-ui@latest add card
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/user";

import AuthInput from "./AuthInput";

function AuthForm() {
  const { toast } = useToast();
  const { me, setMe, setSignedIn } = useUser();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!me) {
      toast({
        title: "Error",
        description: "Username required!",
        variant: "destructive",
        color: "red",
      });
      return;
    } else {
      toast({
        title: "Success",
        description: "Login Successfully!",
        color: "green",
      });
      setSignedIn(true);
      router.push("/chats");
    }
  };

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <AuthInput label="Name" type="name" value={me} setValue={setMe} />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default AuthForm;
