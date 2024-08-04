import NextAuth from 'next-auth';
import GoogleProvider  from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code&prompt=consent&access_type=offline"
    })
  ],
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up'
  },
  callbacks: {
    // When updated JWT (for example sign-in)
    async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
            token.id = user.id;
        }

        if (account?.id_token) {
            token.access_token = account.id_token;
        }
        return token;
    },
    // For each useSession() hook call
    async session({ session, token }) {
        session.user.id = token.id ?? null;
        session.access_token = token.access_token ?? null;
        return session;
    },    
    async redirect({url}) {
        return url;
    }
  }
});
