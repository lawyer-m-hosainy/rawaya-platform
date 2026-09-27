import { supabase } from '../lib/supabase';

export interface Enrollment {
  id: string;
  parent_name: string;
  child_name: string;
  child_age: string;
  phone: string;
  program_title: string;
  learning_mode?: string;
  city?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
  created_at: string;
}

export const enrollmentService = {
  async getEnrollments() {
    const { data, error } = await supabase.from('enrollments').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data as Enrollment[];
  },

  async createEnrollment(enrollment: Partial<Enrollment>) {
    const { data, error } = await supabase.from('enrollments').insert([enrollment]).select().single();
    if (error) throw error;
    return data as Enrollment;
  },

  async updateEnrollmentStatus(id: string, status: Enrollment['status']) {
    const { data, error } = await supabase.from('enrollments').update({ status }).eq('id', id).select().single();
    if (error) throw error;
    return data as Enrollment;
  },

  async deleteEnrollment(id: string) {
    const { error } = await supabase.from('enrollments').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};
