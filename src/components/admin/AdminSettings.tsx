import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { settingsService } from '../../services/settingsService';

export function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      alert('حدث خطأ أثناء تحميل الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Save each setting
      const promises = Object.entries(settings).map(([key, value]) => 
        settingsService.updateSetting(key, value)
      );
      await Promise.all(promises);
      alert('تم حفظ الإعدادات بنجاح!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 text-right max-w-3xl mx-auto">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">إعدادات الموقع العامة</h2>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">جاري التحميل...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">معلومات التواصل</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">رقم الواتساب (بالصيغة الدولية، مثلاً +2010...)</label>
                <input
                  type="text"
                  value={settings['phone'] || ''}
                  onChange={e => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  dir="ltr"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني الرسمي</label>
                <input
                  type="email"
                  value={settings['email'] || ''}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الرسالة الافتراضية عند الضغط على زر الواتساب</label>
              <textarea
                value={settings['whatsapp_message'] || ''}
                onChange={e => handleChange('whatsapp_message', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-20"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">روابط التواصل الاجتماعي</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">رابط فيسبوك (Facebook)</label>
              <input
                type="url"
                value={settings['facebook_url'] || ''}
                onChange={e => handleChange('facebook_url', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                dir="ltr"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">رابط إنستجرام (Instagram)</label>
              <input
                type="url"
                value={settings['instagram_url'] || ''}
                onChange={e => handleChange('instagram_url', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                dir="ltr"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">رابط يوتيوب (YouTube)</label>
              <input
                type="url"
                value={settings['youtube_url'] || ''}
                onChange={e => handleChange('youtube_url', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                dir="ltr"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={20} />
              <span>{saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
