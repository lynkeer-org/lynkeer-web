import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import { DataTable } from "@/components/DataTable";
import { SectionCards } from "@/components/SectionCards";

import data from "./data.json";

export default function ReportPage() {
  return (
    <>
      <SectionCards />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <DataTable data={data} />
    </>
  );
}
