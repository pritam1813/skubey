export const getAddCategoryApiErrorMessage = (error: any): string => {
  console.log(error);

  // Handle specific API error cases
  if (error?.message?.includes("duplicate key")) {
    return "A category with this name already exists";
  }

  if (error?.message?.includes("parent_id")) {
    return "The selected parent category does not exist";
  }

  if (error?.message?.includes("exceeded maximum depth")) {
    return "Category hierarchy depth limit exceeded";
  }

  // Handle validation errors
  if (Array.isArray(error?.errors)) {
    return error.errors[0]?.message || "Validation error occurred";
  }

  // Default error message
  return error?.message || "An unexpected error occurred";
};
