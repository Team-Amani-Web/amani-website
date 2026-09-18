import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "vufb5el5",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any, width = 1200) {
  if (!source?.asset) return null;
  return builder.image(source).width(width).auto("format").fit("max").url();
}

/** Run a GROQ query. Returns [] (or null) if Sanity is unreachable, so a
 *  network blip never breaks the build. */
export async function query<T>(groq: string, fallback: T): Promise<T> {
  try {
    const data = await client.fetch(groq);
    if (data === null || data === undefined) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data as T;
  } catch (err) {
    console.warn("[sanity] query failed, using local seed data:", (err as Error).message);
    return fallback;
  }
}
