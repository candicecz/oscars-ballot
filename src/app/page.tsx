import { Dashboard } from "./components/dashboard/";
import { BallotForm } from "./components/ballot-form";
import { LoginButton } from "./components/login-btn";
import { AuthRoute } from "./components/route-wrapper/auth-route";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <LoginButton />
      <AuthRoute>
        <Dashboard />
        <BallotForm />
      </AuthRoute>
    </main>
  );
}
