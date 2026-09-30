import { api } from "@/shared/api";
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
} from "./interface";

export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
  sponsor: (sponsorId: string) => [...authKeys.all, "sponsor", sponsorId] as const,
};


export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  return api<RegisterResponse>("auth/register/main", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  return api<LoginResponse>("auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifySponsor(sponsorId: string): Promise<{ valid: boolean; sponsorName?: string; message?: string }> {
  return api<{ valid: boolean; sponsorName?: string; message?: string }>(`auth/sponsor/verify/${encodeURIComponent(sponsorId)}`);
}
