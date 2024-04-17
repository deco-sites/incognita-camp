import type { Temperature } from "apps/weather/loaders/temperature.ts";

interface Props {
  temperatureValue: Temperature | null;
}

const getBgColor = (temp: number) => {
  if (temp <= 18) return `bg-blue-500 hover:bg-blue-600`;
  if (temp <= 25) return `bg-green-500 hover:bg-green-600`;
  if (temp <= 28) return `bg-orange-500 hover:bg-orange-600`;
  return `bg-rose-500 hover:bg-rose-600`;
};

const Temperature = ({ temperatureValue }: Props) => {
  const temperature = Math.floor(temperatureValue?.celsius ?? 0);

  const bg = getBgColor(temperature);

  return (
    <button
      className={`fixed bottom-4 right-4 text-white p-4 rounded-full  aspect-square ${bg}`}
    >
      {temperature}ºc
    </button>
  );
};

export default Temperature;
