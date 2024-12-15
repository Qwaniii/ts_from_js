export default function uniqKey(): string  {
  const uniqKEY: string = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return uniqKEY
}
