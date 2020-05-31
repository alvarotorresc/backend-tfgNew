import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const RolesKey = 'roles';

export type Role = 'unauthenticated' | 'researcher' | 'admin';

export const Roles = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata(RolesKey, roles);
