import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import RegisterForm from "./pages/auth/RegisterForm";
import LoginForm from "./pages/auth/LoginForm";
import PageNotFound from "./components/PageNotFound";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();

  // need profile_id to filter the posts by.
  // defaults to an empty string if current user details are still being fetched.
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* home, feed and liked routes modelled after Moments code */}
          <Route
            exact
            path="/"
            render={() => (
              // message for when search brings up no results.
              <PostsPage message="No results found." />
            )}
          />
          {/* feed and liked routes copied from Moments with minor changes */}
          <Route
            exact
            path="/feed"
            render={() => (
              // message for when search brings up no results.
              <PostsPage
                message="No results found. Adjust your search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              // message for when search brings up no results.
              <PostsPage
                message="No results found. Adjust your search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created&`}
              />
            )}
          />
          <Route
            exact
            path="/saved"
            render={() => (
              // message for when search brings up no results.
              <PostsPage
                message="No results found. Adjust your search keyword or save a post."
                filter={`saved__owner__profile=${profile_id}&ordering=-saved__created&`}
              />
            )}
          />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
