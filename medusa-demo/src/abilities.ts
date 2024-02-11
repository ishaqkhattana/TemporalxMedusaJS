// // src/abilities.ts
import { PureAbility, defineAbility } from '@casl/ability';

export const defineAbilitiesForUser = (user) => {
    const ability = new PureAbility()
    return defineAbility((can, cannot) => {
    if (user.role == "admin") {
        can("read", "all")
    } 
  });
};
