/**
 * Registration & Lead Persistence Service
 * Stores parent applications reliably in localStorage with export & management capabilities.
 */

export interface EnrollmentLead {
  id: string;
  createdAt: string;
  parentName: string;
  childName: string;
  childAge: string | number;
  phone: string;
  programTitle: string;
  learningMode: 'in-person' | 'online' | 'hybrid';
  city?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
}

const STORAGE_KEY = 'rawaya_enrollment_leads_v1';

export const leadStorage = {
  getLeads(): EnrollmentLead[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to load leads from localStorage', err);
      return [];
    }
  },

  saveLead(
    leadData: Omit<EnrollmentLead, 'id' | 'createdAt' | 'status'>
  ): EnrollmentLead {
    const leads = this.getLeads();
    const newLead: EnrollmentLead = {
      ...leadData,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    leads.unshift(newLead);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      // Dispatch custom event so open admin dashboards update reactively
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('rawaya:lead_created', { detail: newLead }));
      }
    } catch (err) {
      console.error('Failed to save lead', err);
    }
    return newLead;
  },

  updateLeadStatus(id: string, status: EnrollmentLead['status']): boolean {
    const leads = this.getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return false;

    leads[index].status = status;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('rawaya:leads_updated'));
      }
      return true;
    } catch (err) {
      console.error('Failed to update lead status', err);
      return false;
    }
  },

  deleteLead(id: string): boolean {
    const leads = this.getLeads().filter((l) => l.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('rawaya:leads_updated'));
      }
      return true;
    } catch (err) {
      console.error('Failed to delete lead', err);
      return false;
    }
  },

  exportToCSV(): void {
    const leads = this.getLeads();
    if (leads.length === 0) {
      alert('لا توجد طلبات تسجيل مسجلة حالياً لتصديرها.');
      return;
    }

    // Sanitize fields to prevent CSV Formula Injection (=, +, -, @, \t, \r, \n)
    const sanitize = (field: string): string => {
      if (!field) return '';
      const dangerous = ['=', '+', '-', '@', '\t', '\r', '\n'];
      let s = field.replace(/"/g, '""');
      if (dangerous.some((ch) => s.startsWith(ch))) {
        s = "'" + s;
      }
      return s;
    };

    const headers = [
      'التاريخ والوقت',
      'اسم ولي الأمر',
      'اسم الطفل',
      'عمر الطفل',
      'رقم الهاتف',
      'المسار المطلوب',
      'طريقة الحضور',
      'المدينة',
      'ملاحظات',
      'حالة الطلب',
    ];

    const statusTranslations: Record<string, string> = {
      new: 'جديد (لم يتم التواصل)',
      contacted: 'تم التواصل',
      confirmed: 'تم تأكيد الحجز',
      cancelled: 'ملغي',
    };

    const modeTranslations: Record<string, string> = {
      'in-person': 'حضوري (المنصورة)',
      online: 'عن بُعد (زووم)',
      hybrid: 'مختلط',
    };

    const rows = leads.map((l) => [
      `"${sanitize(new Date(l.createdAt).toLocaleString('ar-EG'))}"`,
      `"${sanitize(l.parentName)}"`,
      `"${sanitize(l.childName)}"`,
      `"${sanitize(String(l.childAge || ''))}"`,
      `"${sanitize(l.phone)}"`,
      `"${sanitize(l.programTitle)}"`,
      `"${modeTranslations[l.learningMode] || l.learningMode}"`,
      `"${sanitize(l.city || '')}"`,
      `"${sanitize(l.notes || '')}"`,
      `"${statusTranslations[l.status] || l.status}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `rawaya_enrollments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
