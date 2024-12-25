// Implement Later if required

// import { type NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/app/utils/supabase/server";
// import { getBaseUrl } from "@/app/utils/getBaseUrl";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const referer = req.headers.get("host");

//   const baseUrl = new URL(getBaseUrl()).host;
//   if (!referer?.includes(baseUrl)) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   try {
//     console.log(params.id);

//     const supabase = await createClient();
//     const { data } = supabase.storage.from("products").getPublicUrl(params.id);

//     return NextResponse.json({
//       status: 200,
//       data: data.publicUrl,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
