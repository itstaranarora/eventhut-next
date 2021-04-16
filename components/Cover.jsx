export default function Cover() {
  return (
    <div className="cover">
      <div className="cover__text container">
        <h3>
          DISCOVER EVENTS <br /> FOR ALL THE THINGS <br /> YOU LOVE.
        </h3>
      </div>
      <style jsx>{`
        .cover {
          background-image: url("cover.jpg");
          height: 70vh;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 0.7rem;
          /* width: 100%; */
          margin: 0 10px;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
        }

        .cover__text {
          width: 100%;
          display: block;
          color: white;
          text-align: start;
          font-size: 3rem;
        }

        @media (max-width: 600px) {
          .cover__text {
            justify-content: center;
          }

          .cover__text > h3 {
            font-size: 2rem;
          }
          .cover {
            height: 40vh;
            width: 100%;
            border-radius: 0%;
            background-position: center right;
          }
        }
      `}</style>
    </div>
  );
}
