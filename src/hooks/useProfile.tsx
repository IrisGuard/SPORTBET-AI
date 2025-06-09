
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  token_balance: number;
  created_at: string;
  updated_at: string;
  solana_wallet: string | null;
};

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Try to use the get_current_profile function first
        const { data: functionData, error: functionError } = await supabase
          .rpc('get_current_profile');
          
        if (functionError) {
          console.warn('Error using get_current_profile:', functionError);
          
          // Fallback to direct query if the function fails
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          setProfile(data as Profile);
        } else {
          // Fix: Extract the first profile from the array returned by get_current_profile
          if (Array.isArray(functionData) && functionData.length > 0) {
            setProfile(functionData[0] as Profile);
          } else {
            // Handle empty result case
            console.warn('No profile found from get_current_profile');
            throw new Error('No profile found');
          }
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load profile',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      
      return true;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile',
      });
      return false;
    }
  };

  // New function to upload avatar
  const uploadAvatar = async (file: File) => {
    if (!user || !profile) return null;
    
    try {
      // Create a unique file path using user ID
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      
      // Upload file to 'avatars' bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;
      
      // Get public URL for the uploaded file
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      if (!data.publicUrl) throw new Error('Failed to get public URL');
      
      // Update profile with new avatar URL
      const success = await updateProfile({ 
        avatar_url: data.publicUrl 
      });
      
      if (success) {
        toast({
          title: 'Avatar updated',
          description: 'Your profile picture has been updated',
        });
        return data.publicUrl;
      }
      
      return null;
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message || 'Failed to upload avatar',
      });
      return null;
    }
  };

  return { profile, loading, updateProfile, uploadAvatar };
};
