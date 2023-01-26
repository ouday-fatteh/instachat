import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth, Home, Chat } from "./pages";
import { ProtectedRoute, SignedRoute } from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <SignedRoute>
                <Home />
              </SignedRoute>
            }
          />
          <Route
            path={"/auth"}
            element={
              <SignedRoute>
                <Auth />
              </SignedRoute>
            }
          />
          <Route
            path={"/chat"}
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
