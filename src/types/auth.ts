export type UserRole =
  | "ADMIN"
  | "USUARIO"
  | "DISTRIBUIDOR";

export interface User {
  id: string;
  name: string;
  carnet: string;
  role: UserRole;
}

export interface UserRecord extends User {
  password: string;

  // Datos adicionales para distribuidores
  email?: string;
  phone?: string;
  businessName?: string;
  nit?: string;
  address?: string;
  city?: string;
  businessType?: string;
  experience?: string;
}

export interface LoginCredentials {
  carnet: string;
  password: string;
}

export interface RegisterData {
  name: string;
  carnet: string;
  password: string;
}

export interface DistributorRegisterData {
  name: string;
  carnet: string;
  password: string;
  email: string;
  phone: string;
  businessName: string;
  nit: string;
  address: string;
  city: string;
  businessType: string;
  experience: string;
}