
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Banner } from "../types/banner";

export const useBanners = (banners: Banner[] = []) => {
  const { data: supabaseBanners = [], isLoading, error } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      console.log('Fetching banners from Supabase...');
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching banners:', error);
        throw error;
      }
      
      console.log('Raw banners data from Supabase:', data);
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Use prop banners if provided, otherwise use fetched banners
  const activeBanners = banners.length > 0 ? banners : supabaseBanners.filter(banner => banner.photo_url);

  console.log('Prop banners:', banners);
  console.log('Supabase banners:', supabaseBanners);
  console.log('Active banners (filtered):', activeBanners);
  console.log('Is loading:', isLoading);
  console.log('Error:', error);

  return {
    activeBanners,
    isLoading,
    error
  };
};
