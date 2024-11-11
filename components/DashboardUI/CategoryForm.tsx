"use client";
import React, { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { Toaster } from "../ui/toaster";

import { ParentCategory } from "@/app/types/category";

import { useCreateCategory } from "@/hooks/useCreateCategory";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcherFunctions";
import { CategoryItemProps } from "./CategoryList";

interface CategoryFormProps {
  categoryToEdit: CategoryItemProps | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  categoryToEdit,
}) => {
  const { form, onSubmit, isLoading } = useCreateCategory();
  const { data } = useSWR("/api/category", fetcher);

  useEffect(() => {
    if (categoryToEdit) {
      // Populate form fields
      form.setValue("name", categoryToEdit.name);
    }
  }, [categoryToEdit, form]);

  return (
    <div className="tw-w-full tw-mx-auto">
      <Card className="tw-w-full tw-max-w-2xl tw-mx-auto">
        <CardHeader>
          <CardTitle className="tw-text-xl tw-text-primary">
            Add New Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="tw-space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select parent category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {data?.categories
                          .filter(
                            (category: ParentCategory) =>
                              category.name !== "Uncategorized"
                          )
                          .map((category: ParentCategory) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded-lg tw-border tw-p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Active Status</FormLabel>
                      <FormDescription>
                        Activate or deactivate this category
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="tw-w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default CategoryForm;
