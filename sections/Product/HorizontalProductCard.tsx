export { default } from "../../components/product/HorizontalProductCard.tsx";
import { asset } from "$fresh/runtime.ts";

export function LoadingFallback() {
  return (
    <div class="container flex justify-center py-4">
      <div class="flex max-sm:flex-col gap-4">
        <div class="skeleton h-52 w-52 shrink-0"></div>
        <div class="px-2 flex flex-col gap-1 self-stretch shrink-0 w-64">
          <div class="skeleton h-4"></div>
          <div class="skeleton h-4 w-full mb-auto"></div>
        </div>
        <div>
          <div class="skeleton h-4 w-14"></div>
          <div class="skeleton h-4 w-18 mb-4"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>
      </div>
    </div>
  );
}

export function ErrorFallback({ error: _error, ...props }: { error?: Error }) {
  console.log(props);
  return (
    <div class="flex flex-col mx-auto max-w-96 gap-2 px-4">
      <img
        src={asset("/Queijo_Minas.jpg")}
        alt={"queijo minas"}
        height={400}
        width={400}
        class="aspect-square rounded"
      />
      <h2 class="font-bold text-lg">Queijo Minas</h2>
      <p>
        O queijo minas padrão é o típico queijo mineiro mais macio. A sua
        consistência é mais forte que o minas frescal.
      </p>
      <a href="/cultura" class="btn btn-block btn-secondary">
        Para Saber mais
      </a>
    </div>
  );
}
