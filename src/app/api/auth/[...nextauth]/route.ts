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
});

export { handler as GET, handler as POST };
