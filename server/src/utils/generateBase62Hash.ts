export function generateBase62Hash(counter: number) {
  const base62 =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let hash = "";
  let temp = counter;
  while (temp > 0) {
    let digit = temp % 62;
    hash += base62[digit];
    temp = Math.floor(temp / 10);
  }

  while (hash.length < 7) {
    hash += base62[Math.floor(Math.random() * 62)];
  }
  return hash;
}
