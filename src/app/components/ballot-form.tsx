export const BallotForm = async () => {
  const { nominations } = await getData();
  return (
    <>
      {nominations.nominees.map((nominee) => (
        <div key={nominee.film}>{nominee.film}</div>
      ))}
    </>
  );
};

async function getData() {
  // const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  // return res.json()
  return {
    nominations: {
      category: "Best Picture",
      nominees: [
        {
          film: "American Fiction",
          producers: [
            "Ben LeClair",
            "Nikos Karamigios",
            "Cord Jefferson",
            "Jermaine Johnson",
          ],
        },
        {
          film: "Anatomy of a Fall",
          producers: ["Marie-Ange Luciani", "David Thion"],
        },
        {
          film: "Barbie",
          producers: [
            "David Heyman",
            "Margot Robbie",
            "Tom Ackerley",
            "Robbie Brenner",
          ],
        },
        { film: "The Holdovers", producers: ["Mark Johnson"] },
        {
          film: "Killers of the Flower Moon",
          producers: [
            "Dan Friedkin",
            "Bradley Thomas",
            "Martin Scorsese",
            "Daniel Lupi",
          ],
        },
        {
          film: "Maestro",
          producers: [
            "Bradley Cooper",
            "Steven Spielberg",
            "Fred Berner",
            "Amy Durning",
            "Kristie Macosko Krieger",
          ],
        },
        {
          film: "Oppenheimer",
          producers: ["Emma Thomas", "Charles Roven", "Christopher Nolan"],
        },
        {
          film: "Past Lives",
          producers: ["David Hinojosa", "Christine Vachon", "Pamela Koffler"],
        },
        {
          film: "Poor Things",
          producers: [
            "Ed Guiney",
            "Andrew Lowe",
            "Yorgos Lanthimos",
            "Emma Stone",
          ],
        },
        { film: "The Zone of Interest", producers: ["James Wilson"] },
      ],
    },
  };
}
