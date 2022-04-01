export type Review = {
  review: string;
  reviewer: string;
  work: string;
};

export type ImageSrcSet = {
  src: string;
  srcset: string;
  sizes: string;
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
