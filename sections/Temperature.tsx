import weather, {
  Props as TemperatureLoaderProps,
} from "apps/weather/loaders/temperature.ts";
import { SectionProps } from "deco/types.ts";

interface TemperatureSectionProps {
  /** @title Locality registration */
  latLong: TemperatureLoaderProps;
}

export const loader = async (
  { latLong }: TemperatureSectionProps,
  req: Request
) => {
  const temperature = await weather(latLong, req);

  return {
    temperature,
  };
};

const Temperature = ({ temperature }: SectionProps<typeof loader>) => {
  return (
    <button className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-2">
      {temperature?.celsius}º
    </button>
  );
};

export default Temperature;
