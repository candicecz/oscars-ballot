import { Dashboard } from "./components/dashboard/";
import { LoginButton } from "./components/login-btn";
import { AuthRoute } from "./components/route-wrapper/auth-route";
import { Ballot } from "./components/ballot";
import { getCategories } from "./queries/categories";

export default async function Home() {
  const { categories } = await getCategories();
  return (
    <main className="flex min-h-screen flex-col">
      <LoginButton />
      <AuthRoute>
        <Dashboard />
        <Ballot categories={categories} />
      </AuthRoute>
    </main>
  );
}
