export interface Note {
  id?: number;
  title: string;
  description: string;
  images: string[];
  color: string | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
