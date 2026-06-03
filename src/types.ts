export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Trainer {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  image: string;
}

export interface MembershipPlan {
  id: string;
  title: string;
  duration: number; // months
  price: number;
  features: string[];
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
}

export interface Blog {
  id: string;
  title: string;
  snippet: string;
  content: string;
  image: string;
  date: string;
}
