export interface Nominee {
  _id: string;
  name: string;
  categoryId: string;
  film: string;
  credits: string;
}

export interface Category {
  _id: string;
  name: string;
}
