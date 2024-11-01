"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { fetcher } from "@/app/utils/fetcherFunctions";
import { useProductStore } from "@/app/stores/productStore";

import {
  CategoriesApiResponse,
  Category,
  productFormSchema,
  ProductsApiResponse,
  Product,
  ProductFormValues,
} from "@/app/types/productmodify";

const ProductTable = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState({
    field: "createdAt",
    order: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    selectedProducts,
    editingProduct,
    setEditingProduct,
    setSelectedProducts,
    toggleProduct,
    clearSelection,
  } = useProductStore();

  // Fetch products with SWR
  const { data, error, mutate } = useSWR<ProductsApiResponse>(
    `/api/products?page=${page}&limit=${limit}&sortBy=${sortConfig.field}&sortOrder=${sortConfig.order}&search=${searchTerm}`,
    fetcher
  );

  console.log("Products: ", data);

  // Fetch categories for the form
  const { data: categoriesData } = useSWR<CategoriesApiResponse>(
    "/api/category",
    fetcher
  );

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

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        stock: editingProduct.stock.toString(),
        categoryId: editingProduct.categoryId,
        isActive: editingProduct.isActive,
        brand: editingProduct.brand || "",
        tags: editingProduct.tags.join(", "),
      });
    }
  }, [editingProduct, form]);

  const handleSort = (field: string) => {
    setSortConfig((current) => ({
      field,
      order:
        current.field === field && current.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = async (productId: string) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      mutate();
      clearSelection();
      // console.log(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedProducts.map((id) =>
          fetch(`/api/products/${id}`, { method: "DELETE" })
        )
      );
      mutate();
      clearSelection();
      // console.log(selectedProducts);
    } catch (error) {
      console.error("Error performing bulk delete:", error);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    checked
      ? setSelectedProducts(
          data?.products.map((product: Product) => product.id) ?? []
        )
      : clearSelection();
  };

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

      mutate(); // Refresh the products list
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      form.reset();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (error) return <div>Failed to load products</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="tw-space-y-4">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="tw-w-64"
          />
          <Select
            value={sortConfig.field}
            onValueChange={(value) => handleSort(value)}
          >
            <SelectTrigger className="tw-w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="createdAt">Date</SelectItem>
              <SelectItem value="stock">Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedProducts.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete Selected ({selectedProducts.length})
          </Button>
        )}
      </div>

      <div className="tw-rounded-md tw-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="tw-w-[50px]">
                <Checkbox
                  checked={selectedProducts.length === data.products.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <div className="tw-flex tw-items-center tw-space-x-1">
                  <button
                    onClick={() => handleSort("name")}
                    className="tw-flex tw-items-center tw-space-x-1"
                  >
                    Name
                    <ArrowUpDown className="tw-h-4 tw-w-4" />
                  </button>
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("price")}
                  className="tw-flex tw-items-center tw-space-x-1"
                >
                  Price
                  <ArrowUpDown className="tw-h-4 tw-w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("stock")}
                  className="tw-flex tw-items-center tw-space-x-1"
                >
                  Stock
                  <ArrowUpDown className="tw-h-4 tw-w-4" />
                </button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="tw-w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.map((product: Product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProduct(product.id)}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>${product.price.toString()}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <span
                    className={`tw-px-2 tw-py-1 tw-rounded-full tw-text-xs ${
                      product.isActive
                        ? "tw-bg-green-100 tw-text-green-800"
                        : "tw-bg-red-100 tw-text-red-800"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="tw-h-8 tw-w-8 tw-p-0">
                        <MoreHorizontal className="tw-h-4 tw-w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="tw-text-red-600"
                        onClick={() => {
                          setProductToDelete(product.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          Showing {(page - 1) * limit + 1} to{" "}
          {Math.min(page * limit, data.total)} of {data.total} results
        </div>
        <div className="tw-space-x-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={page >= data.pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null);
            form.reset();
          }
          setIsEditDialogOpen(open);
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="tw-space-y-4"
            >
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
                        {categoriesData?.categories?.map(
                          (category: Category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          )
                        )}
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
                      Separate tags with commas (e.g., electronics, gadgets,
                      new)
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
                    setIsEditDialogOpen(false);
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedProducts.length > 1 ||
              (productToDelete && selectedProducts.includes(productToDelete))
                ? `This will delete ${selectedProducts.length} selected products. This action cannot be undone.`
                : "This will delete the selected product. This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setProductToDelete(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (
                  selectedProducts.length > 1 ||
                  (productToDelete &&
                    selectedProducts.includes(productToDelete))
                ) {
                  handleBulkDelete();
                } else if (productToDelete) {
                  handleDelete(productToDelete);
                }
                setIsDeleteDialogOpen(false);
                setProductToDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductTable;
