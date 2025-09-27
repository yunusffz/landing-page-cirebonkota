import { apiService } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

// Define the MapsetsResponse type based on your API response
export interface MapsetsResponse {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  // Add other fields as needed based on your API
}

export interface MapsetsResponsesResponse {
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

export const useMapsets = () => {
  return useQuery({
    queryKey: ['mapsets'],
    queryFn: async (): Promise<MapsetsResponsesResponse> => {
      console.log('Fetching mapsets data...');
      try {
        const result = await apiService.get<MapsetsResponsesResponse>(
          'mapset',
          {
            params: {
              is_active: true,
              is_deleted: false,
              count: true,
            },
          }
        );
        console.log('Mapsets API response:', result);
        return result;
      } catch (error) {
        console.error('Mapsets API error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once on failure
  });
};
