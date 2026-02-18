
export interface GetFeaturedDatasetsResponse {
 getFeaturedDatasets:FeaturedDatasetData
  message: string;
  success: boolean;
}

export interface FeaturedDatasetData {
  datasets: FeaturedDataset[];
  message: string;
  success: boolean;
  total: number;
}

export interface FeaturedDataset {
  assay_type: string;
  id: string;
  name: string;
}
export interface GetFeaturedDatasetsInput {
  limit?: number;
  offset?: number;
}
