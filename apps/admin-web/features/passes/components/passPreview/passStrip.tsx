import { StampGrid } from "@/features/passes/components/StampGrid";
import "./styles.css";

interface PassStripProps {
  stampGoal: string;
}

const PassStrip = ({ stampGoal }: PassStripProps) => {
  return (
    <div id="pass-strip" className="pass-strip">
      <div
        className="flex justify-center w-[214px] h-[90px]"
        style={{ transform: "scale(0.3)", transformOrigin: "top center" }}
      >
        <StampGrid totalStamps={Number(stampGoal) > 0 ? Number(stampGoal) : 9} filledStamps={1} />
      </div>
    </div>
  );
};

export { PassStrip };
