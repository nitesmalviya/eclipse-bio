export interface Comparisons {
  id: string;
  title: string;
  assay_type: string;
  assay_type_id: string;
  active_status: string;
  comparison_start_date?: string | null;
  comparison_end_date?: string | null;
  projects_count: number;
}

export interface ComparisonsData {
  message: string;
  success: boolean;
  data: Comparisons[];
  activeCount: number;
  total: number;
}

export interface ComparisonListResponse {
  comparisons: ComparisonsData;
  limit?: number;
  page?: number;
  total?: number;
  totalPages?: number;
  message: string;
  success: boolean;
}

type SortType = "ASC" | "DESC";
type Status = "DRAFT" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED";

export interface ComparisonsInput {
  category?: string;
  status?: Status;
  search?: string;
  limit?: number;
  page?: number;
  sort?: SortType;
  sortBy?: "created_at";
  startDateFrom?: Date;
  startDateTo?: Date;
}

export interface CreateComparisonInput {
  assayTypeId: string;
  comparisonEndDate?: string | null;
  comparisonStartDate?: string | null;
  description?: string | null;
  projectIds?: string[] | null;
  title: string;
}

export interface CreateComparisonData {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    assay_type: string;
    assay_type_id: string;
    active_status: string;
    comparison_start_date?: string | null;
    comparison_end_date?: string | null;
  };
}

export interface CreateComparisonResponse {
  createComparison: CreateComparisonData;
  message: string;
  success: boolean;
}
