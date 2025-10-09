import Image from "next/image";
import "./styles.css";

interface PassHeaderProps {
  logoUrl: string;
  passName: string;
}

const PassHeader = ({ logoUrl, passName }: PassHeaderProps) => {
  return (
    <div id="pass-header" className="pass-header">
      <div className="min-w-6">
        <Image
          src={logoUrl}
          alt="logo Store"
          width={50}
          height={50}
          className="rounded-full max-h-6 w-auto mr-4 min-w-6"
          loading="eager"
        />
      </div>

      <p className="font-[sans-serif] text-sm">{passName ? passName : "[Nombre de la tarjeta]"}</p>
    </div>
  );
};

export { PassHeader };
