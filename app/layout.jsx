import './globals.css';
import { profile } from '@/lib/portfolio';
export const metadata = {
  title: `${profile.fullName} — Developer Portfolio`,
  description: 'Irodaning veb-dasturlash olami. React, Next.js va ijodiy loyihalar.',
  icons: { icon: '/icon.svg' },
};
export const viewport = { themeColor: '#100d10' };
export default function RootLayout({ children }) {
  return <html lang="uz"><body>{children}</body></html>;
}
