import { ObjectId } from "mongodb";

export interface Category {
  _id: string;
  name: string;
}

export interface Nominee {
  _id: string;
  name: string;
  categoryId: string;
  film: string;
  credits: string;
}

export interface NomineeWithUserVote {
  _id: string;
  name: string;
  categoryId: string;
  film: string;
  credits: string;
  votedBy: User[];
}

export interface CategoryWithNominees extends Category {
  nominees: Nominee[];
}

export interface CategoryWithNomineesAndVotes extends Category {
  nominees: NomineeWithUserVote[];
}

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
  teamId?: string;
  ballot: { [key: Category["_id"]]: Nominee["_id"] };
}
