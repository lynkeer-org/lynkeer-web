import Image from "next/image";
import "./styles.css";

interface PassHeaderProps {
  logoUrl: string;
  passName: string;
}

const PassHeader = ({ logoUrl, passName }: PassHeaderProps) => {
  return (
    <div id="pass-header" className="pass-header">
      <Image src={logoUrl} alt="logo Store" width={50} height={50} className="rounded-full max-h-6 w-auto mr-4" />

      <p className="font-[sans-serif] text-sm">{passName ? passName : "[Nombre de la tarjeta]"}</p>
    </div>
  );
};

export { PassHeader };
