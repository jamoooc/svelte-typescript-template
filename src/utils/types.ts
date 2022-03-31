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
