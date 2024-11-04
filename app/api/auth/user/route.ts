import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return new Response(JSON.stringify(data), { status: 200 });
}
