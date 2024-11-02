import { env } from "@/app/utils/env";
import { NextResponse } from "next/server";

const base_url = env.NEXT_PUBLIC_EXCHANGE_RATE_BASE_URL;
const api_key = env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

export async function GET(req: Request) {
  try {
    const response = await fetch(`${base_url}/${api_key}/latest/INR`, {
      next: { revalidate: 24 * 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data.conversion_rates, { status: 200 });
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
}
