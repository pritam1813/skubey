"use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import useSWR from "swr";
// import { fetcher } from "@/app/utils/fetcherFunctions";

// export interface CategoryItemProps {
//   name: string;
//   level: number;
//   children: CategoryItemProps[];
// }

// const CategoryItem = ({ category }: { category: CategoryItemProps }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const hasChildren = category.children && category.children.length > 0;

//   return (
//     <div className="tw-w-full">
//       <div
//         className={`tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-2 hover:tw-bg-gray-100 tw-rounded-lg
//             ${category.level === 0 ? "tw-font-semibold" : ""}`}
//         style={{ paddingLeft: `${category.level * 20 + 8}px` }}
//       >
//         {hasChildren && category.level === 0 && (
//           <Button
//             variant="ghost"
//             size="icon"
//             className="tw-h-4 tw-w-4 tw-p-0"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? (
//               <ChevronDown className="tw-h-4 tw-w-4" />
//             ) : (
//               <ChevronRight className="tw-h-4 tw-w-4" />
//             )}
//           </Button>
//         )}
//         {!hasChildren && <div className="tw-w-4 empty" />}
//         <span>{category.name}</span>
//       </div>

//       {isOpen && hasChildren && (
//         <div className="tw-ml-2">
//           {category.children.map((subcategory, index) => (
//             <CategoryItem key={index} category={subcategory} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const CategoryList = () => {
//   const { data } = useSWR("/api/category", fetcher);
//   const categories = data?.categories || [];
//   return (
//     <div className="tw-w-full  tw-border tw-rounded-lg tw-p-4">
//       <h1 className="tw-text-2xl tw-text-primary tw-mb-4">
//         Available Categories
//       </h1>
//       {categories
//         .filter(
//           (category: CategoryItemProps) => category.name !== "Uncategorized"
//         )
//         .map((category: CategoryItemProps, index: number) => (
//           <CategoryItem key={index} category={category} />
//         ))}
//     </div>
//   );
// };

// export default CategoryList;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, Trash, Edit } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcherFunctions";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";

export interface CategoryItemProps {
  name: string;
  level: number;
  children: CategoryItemProps[];
  id: string; // Assuming each category has an id
}

interface CategoryFormProps {
  onEditCategory: (category: CategoryItemProps) => void;
}

const CategoryItem = ({
  category,
  selectedCategories,
  onSelect,
  onEdit,
  isSelectionMode,
}: {
  category: CategoryItemProps;
  selectedCategories: string[];
  onSelect: (id: string, isMultiSelect: boolean) => void;
  onEdit: (category: CategoryItemProps) => void;
  isSelectionMode: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategories.includes(category.id);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(category.id, e.ctrlKey || e.metaKey);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(category);
  };

  return (
    <div className="tw-w-full">
      <div
        className={`tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-2 hover:tw-bg-gray-100 tw-rounded-lg
          ${category.level === 0 ? "tw-font-semibold" : ""}
          ${isSelected ? "tw-bg-blue-50" : ""}`}
        style={{ paddingLeft: `${category.level * 20 + 8}px` }}
      >
        {isSelectionMode && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(category.id, true)}
            className="tw-mr-2"
          />
        )}

        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="tw-h-4 tw-w-4 tw-p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronDown className="tw-h-4 tw-w-4" />
            ) : (
              <ChevronRight className="tw-h-4 tw-w-4" />
            )}
          </Button>
        )}
        {!hasChildren && <div className="tw-w-4" />}

        <span className=" tw-cursor-pointer" onClick={handleSelect}>
          {category.name}
        </span>

        {/* {!isSelectionMode && (
          <Button
            variant="ghost"
            size="icon"
            className="tw-h-8 tw-w-8 tw-opacity-0 hover:tw-opacity-100"
            onClick={handleEdit}
          >
            <Edit className="tw-h-4 tw-w-4" />
          </Button>
        )} */}
      </div>

      {isOpen && hasChildren && (
        <div className="tw-ml-2">
          {category.children.map((subcategory, index) => (
            <CategoryItem
              key={index}
              category={subcategory}
              selectedCategories={selectedCategories}
              onSelect={onSelect}
              onEdit={onEdit}
              isSelectionMode={isSelectionMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryList = ({ onEditCategory }: CategoryFormProps) => {
  const { data, mutate } = useSWR("/api/category", fetcher);
  const categories = data?.categories || [];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handleSelect = (id: string, isMultiSelect: boolean) => {
    setSelectedCategories((prev) => {
      if (isMultiSelect) {
        return prev.includes(id)
          ? prev.filter((catId) => catId !== id)
          : [...prev, id];
      }
      return [id];
    });
  };

  const handleEdit = (category: CategoryItemProps) => {
    onEditCategory(category);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/category", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryIds: selectedCategories }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 400 && data.categories) {
          console.log(data.error);

          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });

          // Show which categories couldn't be deleted due to dependencies
          console.error("Categories with dependencies:", data.categories);
          // You might want to show this in your UI
        }
        throw new Error(data.error);
      }

      // Success case
      await mutate(); // Refresh the categories list
      setSelectedCategories([]);
      setIsSelectionMode(false);

      // Maybe show a success toast
      //   toast.success(`Successfully deleted ${data.count} categories`);
      toast({
        title: "Success",
        description: `Successfully deleted ${data.count} categories`,
      });
    } catch (error) {
      console.error("Failed to delete categories:1", error);
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="tw-w-full tw-border tw-rounded-lg tw-p-4">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h1 className="tw-text-2xl tw-text-primary">Available Categories</h1>

        <div className="tw-flex tw-gap-2">
          <Button
            variant="outline"
            onClick={() => setIsSelectionMode(!isSelectionMode)}
          >
            {isSelectionMode ? "Cancel" : "Select"}
          </Button>

          {isSelectionMode && selectedCategories.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="tw-flex tw-items-center tw-gap-2"
            >
              <Trash className="tw-h-4 tw-w-4" />
              Delete ({selectedCategories.length})
            </Button>
          )}
        </div>
      </div>

      {categories
        .filter(
          (category: CategoryItemProps) => category.name !== "Uncategorized"
        )
        .map((category: CategoryItemProps, index: number) => (
          <CategoryItem
            key={index}
            category={category}
            selectedCategories={selectedCategories}
            onSelect={handleSelect}
            onEdit={handleEdit}
            isSelectionMode={isSelectionMode}
          />
        ))}

      <Toaster />
    </div>
  );
};

export default CategoryList;
