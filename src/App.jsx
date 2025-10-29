import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SignupPage from "./pages/SignupPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import { getUsername } from "./services/apiBlog";
import { useQuery } from "@tanstack/react-query";
import NotFoundPage from "./pages/NotFoundPage";
import AllBlogsPage from "./pages/AllBlogsPage";
import EditPostWrapper from "./ui_components/EditPostWrapper";
import { ThemeProvider } from "./lib/ThemeContext";

const App = () => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  useEffect(
    function () {
      if (data) {
        setUsername(data.username);
        setIsAuthenticated(true);
      }
    },
    [data]
  );

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                isAuthenticated={isAuthenticated}
                username={username}
                setUsername={setUsername}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          >
            <Route index element={<HomePage isAuthenticated={isAuthenticated} />} />
            <Route path="/all-blogs" element={<AllBlogsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="profile/:username" element={<ProfilePage authUsername={username} />} />
            <Route path="blogs/:slug" element={<DetailPage username={username} isAuthenticated={isAuthenticated} />} />
            <Route
              path="edit-post/:slug"
              element={
                <ProtectedRoute>
                  <EditPostWrapper isAuthenticated={isAuthenticated} />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreatePostPage isAuthenticated={isAuthenticated} />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/signin"
            element={
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                setUsername={setUsername}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
