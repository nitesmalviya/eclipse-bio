import { User } from "./auth-type";
export interface ProjectAssay {
  name: string;
}

export interface Project {
  id: string;
  rna_sequence_id?: string | null;
  created_by_user_id?: string;
  name: string;
  slug?: string;
  description?: string | null;
  status?: string;
  start_date?: string | null;
  target_end_date?: string | null;
  actual_end_date?: string | null;
  identifier?: string;
  progress_percentage?: number;
  settings?: Record<string, any> | null;
  tags?: string[] | null;
  is_public?: boolean;
  is_featured?: boolean;
  active_status?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  assay_type?: string;
  owner?: Partial<User>;
  // assays: Assay[];
  // files: File[];
  // milestones: Milestone[];

  // owners: User[];
  // viewers: User[];
}

export interface ProjectData {
  message: string;
  success: boolean;
  data: Project[];
  activeCount: number;
  total: number;
}

export interface ProjectsResponse {
  projects: ProjectData;
  message: string;
  success: boolean;
}

type SortType = "ASC" | "DESC";
type Status = "DRAFT" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED";

export interface ProjectsInput {
  tags?: string[];
  status?: Status;
  search?: string;
  limit?: number;
  page?: number;
  sort?: SortType;
  sortBy?: "created_at";
  startDateFrom?: Date;
  startDateTo?: Date;
}

export interface CreateMilestoneInput {
  title: string;
  dueDate?: string;
}

export interface CreateProjectInput {
  identifier: string;
  name: string;
  description?: string | null;
  isPublic?: boolean | null;
  milestones?: CreateMilestoneInput[] | null;
  owner_ids?: string[] | null;
  viewer_ids?: string[] | null;
  tags?: string[] | null;
  startDate?: string | null;
  targetEndDate?: string | null;
}

export interface CreateProjectData {
  data: {
    id: string;
    identifier: string;
    name: string;
    owner: {
      display_name: string;
    };
  };
  message: string;
  success: boolean;
}

export interface CreateProjectResponse {
  createProject: CreateProjectData;
  message: string;
  success: boolean;
}
