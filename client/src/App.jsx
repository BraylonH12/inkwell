import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Feed } from "./components/Feed";
import { NavBar } from "./components/NavBar";
import { PostEditor } from "./components/PostEditor";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <NavBar />

        <main className="w-full px-4 py-6 md:mx-auto md:max-w-2xl md:px-6 md:py-8">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/write" element={<PostEditor />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}