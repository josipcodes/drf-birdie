import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

// built following Moments
test("renders Navbar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
  // looking for a link with the name of Log in
  const logInLink = screen.getByRole("link", { name: "Log in" });
  expect(logInLink).toBeInTheDocument();
});

test("renders user's username", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );
  screen.debug();
  // looking for logged in user's username
  const profileName = await screen.findByText("test11");
  expect(profileName).toBeInTheDocument();
});

test("renders liked link", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );
  screen.debug();
  // looking for a 'Liked' link
  const likedOption = await screen.findByRole("link", {name: "Liked"});
  expect(likedOption).toBeInTheDocument();
});
