import Icon from "deco-sites/incognita-camp/components/ui/Icon.tsx";
import { total } from "deco-sites/incognita-camp/sdk/useTotalLikes.ts";

function LikesTotalHeader() {
  return (
    <div class="flex relative items-center justify-center gap-1 sm:gap-2 min-w-12 sm:min-w-14">
      <Icon id="Friends" width={24} height={24} />
      <span
        class={`indicator-item badge badge-secondary badge-sm text-white absolute -top-2 -right-2`}
      >
        {total.value}
      </span>
    </div>
  );
}

export default LikesTotalHeader;
