import Head from "next/head";
import Cover from "components/Cover";
import Filter from "components/Filter";
import Layout from "components/Layout";
// import Events from "Events.json";
import { API_URL } from "utils/urls";
import Card from "components/Card";

export default function Home({ events }) {
  return (
    <Layout>
      <div className="home">
        <Head>
          <title>Eventhut</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Cover />
        <Filter />
        <h3 className="container home__heading">Upcomming Events</h3>
        <div className="container cards">
          {events.map((e) => (
            <Card data={e} key={e.id} />
          ))}
        </div>
        <style jsx>
          {`
            .cards {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              row-gap: 40px;
              column-gap: 20px;
              padding: 50px 0;
            }
            .home__heading {
              margin-top: 9rem;
              margin-bottom: 4rem;
              font-size: 3rem;
              font-weight: 600;
              color: var(--text-color);
            }

            .home__loading {
              display: flex;
              justify-content: center;
              width: 100%;
            }

            @media (max-width: 1100px) {
              .home__heading {
                font-size: 2rem;
                margin-top: 5rem;
              }
            }

            @media (max-width: 600px) {
              .home__heading {
                font-size: 2rem;
                margin-top: 5rem;
              }
            }
          `}
        </style>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const events_res = await fetch(`${API_URL}/events`);
  const events = await events_res.json();

  return {
    props: {
      events: events,
    },
  };
}
