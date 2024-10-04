let project_Id = "";
if (process.env.NODE_ENV === "development") {
  project_Id = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID_DEV!;
} else {
  project_Id = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID_PROD!;
}
export default function supabaseLoader({ src }: { src: string }) {
  return `${project_Id}/storage/v1/render/image/public/${src}`;
}
