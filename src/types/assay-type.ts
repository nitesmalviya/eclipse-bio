

export interface AssayType {
  id: string;
  name: string;
}
export interface AssayTypesData {
  message: string;
  success: boolean;
  data: AssayType[];
}

export interface AssayTypesResponse {
  assayTypes: AssayTypesData;
  message: string;
  success: boolean;
}
