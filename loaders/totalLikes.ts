import { AppContext } from "deco-sites/incognita-camp/apps/site.ts";
import { fetchSafe } from "apps/utils/fetch.ts";

export interface TotalLikeCount {
  total: number;
}

export default async function totalLikes(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<TotalLikeCount | null> {
  const key = ctx.campEventApiKey.get();

  if (!key) return null;

  const response = await fetchSafe("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
    },
  });

  return response.json();
}
