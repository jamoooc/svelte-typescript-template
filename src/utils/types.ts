export type Review = {
  review: string;
  reviewer: string;
  work: string;
};

export type ImageSrcSet = {
  src: string;
  srcset: string;
  sizes: string;
  description: string;
}

export interface GalleryImageSrcSet extends ImageSrcSet {
  id: number;
  date: Date;
}

export type Biography = { 
  text: string; 
}

export type RepertoireItem = {
  role: string; 
  title: string;
}

export type Repertoire = {
  opera: RepertoireItem[] | null
  concert: RepertoireItem[] | null
  surname: string;
}

export type Performance = {
  datetimes: Array<string|null>;
  duptimes: Array<string|null>;
  title: string|null;
  work_title: string|null;
  role: string;
  description: string;
  surname: string;
  location: string;
  company_name: string|null;
  company_url: string|null;
  booking_url: string|null;
}

export interface FormState {
  loading: Boolean;
  submitting: Boolean;
  submitted: Boolean;
  error: Boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RepertoireData {
  composerID: number;
  title: string;
  role?: string|null;
  type: '' | 'concert' | 'opera';
  repList: boolean;
}

export interface ComposerData {
  id: number;
  forename: string;
  surname: string;
}
