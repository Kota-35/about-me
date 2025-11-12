export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  details?: string[]; // 長い詳細情報（インターンなど）用
  tags?: string[];
}
