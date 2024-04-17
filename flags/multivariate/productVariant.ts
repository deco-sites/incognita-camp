export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import type { Product } from "apps/commerce/types.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";

export default function productVariant(
  props: MultivariateProps<Product[] | null>,
): MultivariateFlag<Product[] | null> {
  return multivariate(props);
}
