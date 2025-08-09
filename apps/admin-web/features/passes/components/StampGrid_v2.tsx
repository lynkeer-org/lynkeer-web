import { baseAppUrlEnv } from "@/lib/utils/environmentValues";
import { generateStampsLayout } from "@/lib/wallets/stamps/generateStampsLayout";
import Image from "next/image";

function StampGrid({ totalStamps, filledStamps }: { totalStamps: number; filledStamps: number }) {
  const defaultStampEmpty = `${baseAppUrlEnv}/images/star-empty.svg`;
  const defaultStampFilled = `${baseAppUrlEnv}/images/star-fill.svg`;
  const containerWidth = 800;
  const containerHeight = 300;
  const gap = 20;

  const layout = generateStampsLayout(containerWidth, containerHeight, totalStamps, gap);

  const rows = Array.from({ length: layout.rows }).map((_, rowIndex) => {
    const rowStart = rowIndex * layout.columns;
    const rowEnd = Math.min(rowStart + layout.columns, totalStamps);

    const stamps = Array.from({ length: rowEnd - rowStart }).map((_, i) => {
      const index = rowStart + i;
      const isFilled = index < filledStamps;

      return (
        <div
          key={index}
          style={{
            width: layout.stampSize * 0.8,
            height: layout.stampSize * 0.8,
            backgroundColor: "#fff",
            border: "0.5px solid #000",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: i < layout.columns - 1 ? gap : 0,
          }}
        >
          {isFilled ? (
            <Image
              src={defaultStampFilled}
              alt="stamp filled"
              width={layout.stampSize * 0.5}
              height={layout.stampSize * 0.5}
            />
          ) : (
            <Image
              src={defaultStampEmpty}
              alt="stamp empty"
              width={layout.stampSize * 0.5}
              height={layout.stampSize * 0.5}
            />
          )}
        </div>
      );
    });

    const keyRowStamps = `row_${rowIndex}_${stamps.length}`;
    return (
      <div
        key={keyRowStamps}
        style={{
          display: "flex",
          justifyContent: totalStamps % 2 === 0 ? "space-around" : "center",
          marginBottom: rowIndex < layout.rows - 1 ? gap : 0,
        }}
      >
        {stamps}
      </div>
    );
  });

  return (
    <div
      style={{
        width: containerWidth,
        height: containerHeight,
        backgroundColor: "#fff",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {rows}
    </div>
  );
}

export { StampGrid };
