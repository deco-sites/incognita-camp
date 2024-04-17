import Image from "apps/website/components/Image.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import { Product } from "apps/commerce/types.ts";

import { useOffer } from "deco-sites/incognita-camp/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/incognita-camp/sdk/format.ts";
import LikeButton from "deco-sites/incognita-camp/islands/LikeButton.tsx";

export interface Props {
  products: Product[] | null;
  layout: Layout;
}

export interface Layout {
  maxSize:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
  animateImage?: boolean;
}

const HorizontalProductCard = ({ products, layout }: Props) => {
  if (!products) throw new Error();

  const product = products[0];
  const { productID, name, url, offers, isVariantOf, image: images } = product;

  const description = product.description || isVariantOf?.description;
  const { listPrice, price, seller } = useOffer(offers);

  const eventParams = {
    items: [{ item_url: url, quantity: 1, item_name: name! }],
  };

  const [image] = images ?? [];

  return (
    <div class={`container px-2 ${layout.maxSize}`}>
      <div class="flex items-center relative group">
        <div class="w-52 md:min-w-52 overflow-hidden rounded-lg">
          {image.url && (
            <Image
              src={image.url}
              width={208}
              height={208}
              loading="lazy"
              alt={name}
              class={`${
                layout.animateImage
                  ? "group-hover:scale-110 transition-all duration-300"
                  : ""
              }`}
            />
          )}
        </div>
        <div class="ml-2 flex flex-col md:flex-row md:justify-between md:w-full">
          <div>
            <a href={url}>
              <h2
                class="truncate text-base lg:text-lg text-base-content uppercase font-normal"
                dangerouslySetInnerHTML={{ __html: name ?? "" }}
              />
            </a>
            <p class="line-clamp-2 text-xs">{description}</p>
          </div>
          <div>
            {listPrice && (
              <div
                class={`line-through text-neutral-600 text-xs font-light lg:text-sm`}
              >
                {formatPrice(listPrice, offers?.priceCurrency)}
              </div>
            )}
            {price && <p>{formatPrice(price, offers?.priceCurrency)},</p>}
            {price && (
              <AddToCartButtonVTEX
                eventParams={eventParams}
                productID={productID}
                seller={seller ?? "1"}
              />
            )}
          </div>
        </div>
        <LikeButton productID={productID} />
      </div>
    </div>
  );
};

export default HorizontalProductCard;
