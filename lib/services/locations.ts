import { Location } from "@/lib/types";

export async function getLocations(): Promise<Location[]> {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    : "";

  try {
    const res = await fetch(`${baseUrl}/api/locations`, {
      next: { revalidate: 0 }, // 0 Caching disabled for development
    });

    if (!res.ok) {
      throw new Error("Failed to fetch locations");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}
