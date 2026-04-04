import { AboutContent } from "@/lib/types";
import { ABOUT_CONTENT } from "@/lib/data/about";

/**
 * Fetches the about content directly from the static data file.
 * This avoids internal fetch calls to localhost:3000 during build time.
 */
export async function getAboutContent(): Promise<AboutContent> {
  // Using direct import for better performance and to avoid build-time ECONNREFUSED
  return ABOUT_CONTENT;
}
