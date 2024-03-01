export interface Nominee {
  _id: string;
  name: string;
  details: {
    film: string;
    individuals?: { name?: string; type?: string }[];
  };
  categoryId: string;
}

export interface Category {
  _id: string;
  name: string;
  nominees?: Nominee[];
}
