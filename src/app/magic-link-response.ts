export interface MagicLinkResponse {
  access_token: string;
  /**
   * UNIX timestamp (in seconds)
   */
  created_at: number;
  /**
   * Expiration time in seconds.
   */
  expires_in: number;
  refresh_token: string;
  scope: 'magic_link';
  token_type: string;
}
