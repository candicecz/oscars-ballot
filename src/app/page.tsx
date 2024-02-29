import { Dashboard } from "./components/dashboard/";
import { BallotForm } from "./components/ballot-form";
import { LoginButton } from "./components/login-btn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <LoginButton />
      <Dashboard />
      <BallotForm />
    </main>
  );
}
