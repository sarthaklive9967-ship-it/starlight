import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: { email: {}, password: {} },
      authorize(credentials) {
        const parsed = z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse(credentials);
        if (!parsed.success || !process.env.DEMO_USER_EMAIL || parsed.data.email !== process.env.DEMO_USER_EMAIL) return null;
        return { id: 'demo-user', email: parsed.data.email, name: 'Demo User' };
      },
    }),
  ],
  pages: { signIn: '/dashboard' },
});
