"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoryFormData } from "@/app/types/category";

export const columns: ColumnDef<CategoryFormData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
