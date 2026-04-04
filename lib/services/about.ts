import { AboutContent } from "@/lib/types";

export async function getAboutContent(): Promise<AboutContent> {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    : "";

  try {
    const res = await fetch(`${baseUrl}/api/about`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch about content");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching about content:", error);
    // Fallback or empty object
    return {} as AboutContent;
  }
}
