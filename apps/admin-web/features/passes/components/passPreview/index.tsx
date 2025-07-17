import { useFormContext } from "react-hook-form";

import { PassContainer } from "./passContainer";
import { PassHeader } from "./passHeader";
import { PassStrip } from "./passStrip";
import { PassFields } from "./passFields";
import { PassQrcode } from "./passQrcode";
import { PassSkeleton } from "./passSkeleton";

function PassPreview() {
  const { watch } = useFormContext();
  const formData = watch();

  // if (Object.values(formData).every((value) => value === "")) {
  //   return <PassSkeleton />;
  // }

  return (
    <PassContainer backgroundColor={formData.backgroundColor} textColor={formData.textColor}>
      <p>Hola</p>
      <PassHeader logoUrl={formData.logoUrl} passName={formData.passName} />
      {/*<PassStrip stampGoal={formData.stampGoal} />
      <PassFields />
      <PassQrcode value={formData.passName} /> */}
    </PassContainer>

    // <aside className="flex-col items-center flex">
    //     <div
    //       style={customProperties as React.CSSProperties}
    //       className="flex flex-col w-60 h-80 border rounded-3xl shadow-lg p-3 bg-[var(--pass-bg-color)] text-[var(--pass-text-color)]"
    //     >
    //       <div className="flex items-center mb-5">
    //         <Image
    //           src={formData.logoUrl}
    //           alt="logo Store"
    //           width={50}
    //           height={50}
    //           className="rounded-full max-h-6 w-auto mr-4"
    //         />

    //         <p className="font-[sans-serif] text-sm">
    //           {formData.passName ? formData.passName : "[Nombre de la tarjeta]"}
    //         </p>
    //       </div>

    //       <div className="flex justify-center">
    //         <div
    //           className="flex justify-center w-[214px] h-[90px]"
    //           style={{ transform: "scale(0.3)", transformOrigin: "top center" }}
    //         >
    //           <StampGrid totalStamps={Number(formData.stampGoal) > 0 ? formData.stampGoal : 9} filledStamps={1} />
    //         </div>
    //       </div>

    //       <div className="flex justify-between mt-2.5">
    //         <p className="flex flex-col">
    //           <span className="text-[10px]">SELLOS</span>
    //           <span className="">1</span>
    //         </p>

    //         <p className="flex flex-col">
    //           <span className="text-[10px]">PREMIOS GANADOS</span>
    //           <span className="text-right">0</span>
    //         </p>
    //       </div>

    //       <div className="flex flex-col flex-1 justify-end items-center">
    //         <QRCodeSVG value={formData.passName ?? "Lynkeer"} size={75} />

    //         <div className="text-center text-xs text-gray-500 mt-1">
    //           by <span className="font-medium">Lynkeer</span>
    //         </div>
    //       </div>
    //     </div>
    //   </aside>
  );
}

export { PassPreview };
