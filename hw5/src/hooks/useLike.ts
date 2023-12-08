import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useLike() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const likeTweet = async ({
    eventId,
    userHandle,
  }: {
    eventId: number;
    userHandle: string;
  }) => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/joins", {
      method: "POST",
      body: JSON.stringify({
        eventId,
        userHandle,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  const unlikeTweet = async ({
    eventId,
    userHandle,
  }: {
    eventId: number;
    userHandle: string;
  }) => {
    if (loading) return;

    setLoading(true);
    const res = await fetch("/api/joins", {
      method: "DELETE",
      body: JSON.stringify({
        eventId,
        userHandle,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    likeTweet,
    unlikeTweet,
    loading,
  };
}
