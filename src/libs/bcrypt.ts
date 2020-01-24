import bcrypt from "bcrypt";

const saltRounds = 10;

export async function genPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}
