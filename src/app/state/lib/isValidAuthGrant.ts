import { AuthGrant } from '../../types';

export const isValidAuthGrant = (authGrant: AuthGrant): boolean => {
  const expiresAt = authGrant.created_at + authGrant.expires_in;
  const expiresAtDate = new Date(expiresAt * 1000);
  const now = new Date();

  return expiresAtDate > now;
};
