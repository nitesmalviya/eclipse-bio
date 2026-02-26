import { PAGINATION_LIMIT } from "@/utils/constant";

export interface SequencesItem {
  id: string;
  name: string;
  created_at: string;
  created_by_user_id: string;
  description: string;
  rna_type: string;
  source: string;
  status: string;
  validation_results: any;
  is_optimized: boolean;
  optimized_at: string;
  optimization_results: any;
  active_status: string;
  updated_at: string;
  deleted_at: string;
  full_sequence: string;
  page: number;
}

export interface GetSequencesResponse {
  success: boolean;
  message: string;
  data: SequencesItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SequencesData {
  getRnaSequences: Sequences[];
  message: string;
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Sequences {
  id: string;
  name: string;
  created_at: string;
  created_by_user_id: string;
  description: string;
  rna_type: string;
  source: string;
  status: string;
  validation_results: any;
  is_optimized: boolean;
  optimized_at: string;
  optimization_results: any;
  active_status: string;
  updated_at: string;
  deleted_at: string;
  full_sequence: string;
  page: number;
}
export interface GetSequencesInput {
  limit?: number;
  offset?: number;
  total?: number;
  page?: number;
  totalPages?: number;
  search: string | null;
  sortBy: string;
  sort: string;
}
export interface paginationType {
  page: number;
  limit: number;
  search: string;
}

export const DEFAULT_PAGINATION: paginationType = {
  page: PAGINATION_LIMIT.PAGE,
  limit: PAGINATION_LIMIT.LIMIT,
  search: "",
};
