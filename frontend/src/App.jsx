import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./Components/Navbar";

// Lazy load pages (make sure the filenames match exactly)
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const CreatePage = lazy(() => import("./pages/CreatePage.jsx"));
const VendorPage = lazy(() => import("./pages/VendorPage.jsx"));

function App() {
  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/vendor" element={<VendorPage />} />
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;