import { QRCodeSVG } from "qrcode.react";
import { ByLynkeer } from "./byLynkeer";
import "./styles.css";

interface PassQrcodeProps {
  value: string;
}

const PassQrcode = ({ value }: PassQrcodeProps) => {
  return (
    <div id="pass-qrcode" className="pass-qrcode">
      <QRCodeSVG value={value} size={75} />
      <ByLynkeer />
    </div>
  );
};

export { PassQrcode };
