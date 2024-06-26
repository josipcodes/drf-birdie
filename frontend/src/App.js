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
import { useSelectedCategory } from "./contexts/SelectedCategoryContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import EditUsernameForm from "./pages/profiles/EditUsernameForm";
import EditPasswordForm from "./pages/profiles/EditPasswordForm";
import EditProfileForm from "./pages/profiles/EditProfileForm";

function App() {
  const currentUser = useCurrentUser();
  const selectedCategory = useSelectedCategory();

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
            className={styles.Content}
            exact
            path="/"
            render={() => (
              // message for when path brings up no results.
              <PostsPage message="No posts found." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              // message for when search brings up no results.
              <PostsPage
                message="No posts found. Follow a user to change that."
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
                message="No posts found. Like some posts to change that."
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
                message="No posts found. Save some post for later and find them here later."
                filter={`saved__owner__profile=${profile_id}&ordering=-saved__created&`}
              />
            )}
          />
          <Route
            exact
            path="/categories/:id/posts"
            render={() => (
              // message for when search brings up no results.
              <PostsPage
                message="No posts in this category."
                filter={`category_id=${selectedCategory}&ordering=-created&`}
                selectedCategory={selectedCategory}
              />
            )}
          />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <EditUsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <EditPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <EditProfileForm />}
          />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
