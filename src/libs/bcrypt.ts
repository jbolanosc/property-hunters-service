import bcrypt, { hashSync } from "bcrypt";

const saltRounds = 10;

export async function genPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export async function passwordCompareSync(
  passwordToTest,
  passwordHash
): Promise<boolean> {
  console.log(passwordToTest);
  console.log(passwordHash);
  return bcrypt.compareSync(passwordToTest, passwordHash);
}
