
export interface GetSequencesResponse {
  getRnaSequences: {
    success: boolean;
    message: string;
    data: Sequences[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SequencesData {
  getRnaSequences: Sequences[];
  message: string;
  success: boolean;
  total: number;
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
}
export interface GetSequencesInput {
  limit?: number;
  offset?: number;
  total?: number;
  page?: number;
  totalPages?: number;
}
