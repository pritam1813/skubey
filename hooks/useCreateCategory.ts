import { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateCategoryInput,
  createCategorySchema,
} from "@/app/types/category";
import { getAddCategoryApiErrorMessage } from "@/lib/api-errors";
import useSWRMutation from "swr/mutation";
import { useToast } from "./use-toast";

async function createCategory(
  url: string,
  { arg }: { arg: CreateCategoryInput }
) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}

// async function updateCategory(
//   url: string,
//   { arg }: { arg: CreateCategoryInput }
// ) {
//   const response = await fetch(url, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(arg),
//   });
//   if (!response.ok) {
//     const error = await response.json();
//     throw error;
//   }

//   return response.json();
// }

export function useCreateCategory() {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      isActive: true,
      order: 0,
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    "/api/category",
    createCategory,
    {
      onSuccess: async (data) => {
        // Invalidate and refetch categories list
        await mutate("/api/category");

        // Show success message
        toast({
          title: "Category Created",
          description: `${data.name} has been created successfully.`,
        });

        // Reset form
        form.reset();
      },
      onError: (error) => {
        // Handle specific error cases and show appropriate messages
        // const errorMessage = getAddCategoryApiErrorMessage(error);
        console.log("hook err: ", error);

        toast({
          variant: "destructive",
          title: "Error Creating Category",
          description: error.error,
        });

        // Handle specific error cases in the form
        // if (error?.errors) {
        //   // Set specific field errors if they exist
        //   Object.entries(error.errors).forEach(([field, message]) => {
        //     form.setError(field as keyof CreateCategoryInput, {
        //       type: "server",
        //       message: message as string,
        //     });
        //   });
        // }
      },
    }
  );

  const onSubmit = async (data: CreateCategoryInput) => {
    try {
      await trigger(data);
    } catch (error) {
      // Error is handled in onError callback
      console.error("Category creation error:", error);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isMutating,
  };
}
