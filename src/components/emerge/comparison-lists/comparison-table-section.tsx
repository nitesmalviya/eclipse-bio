import { Comparisons } from "@/src/types/comparison-list";
import ComparisonTable from "../comparison-table";
import TableSection from "../table-section";
import { EMERGE_COMPARISON_TABS } from "@/src/utils/constant";
import Loader from "../../ui/loader";

interface ComparisonTableSectionProps {
  readonly comparisons: Comparisons[] | null;
  readonly activeTab: number;
  readonly setActiveTab: (value: number) => void;
  readonly handleRowClick: (value: string) => void;
  readonly loading: boolean;
}

export default function ComparisonTableSection({
  comparisons,
  activeTab,
  setActiveTab,
  handleRowClick,
  loading,
}: ComparisonTableSectionProps) {
  return (
    <TableSection
      title=""
      buttonText=""
      buttonPath=""
      tabs={EMERGE_COMPARISON_TABS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader size="md" />
        </div>
      ) : (
        <ComparisonTable
          comparisons={comparisons}
          activeTab={activeTab}
          onRowClick={handleRowClick}
        />
      )}
    </TableSection>
  );
}
