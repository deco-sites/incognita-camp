import Icon from "../../components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";

export interface CupomProps {
  /**
   * @title Titulo
   */
  Titulo: string;
  /**
   * @title Cupom
   */
  label: string;
}

export interface Props {
  cupom: CupomProps;
}

function Cupom({ cupom }: Props) {
  const copy = useSignal(false);

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
  };

  return (
    <li class="w-full flex justify-center">
      <div class="flex flex-col lg:flex-row max-w-[310px] lg:max-w-[initial]">
        <div class="flex overflow-hidden relative">
          <div class="absolute bg-white w-[37px] h-[37px] border border-solid border-[#d9d9d9] rounded-full bottom-[-15px] left-[-17px] lg:left-[initial] lg:bottom-[initial] lg:top-[-15px] lg:right-[-17px]">
          </div>
          <div class="absolute bg-white w-[37px] h-[37px] border border-solid border-[#d9d9d9] rounded-full bottom-[-15px] right-[-17px]">
          </div>
        </div>
        <div class="overflow-hidden relative">
          <div class="border border-solid border-[#d9d9d9] h-full pl-[18px] lg:pl-[30px] pr-[18px] pt-6 pb-[22px] flex flex-col">
            <span class="text-black font-[Arial] font-bold text-[20px] uppercase leading-[23px]">
              Cupom de desconto
            </span>
            <span class="text-black font-[Arial] font-black text-[25px] uppercase leading-[35px]">
              {cupom.Titulo}
            </span>
            <div class="flex items-center">
              <span class="font-[Arial] text-[16px] leading-[18px] text-[#555555]">
                Utilize o cupom:
              </span>
              <span class="ml-[10px] font-[Arial] text-[16px] leading-[18px] text-black font-bold border border-[#555555] border-dashed p-[10px] rounded-[5px] text-center">
                {cupom.label}
              </span>
              <button
                class="flex flex-col ml-[10px] items-center group relative text-[14px] font-[Arial] text-black"
                onClick={() => {
                  copyToClipboard(cupom.label);
                  copy.value = true;
                }}
              >
                <Icon id="Copy" width={15} height={15} />
                copiar
                <span class="hidden group-hover:block absolute top-[-30px] bg-black text-white py-[5px] px-[5px] min-w-[50px] rounded-[6px] text-[14px] font-[Arial] leading-[normal]">
                  {copy.value ? "Copiado" : "Copiar"}
                </span>
              </button>
            </div>
          </div>
          <div class="absolute bg-white w-[37px] h-[37px] border border-solid border-[#d9d9d9] rounded-full top-[-15px] left-[-17px]">
          </div>
          <div class="absolute bg-white w-[37px] h-[37px] border border-solid border-[#d9d9d9] rounded-full top-[-15px] right-[-17px] lg:top-[initial] lg:right-[initial] lg:bottom-[-15px] lg:left-[-17px]">
          </div>
        </div>
        <div class="w-full lg:w-[22px] h-[31px] lg:h-full bg-cover bg-no-repeat bg-[url(https://openbox.vteximg.com.br/arquivos/background-cupom-border-mobile.png)] lg:bg-[url(https://openbox.vteximg.com.br/arquivos/background-cupom-border-desk.png)]">
        </div>
      </div>
    </li>
  );
}

export default Cupom;
