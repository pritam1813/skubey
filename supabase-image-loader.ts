export default function supabaseLoader({ src }: { src: string }) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || !src || src.includes("undefined")) {
      return "/products/1.jpg";
    }

    // Optional: Add image extension validation
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const hasValidExtension = validExtensions.some((ext) =>
      src.toLowerCase().endsWith(ext)
    );
    if (!hasValidExtension) {
      return "/products/1.jpg";
    }

    const url = new URL(`${supabaseUrl}/storage/v1/object/public/${src}`);
    return url.href;
  } catch (error) {
    return "/products/1.jpg";
  }
}
