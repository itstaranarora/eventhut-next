import Link from "next/link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Events from "Events.json";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import Head from "next/head";
import { API_URL } from "utils/urls";
import Booking from "components/Booking";
import Card from "components/Card";
import DefaultErrorPage from "next/error";

function Event({ event }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="event__loading">
        <img src="/Logo.svg" alt="logo" />
      </div>
    );
  }

  if (!event) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  const { slug } = router.query;
  const response = event;

  //   if (loading) {
  //     return (
  //       <div className="event__loading">
  //         <img src={darkMode ? logoDark : Logo} alt="logo" />
  //       </div>
  //     );
  //   }

  return (
    <Layout>
      <div className="event">
        <Head>
          <title>{response?.name}</title>
          <meta name="description" content={response?.description}></meta>
        </Head>
        <div
          className="event__cover"
          style={{
            backgroundImage: `url(${response?.imgURL})`,
          }}
        >
          <div className="event__layout container">
            <div className="event__text">
              <Link href="/">
                <a className="event__back">
                  <ArrowBackIcon />
                  <span>Back</span>
                </a>
              </Link>
              <div className="event__coverinfo">
                <h2>{response?.name}</h2>
                <span>By {response?.user.name}</span>
                <p>
                  {response?.address.location} <br />
                  {response?.address.city}, {response?.address.state},{" "}
                  {response?.address.country},
                </p>
              </div>
            </div>
            <div className="event__datebox">
              <Booking data={response} />
            </div>
          </div>
        </div>
        <div className="event__content container">
          <div className="event__description">
            <h3>Description</h3>
            <p>{response?.description}</p>
          </div>
          <div className="event__location">
            <div className="event__mobile">
              <Booking data={response} />
            </div>
            <h3>Organizer</h3>
            <img
              alt="binod"
              src="https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            />
            <span>{response?.user.username}</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              corporis exercitationem doloremque totam voluptatum est
            </p>
          </div>
        </div>

        <div className="event__otherevents ">
          <div className="container">
            <h2 style={{ marginTop: "100px", marginBottom: "50px" }}>
              Other Events You May Like
            </h2>
            <div className="cards">
              {Events.map((e) => (
                <Card data={e} key={e.id} />
              ))}
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .event__cover {
              height: 70vh;
              background-repeat: no-repeat;
              background-size: cover;
              border-radius: 0.7rem;
              background-position: center;
              width: 100%;
              padding: 0 20px;
              max-width: 1400px;
              margin: 0 auto;
              display: flex;
              align-items: center;
              position: relative;
            }

            .event__layout {
              display: flex;
              width: 100%;
              filter: none;
              justify-content: space-between;
            }

            .event__back {
              display: flex;
              position: absolute;
              top: 10%;
              width: 90px;
              justify-content: space-between;
              align-items: center;
              font-size: 1.3rem;
              align-items: center;
              font-weight: 600;
              color: white;
              text-decoration: none;
            }

            .event__text {
              width: 50%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            }

            .event__datebox {
              display: flex;
              align-items: center;
              justify-content: right;
            }

            .event__coverinfo > h2 {
              margin-bottom: 1rem;
              font-size: 3rem;
              font-weight: 600;
              text-transform: capitalize;
              color: white;
            }

            .event__coverinfo > span {
              color: white;
              font-weight: 500;
              text-transform: capitalize;
            }

            .event__coverinfo > p {
              color: white;
              font-size: 1.2rem;
              text-transform: capitalize;
              margin: 2rem 0;
            }

            .event__content {
              display: flex;
              margin-top: 8rem;
            }

            .event__description {
              width: 70%;
              padding-right: 10rem;
            }

            .event__description > h3 {
              font-size: 2rem;
              font-weight: 500;
              margin: 1rem 0;
              color: var(--text-color);
            }

            .event__description > p {
              color: var(--secondary-color);
            }

            .event__location > h3 {
              margin: 1rem 0;
              font-size: 2rem;
              font-weight: 500;
              color: var(--text-color);
            }

            .event__location {
              width: 30%;
            }

            .event__location > img {
              width: 100%;
              object-fit: contain;
              margin-bottom: 1rem;
            }

            .event__location > span {
              font-size: 1.5rem;
              font-weight: 500;
              color: var(--text-color);
              text-transform: capitalize;
            }

            .event__mobile {
              display: none;
            }

            .event__location > p {
              color: var(--secondary-color);
              margin: 0.5rem 0;
            }

            .event__otherevents {
              overflow: hidden;
              background-color: var(--bg-color);
              margin-top: 10rem;
              padding-bottom: 8rem;
            }

            .event__otherevents > h2 {
              font-size: 3rem;
              font-weight: 500;
              color: var(--text-color);
            }

            .cards {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 15px;
              padding: 30px 0;
            }

            @media (max-width: 1100px) {
              .cards {
                grid-template-columns: 1fr 1fr;
              }
            }

            @media (max-width: 1100px) {
              .cards {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1rem;
              }
              .event__cover {
                border-radius: 0%;
                flex-direction: column;
                height: 50vh;
                padding: 20px;
                display: flex;
                align-items: center;
              }

              .event__layout {
                height: 100%;
                display: flex;
                background-color: rgba(0, 0, 0, 0.2);
                flex-direction: column;
                justify-content: center;
              }

              .event__text {
                width: 100%;
                justify-content: space-between;
              }
              .event__datebox {
                display: none;
              }
              .event__coverinfo > h2 {
                font-size: 2rem;
                margin-bottom: 0;
              }

              .event__coverinfo > span {
                font-size: 1rem;
              }

              .event__coverinfo > p {
                font-size: 1rem;
                margin: 0;
              }

              .event__back {
                font-size: 1rem;
                width: 70px;
              }
              .event__content {
                margin-top: 15rem;
                flex-direction: column-reverse;
              }
              .event__description {
                width: 100%;
                padding-right: 0;
              }
              .event__location {
                width: 100%;
              }
              .event__mobile {
                display: block;
                margin: 2rem 0;
              }

              .event__content {
                margin-top: 1rem;
              }
            }
          `}
        </style>
      </div>
    </Layout>
  );
}

export default Event;

export async function getStaticProps({ params: { slug } }) {
  const events_res = await fetch(`${API_URL}/events/?slug=${slug}`);
  const found = await events_res.json();

  return {
    props: {
      event: found[0] ? found[0] : null,
    },
  };
}

export async function getStaticPaths() {
  const events_res = await fetch(`${API_URL}/events`);
  const events = await events_res.json();
  return {
    paths: events.map((events) => ({
      params: { slug: String(events.slug) },
    })),
    fallback: true,
  };
}
