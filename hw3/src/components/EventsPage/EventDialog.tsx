"use client";

import {
  /*useEffect,*/
  useRef,
  useState,
} from "react";

// import { usePathname } from "next/navigation";
// import { DialogProps } from "@mui/material";
import { useRouter } from "next/navigation";

// import { eq } from "drizzle-orm";
// import { useSearchParams } from "next/navigation";
// all components is src/components/ui are lifted from shadcn/ui
// this is a good set of components built on top of tailwindcss
// see how to use it here: https://ui.shadcn.com/
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import DatePicker from "./DatePicker";
// import { db } from "@/db";
// import { eventsTable } from "@/db/schema";
import useEvent from "@/hooks/useEvent";
import useLike from "@/hooks/useLike";
import { cn, validateTitle, validateFrom, validateTo } from "@/lib/utils";

type DialogProps = {
  userHandle: string;
  dialogOpen: boolean;
  setDialogOpen: (d: boolean) => void;
};

export default function EventDialog({
  userHandle,
  dialogOpen,
  setDialogOpen,
}: DialogProps) {
  const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const { postEvent } = useEvent();
  const { likeTweet } = useLike();
  const [titleError, setTitleError] = useState(false);
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);

  // useEffect(() => {
  //   const username = searchParams.get("username");
  //   const handle = searchParams.get("handle");
  //   // if any of the username or handle is not valid, open the dialog
  //   setDialogOpen(!validateUsername(username) || !validateHandle(handle));
  // }, [searchParams]);

  const addNewEvent = async () => {
    const title = titleInputRef.current?.value;
    const fromDate = fromInputRef.current?.value;
    const toDate = toInputRef.current?.value;
    if (!title) return;
    if (!fromDate) return;
    if (!toDate) return;

    const newTitleError = !validateTitle(title);
    setTitleError(newTitleError);
    const newFromError = !validateFrom(fromDate);
    setFromError(newFromError);
    const newToError = !validateTo(toDate);
    setToError(newToError);
    // alert("")
    if (newTitleError) return alert("title is invalid");
    else if (newFromError) return alert("from date is invalid");
    else if (newToError) return alert("to date is invalid");

    try {
      const newEventId = await postEvent({
        userHandle,
        title,
        fromDate,
        toDate,
      });
      titleInputRef.current.value = "";
      fromInputRef.current.value = "";
      toInputRef.current.value = "";

      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      // titleInputRef.current.dispatchEvent( // issue a new event to resize the textarea
      //   new Event("input", { bubbles: true, composed: true }),
      // );
      if (!newTitleError && !newFromError && !newToError) {
        setDialogOpen(false);
        await likeTweet({
          eventId: newEventId,
          userHandle,
        });
        router.push(
          `/event/${newEventId}?username=${userHandle}&handle=${userHandle}`,
        );
        return true;
      }
    } catch (e) {
      console.error(e);
      alert("Error posting event");
      return false;
    }
  };

  // const handleSave = () => {

  // when navigating to the same page with different query params, we need to
  // preserve the pathname, so we need to manually construct the url
  // we can use the URLSearchParams api to construct the query string
  // We have to pass in the current query params so that we can preserve the
  // other query params. We can't set new query params directly because the
  // searchParams object returned by useSearchParams is read-only.
  // params.set("title", title!);
  // params.set("from", fromDate!);
  // params.set("to", toDate!);

  //   setDialogOpen(false);

  //   return true;
  // };

  // The Dialog component calls onOpenChange when the dialog wants to open or
  // close itself. We can perform some checks here to prevent the dialog from
  // closing if the input is invalid.
  const handleOpenChange = async (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      // if handleSave returns false, it means that the input is invalid, so we
      // don't want to close the dialog
      !(await addNewEvent()) && setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增你的活動</DialogTitle>
          <DialogDescription>請填寫活動名稱與時程</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              placeholder="標題"
              // defaultValue={JSON.stringify(titleInputRef) ?? ""}
              className={cn(titleError && "border-red-500", "col-span-3")}
              ref={titleInputRef}
            />
            {titleError && (
              <p className="col-span-3 col-start-2 text-xs text-red-500">
                Invalid title, it must be between 1 and 50 characters long.
                {/*<span className="font-mono">[a-z0-9 ]</span>,*/}
              </p>
            )}
          </div>
          {/* from date*/}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="from" className="text-right">
              From
            </Label>
            <Input
              placeholder="YYYY-MM-DD HH"
              // defaultValue={JSON.stringify(fromInputRef) ?? ""}
              className={cn(fromError && "border-red-500", "col-span-3")}
              ref={fromInputRef}
            />
            {fromError && (
              <p className="col-span-3 col-start-2 text-xs text-red-500">
                Invalid from date. (p.s. hour is between 0-23)
              </p>
            )}
          </div>
          {/* to date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="to" className="text-right">
              To
            </Label>
            <Input
              placeholder="YYYY-MM-DD HH"
              // defaultValue={""}
              className={cn(toError && "border-red-500", "col-span-3")}
              ref={toInputRef}
            />
            {toError && (
              <p className="col-span-3 col-start-2 text-xs text-red-500">
                Invalid to date. (p.s. hour is between 0-23)
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={addNewEvent}>新增</Button>
          <Button onClick={() => setDialogOpen(false)}>cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
