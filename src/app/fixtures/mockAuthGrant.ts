import { AuthGrant } from '../types';

export const mockAuthGrant: AuthGrant = {
  access_token: 'some-access-token',
  token_type: 'Bearer',
  expires_in: 21600,
  refresh_token: 'some-refresh-token',
  scope: 'magic_link',
  created_at: 1615353517,
};
