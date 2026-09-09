import { GlobeAltIcon } from "@heroicons/react/24/solid";

export default function Logo() {
  return (
    <div className="flex items-center font-sans">
      <GlobeAltIcon className="w-10 h-10" />
      <p className="text-3xl font-extrabold">Acme</p>
    </div>
  );
}
