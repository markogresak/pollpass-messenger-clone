import { mockAuthGrant } from 'src/app/fixtures/mockAuthGrant';
import { AuthGrant } from 'src/app/types';
import { isValidAuthGrant } from './isValidAuthGrant';

describe('isValidAuthGrant', () => {
  const expiresIn = 1000;
  const now = () => Math.floor(Date.now() / 1000);

  it('should return true when expiration date is in the future', () => {
    const justCreated: AuthGrant = {
      ...mockAuthGrant,
      created_at: now(),
      expires_in: expiresIn,
    };
    const aboutToExpire: AuthGrant = {
      ...mockAuthGrant,
      created_at: now() - (expiresIn - 3),
      expires_in: expiresIn,
    };
    expect(isValidAuthGrant(justCreated)).toBeTrue();
    expect(isValidAuthGrant(aboutToExpire)).toBeTrue();
  });

  it('should return false when the expiration date is in the past', () => {
    const expired: AuthGrant = {
      ...mockAuthGrant,
      created_at: now() - expiresIn,
      expires_in: expiresIn,
    };
    expect(isValidAuthGrant(expired)).toBeFalse();
  });
});
