import { useState } from "react";

import { useRouter } from "next/navigation";

// type NewEvent = {
//   userHandle: string;
//   title: string;
//   fromDate: string;
//   toDate: string;
//   id: number;
//   createdAt: Date | null;
// }
export default function useTweet() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postEvent = async ({
    userHandle,
    title,
    fromDate,
    toDate,
  }: {
    userHandle: string;
    title: string;
    fromDate: string;
    toDate: string;
  }): Promise<number> => {
    setLoading(true);

    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({
        userHandle,
        title,
        fromDate,
        toDate,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
    // return res.json();
    // console.log((await res.json()).newEvent[0].id);
    return (await res.json()).newEvent[0].id;
  };

  return {
    postEvent,
    loading,
  };
}
