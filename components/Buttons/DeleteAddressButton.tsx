"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LinkButtonTwo from "./LinkButtonTwo";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteAddressButton = ({ addressId }: { addressId: string }) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${getBaseUrl()}/api/auth/user/address/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success !== false) {
        toast.success(data.message);
        // Refresh the current route
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <LinkButtonTwo type="button" title="Delete" varient="danger" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={() => handleDelete(addressId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteAddressButton;
