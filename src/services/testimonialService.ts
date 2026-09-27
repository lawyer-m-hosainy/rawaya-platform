import { supabase } from '../lib/supabase';

export interface Testimonial {
  id: string;
  parent_name: string;
  child_name?: string;
  child_age?: string;
  location?: string;
  text: string;
  impact_highlight?: string;
  is_published: boolean;
  created_at: string;
}

export const testimonialService = {
  async getTestimonials(publishedOnly = true) {
    let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (publishedOnly) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Testimonial[];
  },

  async createTestimonial(testimonial: Partial<Testimonial>) {
    const { data, error } = await supabase.from('testimonials').insert([testimonial]).select().single();
    if (error) throw error;
    return data as Testimonial;
  },

  async updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
    const { data, error } = await supabase.from('testimonials').update(testimonial).eq('id', id).select().single();
    if (error) throw error;
    return data as Testimonial;
  },

  async deleteTestimonial(id: string) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};
