import { AppContext } from "deco-sites/incognita-camp/apps/site.ts";
import { fetchSafe } from "apps/utils/fetch.ts";

export interface Props {
  productID: string;
}

export interface ProductLikeCount {
  product: number;
}

export default async function productLikes(
  { productID }: Props,
  _req: Request,
  ctx: AppContext,
): Promise<ProductLikeCount | null> {
  const key = ctx.campEventApiKey.get();

  if (!key) return null;

  const response = await fetchSafe(
    `https://camp-api.deco.cx/event/${productID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
      },
    },
  );

  return response.json();
}
