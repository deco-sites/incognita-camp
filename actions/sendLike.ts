import { AppContext } from "deco-sites/incognita-camp/apps/site.ts";
import { fetchSafe } from "apps/utils/fetch.ts";

export interface Props {
  productId: string;
}

export interface CompleteLikeCount {
  total: number;
  product: number;
}

export default async function sendLike(
  { productId }: Props,
  _req: Request,
  ctx: AppContext,
): Promise<CompleteLikeCount | null> {
  const data = { productId };
  const key = ctx.campEventApiKey.get();

  if (!key) return null;

  const response = await fetchSafe("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
