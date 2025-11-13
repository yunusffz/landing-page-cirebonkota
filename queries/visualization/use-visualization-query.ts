import { apiService } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

// Define the Visualization type based on your API response
export interface Visualization {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  // Add other fields as needed based on your API
}

export interface VisualizationsResponse {
  code: number;
  message: string;
  data: {
    count: number;
  };
  error: Record<string, unknown>;
  pagination: {
    page: number;
    per_page: number;
    total_page: number;
    total_data: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

export const useVisualizations = () => {
  return useQuery({
    queryKey: ['Visualizations'],
    queryFn: async (): Promise<VisualizationsResponse> => {
      return apiService.get<VisualizationsResponse>('artikel', {
        params: {
          is_active: true,
          is_deleted: false,
          count: true,
        },
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
