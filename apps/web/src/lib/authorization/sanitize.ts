/** Remove caracteres de controle e normaliza espaços. */
export function sanitizeText(input: string, max: number): string {
  let out = "";
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    if (c === 0) continue;
    if (c < 32 && c !== 9 && c !== 10 && c !== 13) continue;
    if (c === 127) continue;
    out += input[i];
  }
  return out.trim().slice(0, max);
}
