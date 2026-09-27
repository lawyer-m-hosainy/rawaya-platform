import { supabase } from '../lib/supabase';

export interface Media {
  id: string;
  title: string;
  caption: string;
  type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  location?: string;
  category?: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export const mediaService = {
  async getMedia(publishedOnly = true) {
    let query = supabase.from('media').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
    if (publishedOnly) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Media[];
  },

  async createMediaEntry(media: Partial<Media>) {
    const { data, error } = await supabase.from('media').insert([media]).select().single();
    if (error) throw error;
    return data as Media;
  },

  async updateMediaEntry(id: string, media: Partial<Media>) {
    const { data, error } = await supabase.from('media').update(media).eq('id', id).select().single();
    if (error) throw error;
    return data as Media;
  },

  async deleteMediaEntry(id: string) {
    const { error } = await supabase.from('media').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  async uploadFile(file: File, bucket: 'images' | 'videos' | 'documents') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  }
};
