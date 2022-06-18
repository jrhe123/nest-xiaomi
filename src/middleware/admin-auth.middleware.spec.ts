import { AdminAuthMiddleware } from './admin-auth.middleware';

describe('AdminAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AdminAuthMiddleware()).toBeDefined();
  });
});
