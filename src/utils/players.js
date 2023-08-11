export const getMantraRoleWeight = {
  POR: 1,
  DC: 2,
  DD: 3,
  DS: 3,
  M: 4,
  C: 6,
  E: 5,
  W: 7,
  T: 7,
  A: 8,
  PC: 9,
};

export const getMantraRoleColors = {
  por: "#f3b818",
  dd: "#27ae60",
  ds: "#27ae60",
  dc: "#27ae60",
  e: "#109cd9",
  m: "#109cd9",
  c: "#109cd9",
  w: "#B973FF",
  t: "#B973FF",
  a: "#d43f3a",
  pc: "#d43f3a",
};

export const getPlayerFavourableRole = (roles: string) => {
  const roleArray = roles.split(";");
  const mantraRoleWeight = getMantraRoleWeight;
  let role;
  roleArray.forEach((r) => {
    if (
      !role ||
      mantraRoleWeight[r.toUpperCase()] < mantraRoleWeight[role.toUpperCase()]
    ) {
      role = r;
    }
  });
  console.log({role})
  return role;
};
