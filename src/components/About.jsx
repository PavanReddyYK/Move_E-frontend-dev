import React from "react";

const About = () => {
  const appName = "MoveE🎬";
  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100 h5 text-light"
    >
      <div>
        <h2>Welcome to {appName} </h2>
        <p>
          <br/> your go-to platform for movie
          enthusiasts! Our application allows users to create accounts, make
          personalized watchlists.
        </p>
        <p>
          <strong>Key Features:</strong>
          <ul>
            <li>
              <b>User Accounts:</b> Create your account and unlock a
              personalized movie-watching experience.
            </li>
            <li>
              <b>Watchlist Management:</b> Easily add movies to your watchlist,
              keeping track of what you want to watch next.
            </li>
            <li>
              <b>Latest Movies:</b> Explore and discover the latest movie
              releases.
            </li>
            <li>
              <b>Feedback and Contact:</b> Share your thoughts! Provide feedback
              on the app or get in touch with the developer for any job requests
              or inquiries.
            </li>
          </ul>
        </p>
        <p>
          <strong>How It Works:</strong> Sign up, explore the latest movies, and
          add them to your watchlist with just a click. Need assistance or have
          feedback? Use our built-in feedback feature or contact the developer
          directly for any job-related inquiries.
        </p>
        <p>
          <strong>Why Choose Us:</strong> {appName} stands out for
          its user-friendly interface, personalized watchlist feature, and
          direct communication with the developer. We value your input and
          strive to make your movie-watching experience exceptional.
        </p>
        <p>
          Ready to dive into a world of movies tailored to your taste? Sign up
          today and start building your ultimate watchlist on {appName}!
        </p>
        <br/>
        <p>developer👨‍💼,</p>
        <p className="text-danger bg-secondary d-inline"><strong>PAVAN REDDY Y K</strong></p>
      </div>
    </div>
  );
};

export default About;
