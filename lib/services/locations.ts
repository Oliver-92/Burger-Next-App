import { Location } from "@/lib/types";
import { LOCATIONS } from "@/lib/data/locations";

/**
 * Fetches the locations data directly from the static data file.
 * This avoids internal fetch calls to localhost:3000 during build time.
 */
export async function getLocations(): Promise<Location[]> {
  // Using direct import for better performance and to avoid build-time ECONNREFUSED
  return LOCATIONS;
}
