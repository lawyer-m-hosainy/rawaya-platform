import { supabase } from '../lib/supabase';

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export const settingsService = {
  async getSettings() {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) throw error;
    
    // Convert array of settings to a key-value object
    const settingsMap: Record<string, string> = {};
    if (data) {
      data.forEach((setting: SiteSetting) => {
        settingsMap[setting.key] = setting.value;
      });
    }
    return settingsMap;
  },

  async updateSetting(key: string, value: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)
      .select()
      .single();
      
    // If not found, insert it
    if (error && error.code === 'PGRST116') {
        const { data: insertData, error: insertError } = await supabase
          .from('site_settings')
          .insert([{ key, value }])
          .select()
          .single();
        if (insertError) throw insertError;
        return insertData as SiteSetting;
    } else if (error) {
        throw error;
    }
    return data as SiteSetting;
  }
};
