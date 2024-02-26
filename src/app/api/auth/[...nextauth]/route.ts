import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../../lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "oscars-ballot-users",
  }) as any,
  // session: {
  //   jwt: true,

  //   // Seconds - How long until an idle session expires and is no longer valid.
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  // pages: {
  //   signIn: "/",
  //   newUser: null, // If set, new users will be directed here on first sign in
  // },
});

export { handler as GET, handler as POST };
