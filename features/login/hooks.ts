import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { registerUser, loginUser } from "./api";
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
} from "./interface";

/**
 * Mutation hook for registering a customer or GBO associate distributor.
 */
export function useRegisterMutation(
  options?: UseMutationOptions<RegisterResponse, Error, RegisterPayload>
) {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    ...options,
  });
}

/**
 * Mutation hook for user login authentication.
 */
export function useLoginMutation(
  options?: UseMutationOptions<LoginResponse, Error, LoginPayload>
) {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    ...options,
  });
}
