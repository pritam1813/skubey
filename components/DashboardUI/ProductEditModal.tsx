"use client";

// will try later

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProductStore } from "@/app/stores/productStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoriesApiResponse,
  Category,
  productFormSchema,
  ProductFormValues,
} from "@/app/types/productmodify";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcherFunctions";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const ProductEditModal = ({
  isModalOpen,
  handleModalChange,
}: {
  isModalOpen: boolean;
  handleModalChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    selectedProducts,
    editingProduct,
    setEditingProduct,
    setSelectedProducts,
    toggleProduct,
    clearSelection,
  } = useProductStore();

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      isActive: true,
      brand: "",
      tags: "",
    },
  });

  const { data: categoriesData } = useSWR<CategoriesApiResponse>(
    "/api/category",
    fetcher
  );

  const onSubmit = async (formData: ProductFormValues) => {
    try {
      //   const response = await fetch(`/api/products/${editingProduct.id}`, {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       ...formData,
      //       price: parseFloat(formData.price),
      //       stock: parseInt(formData.stock),
      //     }),
      //   });

      //   if (!response.ok) throw new Error("Failed to update product");
      console.log(formData);

      // mutate(); // Refresh the products list
      handleModalChange(false);
      setEditingProduct(null);
      form.reset();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          setEditingProduct(null);
          form.reset();
        }
        handleModalChange(open);
      }}
    >
      <DialogContent className="sm:tw-max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to the product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="tw-space-y-4">
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

            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="0.00" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categoriesData?.categories?.map((category: Category) => (
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
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter tags separated by commas"
                    />
                  </FormControl>
                  <FormDescription>
                    Separate tags with commas (e.g., electronics, gadgets, new)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="tw-flex tw-flex-row items-start tw-space-x-3 tw-space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="tw-space-y-1 tw-leading-none">
                    <FormLabel>Active</FormLabel>
                    <FormDescription>
                      This product will be visible in the store
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="tw-flex tw-justify-end tw-space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  handleModalChange(false);
                  setEditingProduct(null);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditModal;
