export interface Testimonial {
  id: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
}