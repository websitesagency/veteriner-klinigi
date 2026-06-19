export type PetType =
  | 'kopek'
  | 'kedi'
  | 'kus'
  | 'tavsan'
  | 'hamster'
  | 'balik'
  | 'surungenler'
  | 'egzotik';

export interface Pet {
  id: string;
  patient_number: string;
  name: string;
  species: PetType;
  breed: string;
  birth_date: string;
  gender: 'erkek' | 'disi';
  weight_kg: number;
  color: string;
  microchip_number?: string;
  is_neutered: boolean;
  allergies: string[];
  chronic_conditions: string[];
  owner_id: string;
  photo_url?: string;
}

export interface Owner {
  id: string;
  owner_number: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  emergency_contact?: string;
  pets: string[];
  notes: string;
}

export interface Appointment {
  id: string;
  appointment_number: string;
  pet_id: string;
  owner_id: string;
  service_id: string;
  veterinarian_id: string;
  appointment_type: 'muayene' | 'kontrol' | 'acil' | 'operasyon';
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
  prescriptions?: string[];
  notes: string;
}

export interface VaccineRecord {
  id: string;
  pet_id: string;
  vaccine_type: 'karma' | 'kuduz' | 'leptospiroz' | 'bordetella' | 'lyme' | 'fiv' | 'felv';
  administered_date: string;
  next_due_date: string;
  batch_number: string;
  veterinarian_id: string;
  notes?: string;
}

export interface Inventory {
  id: string;
  name: string;
  category: 'ilac' | 'asi' | 'malzeme' | 'mama';
  quantity: number;
  unit: 'adet' | 'ml' | 'mg' | 'kg';
  min_quantity: number;
  expiry_date?: string;
  supplier: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price_range: string;
  icon: string;
  duration_minutes: number;
}

export interface Veterinarian {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}
