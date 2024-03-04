import { Dashboard } from "@/components/dashboard";
import { Banner } from "./components/banner";
import { SeedDatabase } from "./components/seed-btn";
import { AuthRoute } from "@/components/route-wrapper/auth-route";
import { seedCategories } from "./actions/categories";
import { seedNominees } from "./actions/nominees";
import { getCategories } from "@/queries/categories";
import { getNominees } from "@/queries/nominees";

export default async function SeedDBPage() {
  const { categories } = await getCategories();
  const { nominees } = await getNominees();
  return (
    <>
      <Banner />
      <main className="flex flex-col mt-16">
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
        {/* Order matters here, seed categories before nominees. */}
        {/* <SeedDatabase
          count={categories.length}
          description="Seed categories before seeding nominees."
          label="Seed Categories"
          seedFn={seedCategories}
        />
        <SeedDatabase
          count={nominees.length}
          description="Seed nominees once categories are available."
          label="Seed Nominees"
          seedFn={seedNominees}
        /> */}
      </main>
    </>
  );
}
