const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)];
  }
  return `CAM-${code}-${year}`;
}
