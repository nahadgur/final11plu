import catalog from '@/data/schools.catalog.json';

export type SchoolCategory = 'grammar' | 'private';

export type School = {
  id: string;
  name: string;
  category: SchoolCategory;

  // Server-only "source material" location (never exposed to users).
  // Place PDFs under /source/past-papers/<school-id>/
  sourcePdfDir?: string;

  // Optional internal notes.
  notes?: string;
};

// Public-facing list used for dropdowns & routing.
// IMPORTANT: keep this as metadata only. PDFs remain server-only.
export const SCHOOLS: School[] = (catalog as unknown as School[]).map((s) => ({
  ...s,
  // Normalise category strings from JSON.
  category: (s.category === 'grammar' ? 'grammar' : 'private') as SchoolCategory,
}));

export function schoolsByCategory(category: SchoolCategory): School[] {
  return SCHOOLS.filter((s) => s.category === category);
}

export function getSchoolById(id: string): School | undefined {
  return SCHOOLS.find((s) => s.id === id);
}
