import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const schema = z.object({
  parentName: z.string().min(2, "الاسم مطلوب (على الأقل حرفين)"),
  childName: z.string().min(2, "اسم الابن/الابنة مطلوب"),
  phone: z.string().regex(/^(01|\+201)[0125][0-9]{8}$/, "رقم الواتساب يجب أن يكون مصرياً صحيحاً (مثال: 01012345678)"),
  childAge: z.coerce.number().min(4, "العمر يجب أن يكون 4 سنوات على الأقل").max(18, "العمر يجب أن يكون 18 سنة كحد أقصى"),
  programTitle: z.string().min(1, "يرجى اختيار البرنامج"),
});

describe('Enrollment Zod Schema Validation', () => {
  it('accepts valid data', () => {
    const validData = {
      parentName: 'Ahmed Ali',
      childName: 'Omar',
      phone: '01012345678',
      childAge: '10',
      programTitle: 'Program 1',
    };
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid WhatsApp number', () => {
    const invalidData = {
      parentName: 'Ahmed Ali',
      childName: 'Omar',
      phone: '123456', // Invalid
      childAge: '10',
      programTitle: 'Program 1',
    };
    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('phone');
    }
  });

  it('rejects invalid age (too young)', () => {
    const invalidData = {
      parentName: 'Ahmed Ali',
      childName: 'Omar',
      phone: '01012345678',
      childAge: '3', // Invalid (min 4)
      programTitle: 'Program 1',
    };
    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('childAge');
    }
  });

  it('rejects invalid age (too old)', () => {
    const invalidData = {
      parentName: 'Ahmed Ali',
      childName: 'Omar',
      phone: '01012345678',
      childAge: '19', // Invalid (max 18)
      programTitle: 'Program 1',
    };
    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('childAge');
    }
  });
});
