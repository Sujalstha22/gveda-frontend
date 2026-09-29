/**
 * Types & DTOs for GVEDA Authentication & Registration (GBO / Associate & Customer)
 */

export type AuthMode = 'login' | 'signup';

export type Gender = 'male' | 'female' | 'other';

export type NidType =
  | 'citizenship'
  | 'national_id'
  | 'passport'
  | 'driving_license'
  | string;

/**
 * Regular User / Customer Registration Payload (isDist: false or omitted)
 */
export interface RegisterUserDto {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  sponsorId: string;
  isDist?: false;
}

/**
 * Distributor / Associate (GBO) Registration Payload (isDist: true)
 */
export interface RegisterDistributorDto {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  sponsorId: string;
  isDist: true;
  alternatePhone?: string;
  gender: Gender | string;
  dateOfBirth: string; // Format: YYYY-MM-DD
  nidType: NidType;
  nidNumber: string;
  provinceId?: number;
  districtId?: number;
  localLevelId?: number;
  typeId?: number;
  ward?: number;
  street?: string;
  currentAddress?: string;
  currentDistrict?: string;
  understandIncome: boolean;
  agreeToDistributor: boolean;
  confirmInformation: boolean;
}

export type RegisterPayload = RegisterUserDto | RegisterDistributorDto;

/**
 * Login Credentials Payload
 */
export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * API Response Interfaces
 */
export interface RegisterResponse {
  message: string;
  results?: unknown;
  user?: unknown;
}

export interface UserProfile {
  _id?: string;
  id?: string | number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  isDist?: boolean;
  sponsorId?: string;
  [key: string]: unknown;
}

export interface LoginResponse {
  message?: string;
  token?: string;
  accessToken?: string;
  user?: UserProfile;
  results?: {
    token?: string;
    accessToken?: string;
    user?: UserProfile;
    [key: string]: unknown;
  };
}
