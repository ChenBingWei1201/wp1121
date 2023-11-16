"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function SignOutPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    router.push("/");
    toast({
      title: "Success",
      description: "Sign out successfully!",
      color: "green",
    });
  }, [session, router, toast]);

  return <></>;
}

export default SignOutPage;
