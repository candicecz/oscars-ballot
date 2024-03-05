import { Dashboard } from "./components/dashboard/";
import { LoginButton } from "./components/login-btn";
import { AuthRoute } from "./components/route-wrapper/auth-route";
import { Ballot } from "./components/ballot";
import { getCategories } from "./queries/categories";
import { getUserByEmail } from "./queries/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const { categories } = await getCategories();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";
  const { user } = await getUserByEmail({
    email,
  });
  return (
    <main className="flex min-h-screen flex-col min-w-72">
      <LoginButton />
      <AuthRoute>
        <Dashboard />
        <Ballot categories={categories} ballot={user?.ballot} />
      </AuthRoute>
    </main>
  );
}
