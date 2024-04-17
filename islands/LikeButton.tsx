import { useSignal } from "@preact/signals";
import Icon from "deco-sites/incognita-camp/components/ui/Icon.tsx";
import { invoke } from "deco-sites/incognita-camp/runtime.ts";
import { total } from "deco-sites/incognita-camp/sdk/useTotalLikes.ts";
import { useEffect, useId } from "preact/hooks";
import { SendEventOnClick } from "deco-sites/incognita-camp/components/Analytics.tsx";
import { Bounce, toast } from "react-toastify";

export interface LikeButtonIslandProps {
  productID: string;
}

const { totalLikes: totalLikesLoader, productLikes } =
  invoke["deco-sites/incognita-camp"].loaders;

const sendLike = invoke["deco-sites/incognita-camp"].actions.sendLike;

function LikeButton({ productID }: LikeButtonIslandProps) {
  const selected = useSignal(false);
  const quantity = useSignal(0);
  const id = useId();

  useEffect(() => {
    const updateTotals = async () => {
      const totalLikes = await totalLikesLoader();
      const totalLikesProduct = await productLikes({ productID });

      if (!totalLikes || !totalLikesProduct) return;

      total.value = totalLikes.total;
      quantity.value = totalLikesProduct.product;
    };

    updateTotals();
    setInterval(updateTotals, 30000);
  });

  const handleSendLike = async () => {
    selected.value = true;

    const data = await sendLike({
      productId: productID,
    });

    if (!data) {
      toast.error("Houve um erro ao curtir", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    quantity.value = data.product;
    total.value = data.total;

    toast.success("Curtido", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <button
        class={`absolute left-4 sm:left-auto sm:right-4 top-4 flex items-center justify-center gap-1 p-1 sm:p-2 rounded bg-neutral sm:bg-white min-w-14 hover:text-primary transition-colors duration-300 ${
          selected.value ? "text-primary" : ""
        }`}
        onClick={() => handleSendLike()}
        id={id}
      >
        <SendEventOnClick
          id={id}
          event={{
            //@ts-expect-error custom-event
            name: "post_score",
            params: {
              //@ts-expect-error custom-event
              likesTotal: quantity.value + 1,
            },
          }}
        />
        {!selected.value ? (
          <Icon id="MoodSmile" width={24} height={24} />
        ) : (
          <Icon id="MoodCheck" width={24} height={24} />
        )}
        <span
          class={`indicator-item badge badge-secondary badge-sm text-white absolute -top-1 -right-1`}
        >
          {quantity.value}
        </span>
      </button>
    </>
  );
}

export default LikeButton;
