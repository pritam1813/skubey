"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Loader2, Plus, ChevronRight, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProductSchema, type ProductFormData } from "@/app/types/product";
import { createClient } from "@supabase/supabase-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcherFunctions";
import { ParentCategory } from "@/app/types/category";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import "./dashboard.scss";
import Image from "next/image";
import { env } from "@/app/utils/env";

// Initialize Supabase client
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ProductForm = () => {
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<
    number | null
  >(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      isActive: true,
      isPublished: false,
      brand: "",
      weight: 0,
      priceDiscount: 0,
      tags: [],
      attributes: [],
    },
  });

  const { data } = useSWR("/api/category", fetcher);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrls((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setImageFiles((prev) => [...prev, ...files]);
  };

  const uploadToSupabase = async (file: File) => {
    console.log("Uploading file to Supabase:", file.name);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("products")
      .upload(filePath, file);

    if (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("products").getPublicUrl(filePath);

    console.log("File uploaded successfully:", publicUrl);
    return publicUrl;
  };

  const confirmDeleteImage = (index: number) => {
    setSelectedImageIndex(index);
    setShowDeleteDialog(true);
  };

  const handleDeleteImage = () => {
    if (selectedImageIndex !== null) {
      setImageFiles((prev) => prev.filter((_, i) => i !== selectedImageIndex));
      setImagePreviewUrls((prev) =>
        prev.filter((_, i) => i !== selectedImageIndex)
      );
      setShowDeleteDialog(false);
      setSelectedImageIndex(null);
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (data: ProductFormData) => {
    console.log("Form submitted with data:", data);

    try {
      setIsSubmitting(true);

      // Upload images to Supabase Storage
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadToSupabase(file))
      );
      console.log("All images uploaded:", imageUrls);

      // Prepare the final data
      const finalData = {
        ...data,
        images: imageUrls,
        tags,
      };
      console.log("Sending final data to API:", finalData);

      // Submit to your API
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error("Failed to create product");
      }

      const result = await response.json();
      console.log("API success response:", result);

      toast({
        title: "Success!",
        description: "Product created successfully.",
      });

      // Reset form
      form.reset();
      setImageFiles([]);
      setImagePreviewUrls([]);
      setTags([]);
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="tw-w-full tw-max-w-3xl tw-mx-auto">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="tw-space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
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

            <div className="tw-grid tw-grid-cols-2 tw-tw-gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        className="no-step"
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        min={0}
                      />
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
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        className="no-step"
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        min={1}
                      />
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
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      defaultValue={
                        data?.categories.find(
                          (category: ParentCategory) =>
                            category.name === "Uncategorized"
                        ).id
                      }
                    >
                      {data?.categories.map((category: ParentCategory) => (
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

            <div className="tw-space-y-4">
              <FormLabel>Tags</FormLabel>
              <div className="tw-flex tw-gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  <Plus className="tw-w-4 tw-h-4" />
                </Button>
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="tw-flex tw-items-center tw-gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="tw-text-xs hover:tw-bg-gray-200 tw-rounded-full tw-p-1"
                    >
                      <X className="tw-w-3 tw-h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="tw-flex tw-items-center tw-justify-between tw-space-y-0">
                    <FormLabel>Active</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="tw-flex tw-items-center tw-justify-between tw-space-y-0">
                    <FormLabel>Published</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="tw-space-y-4 tw-w-full">
              <FormLabel>Product Images</FormLabel>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                multiple
                accept="image/*"
                className="hidden tw-ml-5 file:tw-bg-primaryHover file:tw-border-none file:tw-p-2 file:tw-text-primary hover:file:tw-bg-primary hover:file:tw-text-secondary file:tw-rounded-sm file:tw-transition-all file:tw-duration-500"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="tw-w-full"
              >
                <Upload className="tw-w-4 tw-h-4 tw-mr-2" />
                Upload Images
              </Button>

              {imagePreviewUrls.length > 0 && (
                <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="tw-relative">
                      <Image
                        width={128}
                        height={128}
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="tw-w-full tw-h-32 tw-object-cover tw-rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => confirmDeleteImage(index)}
                        className="tw-absolute tw-top-2 tw-right-2 tw-p-1 tw-bg-red-500 tw-rounded-full tw-text-white"
                      >
                        <X className="tw-w-4 tw-h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Collapsible>
              <CollapsibleTrigger>
                <div className=" tw-w-full tw-text-base  tw-py-3">
                  Additional Information
                  {/* <ChevronRight className="tw-h-4 tw-w-4" /> */}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="tw-space-y-4">
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
                  name="priceDiscount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          className="no-step"
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight {"(in KG)"}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          className="no-step"
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>

            <Button type="submit" className="tw-w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="tw-w-4 tw-h-4 tw-mr-2 tw-animate-spin" />
                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteImage}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ProductForm;
