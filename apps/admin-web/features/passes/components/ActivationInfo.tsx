import { QRCodeSVG } from "qrcode.react";

import { ByLynkeer } from "@/features/passes/components/PassPreview/ByLynkeer";
import { baseAppUrlEnv } from "@/lib/utils/environmentValues";
import { Button } from "@lynkeer/ui/components/button";
import { toast } from "sonner";

interface ActivationInfoProps {
  passUuid: string;
}

function ActivationInfo({ passUuid }: ActivationInfoProps) {
  const activationLink = `${baseAppUrlEnv}/passes/activate/${passUuid}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activationLink);
    toast.success("Link copiado.");
  };

  const handleGoToForm = () => {
    window.open(activationLink, "_blank");
  };

  const handleDownloadQR = () => {
    toast.success("QR descargado.");
  };

  return (
    <div className="px-2 md:px-0">
      <h2 className="text-lg md:text-xl font-medium">Enlaces de activación</h2>
      <p className="text-xs md:text-sm text-gray-700">
        Los enlaces de activación se utilizan para activar la tarjeta en el dispositivo del cliente.
      </p>

      <div className="flex flex-col gap-4 py-5 items-center">
        <div className="border border-gray-200 rounded-lg px-4 pt-4 pb-2 shadow-md">
          <QRCodeSVG className="qrcode-svg" value={activationLink} size={180} />
          <ByLynkeer />
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          <Button className="w-full" variant="outline" onClick={handleCopyLink}>
            Copiar link
          </Button>

          <Button className="w-full" variant="outline" onClick={handleGoToForm}>
            Ir al formulario
          </Button>
        </div>

        <Button className="w-full" onClick={handleDownloadQR}>
          Descargar QR
        </Button>
      </div>
    </div>
  );
}

export { ActivationInfo };
