import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  /**
   * @minItems 3
   * @title Lista de imagens
   * @description quantidade minima: 3 imagens
   */
  listImages: ImageWidget[];
  /**
   * @ignore
   */
  renderQuant: number;
}

function PartialImageGallery({ listImages, renderQuant = 3 }: Props) {
  if (!listImages) return null;

  return (
    <div class="w-full container px-4 mx-auto pt-8 lg:pt-10 pb-28 flex flex-col items-center gap-6 relative">
      <div class="grid md:grid-cols-3 gap-2 md:gap-4 max-w-full">
        {listImages.slice(0, renderQuant).map((image) => {
          return (
            <div class="max-w-full md:w-96 h-56 max-h-56 flex justify-center items-center overflow-hidden rounded md:rounded-xl duration-300 hover:scale-110">
              <Image
                width={380}
                height={224}
                sizes="(max-width: 304px) 100vw, 30vw"
                src={image}
                alt={image}
                decoding="async"
                loading="lazy"
                class="!max-w-full"
              />
            </div>
          );
        })}
      </div>

      {renderQuant < listImages?.length && (
        <div class="max-w-48 w-48 absolute bottom-10 left-1/2 -translate-x-2/4">
          <button
            class="btn btn-block"
            {...usePartialSection({
              mode: "replace",
              props: { listImages, renderQuant: renderQuant + 3 },
            })}
          >
            Ver mais
          </button>
        </div>
      )}
    </div>
  );
}

export default PartialImageGallery;
