import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import App from "../../App";

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
  // looking for a 'Liked' link
  const likedOption = await screen.findByRole("link", {name: "Liked"});
  expect(likedOption).toBeInTheDocument();
});

test("renders post form", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </Router>
  );
  const createButton = await screen.findByRole("link", {name: "Post"});
  fireEvent.click(createButton)
  const submitButton = await screen.findByPlaceholderText("Type your post")
  await waitFor(() => {
    expect(submitButton).toBeInTheDocument();
  })
});
