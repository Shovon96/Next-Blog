export interface Author {
  id: number;
  name: string;
  email: string;
  picture: string;
  isVerified: boolean;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  tags: string[];
  views: number;
  authorId: number;
  author: Author;
}
