import { getServerSession } from "next-auth/next";
import { Banner } from "./components/banner";
import { SeedDatabase } from "./components/seed-btn";
import { seedCategories } from "./actions/categories";
import { seedNominees } from "./actions/nominees";
import { getCategories } from "@/queries/categories";
import { getNominees } from "@/queries/nominees";
import { authOptions } from "@/api/auth/[...nextauth]/config";
import { getUserByEmail } from "@/queries/users";

export default async function SeedDBPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";
  const { user } = await getUserByEmail({
    email,
  });

  if (!user?.isAdmin)
    return (
      <>
        <Banner />
        <main className="flex flex-col mt-20 text-center text-red-500">
          Sorry! Must be an admin to view this page.
        </main>
      </>
    );

  const { categories } = await getCategories();
  const { nominees } = await getNominees();
  return (
    <>
      <Banner />
      <main className="w-full flex mt-16">
        {/* Order matters here, seed categories before nominees. */}
        <div className="flex flex-col">
          <SeedDatabase
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
          />
        </div>
        <div className="flex flex-col w-full max-w-7xl p-6 m-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-2">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Guide on setting up the database
            </h5>
            <p className="my-2 text-gray-400">
              How to set up the ballot for a new year
            </p>
          </div>
          <section className="my-2 text-sm text-gray-600">
            <div className="flex-col bg-yellow-100/30 p-4">
              <p className="text-sm font-bold mb-2">Quick Start</p>
              <ol className="list-decimal list-inside ml-2">
                <li className="mt-2 code:font-bold">
                  Change <code>NEXT_PUBLIC_OSCARS_DATETIME</code> in{" "}
                  <code>.env.local</code>
                </li>
                <li className="mt-2">Delete DB documents</li>
                <li className="mt-2">Seed categories and nominees documents</li>
                <li className="mt-2">
                  <code>yarn run dev</code> and navigate to index page
                </li>
                <li className="mt-2">
                  <a
                    className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                    href="#about-project"
                  >
                    Read more about the project{" "}
                  </a>
                </li>
              </ol>
            </div>
          </section>

          <section id="about-database" className="my-2 text-sm text-gray-600">
            <h4 className="text-lg font-semibold tracking-tight mt-4 text-gray-700 dark:text-white">
              About the database
            </h4>
            <p className="mt-2">
              I&apos;m using{" "}
              <a
                className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                href="https://www.mongodb.com/atlas/database"
              >
                MongoDB atlas
              </a>
              to store the documents. Information is held in the .env variables.
              The database is seeded with the categories and nominees. This data
              is used to populate the ballot form for voting. The database
              should be seeded before voting opens.
            </p>
          </section>
          <section id="seeding-database" className="my-2 text-sm text-gray-600">
            <h4 className="text-lg font-semibold tracking-tight mt-4 text-gray-700 dark:text-white">
              Instructions on seeding the database.
            </h4>
            <ol className="list-decimal list-inside ml-2">
              <li className="mt-2">
                Remove documents in <code>categories</code> and{" "}
                <code>nominees</code> collections OR create a new DB and
                configure the DB_NAME and MONGODB_URI in the <code>.env</code>{" "}
                variables.
              </li>
              <li className="mt-2">
                Input the correct data in{" "}
                <code>src/app/admin/data/nominees</code> and{" "}
                <code>src/app/admin/data/categories</code>.
              </li>
              <li className="mt-2 flex-col">
                Seed the database by pressing the <code>Seed Categories</code>{" "}
                and <code>Seed nominees</code> buttons on this page. <br />
                <div className="mt-2 flex-col bg-blue-100/50 p-6">
                  <strong>Important: </strong>
                  You must seed the categories before the nominees.
                </div>
              </li>
              <li className="mt-2">
                Navigating to the index page should display the new categories
                and nominees.
              </li>
            </ol>
          </section>

          <section id="env-variables" className="my-2 text-sm text-gray-600">
            <h4 className="text-lg font-semibold tracking-tight mt-4 text-gray-700 dark:text-white">
              Configuring the <code>.env</code> variables
            </h4>
            <div className="mt-2 flex-col">
              The <code>.env</code> file contains the environment variables used
              to connect to the database. See <code>.env.example</code> for some
              additional information on configuring the variables.
              <ul className="my-2 flex-col list-disc list-inside ml-2">
                <li>
                  The <code>MONGODB_URI</code> and <code>DB_NAME</code> are used
                  to connect to the database. The <code>DB_NAME</code> is the
                  name of the database. The <code>MONGODB_URI</code> is the
                  connection string.
                </li>{" "}
                <li>
                  The <code>GOOGLE_CLIENT_ID</code> and{" "}
                  <code>GOOGLE_SECRET</code> are used for using google
                  authentication with the use of the{" "}
                  <code>
                    <a
                      href="https://next-auth.js.org/getting-started/example"
                      className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                    >
                      next-auth
                    </a>
                  </code>{" "}
                  package. <code>NEXTAUTH_URL</code> is used to redirect to the
                  correct URL. <code>NEXTAUTH_SECRET</code> is used to encrypt
                  the session.
                </li>
                <li>
                  The <code>NEXT_PUBLIC_BASE_URL</code> is used to connect to
                  the API routes. The <code>NEXT_PUBLIC_OSCARS_DATETIME</code>{" "}
                  is used to display the year of the Oscars and used to
                  determine when the ballot voting is open.
                </li>
              </ul>
            </div>
            <div className="mt-2 flex-col bg-blue-100/50 p-6">
              <p className="text-sm font-bold mb-2">TLDR</p>
              <p>
                In the future, if nothing has changed with the database, the
                authentication method, or the base url then all you will need to
                update is the `NEXT_PUBLIC_OSCARS_DATETIME` to the date and time
                when the oscars start.
              </p>
            </div>
          </section>

          <section id="about-project" className="my-2 text-sm text-gray-600">
            <h4 className="text-lg font-semibold tracking-tight mt-4 text-gray-700 dark:text-white">
              About the project
            </h4>
            <p className="my-2 text-gray-400">
              Things to know about how this whole thing works.
            </p>
            <div className="mt-2 flex-col space-y-2">
              <p>
                There are two types of user. The admin and the regular user. The
                admin page is protected by the next-auth package and is only
                accessible to the admin user. The admin page is used to seed the
                database with the categories and nominees. The categories and
                nominees are used to populate the ballot form.
              </p>
              <p>
                The user can vote on the nominees up until the ballot closes
                (set by <code>NEXT_PUBLIC_OSCARS_DATETIME</code>) and the oscars
                broadcast starts.
              </p>
              <p>
                The scoreboard component is only accessible when voting is
                closed and displays the score of each user that belongs to the
                same team.
              </p>
              <p>
                You can invite a person to your team by clicking the invite
                button on the dashboard of the index page and entering the email
                in the invite form. Note that right now users can only belong to
                one team.
              </p>
              <p>
                To update the scoring, an admin user must press the{" "}
                <strong>WINNER</strong> button beside the nominee in the ballot.
                This option is only available to the admin once the voting is
                closed. [See{" "}
                <a
                  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                  href="#further-improvements"
                >
                  further improvements
                </a>
                ] section.
              </p>
            </div>
          </section>
          <section
            id="further-improvements"
            className="my-2 text-sm text-gray-600"
          >
            <h4 className="text-lg font-semibold tracking-tight mt-4 text-gray-700 dark:text-white">
              Further Improvements
            </h4>
            <p className="my-2 text-gray-400">
              List of small and big things that would be nice to add.
            </p>
            <ul className="my-2 flex-col ml-2">
              <li className="flex flex-col mt-2">
                <p className="font-medium">
                  Add in progress ballot to local storage
                </p>
                <p className="">
                  If a user doesn&apos;t submit their ballot then all the votes
                  will be lost. Note the user can submit a half filled ballot
                  and return to it later. However I would like to put a local
                  storage option in place to save the ballot in progress to
                  handle a situation in which the user doesn&apos;t submit the
                  ballot.
                </p>
              </li>
              <li className="flex flex-col mt-2">
                <p className="font-medium">Add automatic winner selection</p>
                <p className="">
                  Right now the admin must select the winner for the category
                  winners to update. I would like to add a feature that
                  automatically selects the winner based on either a twitter API
                  or whatever service is available. Unfortunately it seems like
                  twitter API free tier is highly restricted and would not allow
                  for this feature. Maybe this will change in the future.
                </p>
              </li>
              <li className="flex flex-col mt-2">
                <p className="font-medium">Add data viz element</p>
                <p className="">
                  As we collect more data it would be nice to add a data viz.
                  There&apos;s a lot of room for play here, it&apos;s just an
                  idea for the future.
                </p>
              </li>
              <li className="flex flex-col mt-2">
                <p className="font-medium">Add testing</p>
                <p className="">
                  No tests at the moment, this would make things more robust.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
