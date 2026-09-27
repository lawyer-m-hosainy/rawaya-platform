import { supabase } from '../lib/supabase';

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  age_range: string;
  format: string;
  duration: string;
  description: string;
  highlights: string[];
  badge?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export const programService = {
  async getPrograms(activeOnly = true) {
    let query = supabase.from('programs').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
    if (activeOnly) {
      query = query.eq('is_active', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Program[];
  },

  async createProgram(program: Partial<Program>) {
    const { data, error } = await supabase.from('programs').insert([program]).select().single();
    if (error) throw error;
    return data as Program;
  },

  async updateProgram(id: string, program: Partial<Program>) {
    const { data, error } = await supabase.from('programs').update(program).eq('id', id).select().single();
    if (error) throw error;
    return data as Program;
  },

  async deleteProgram(id: string) {
    const { error } = await supabase.from('programs').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};
