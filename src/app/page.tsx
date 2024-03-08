import { Dashboard } from "./components/dashboard/";
import { AuthRoute } from "./components/route-wrapper/auth-route";
import { Ballot } from "./components/ballot";
import { getCategories } from "./queries/categories";
import { getUserByEmail, getUsersByTeamId } from "./queries/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/config";
import { Login } from "./components/login";

export default async function Home() {
  const { categories } = await getCategories();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";
  const { user } = await getUserByEmail({
    email,
  });
  const { users: teamMembers } = await getUsersByTeamId({
    teamId: user?.teamId,
  });
  // if no team, the user is the only one in the team
  const team = teamMembers.length > 0 ? teamMembers : user ? [user] : [];
  return (
    <main className="flex min-h-screen flex-col min-w-72">
      {(!session || !session.user) && <Login />}
      <AuthRoute>
        <Dashboard team={teamMembers} />
        <Ballot
          categories={categories}
          ballot={user?.ballot}
          team={team}
          isAdmin={user?.isAdmin}
        />
      </AuthRoute>
    </main>
  );
}
