import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { TesloShopApp } from "./TesloShopApp";
import "./styles.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" />
    <TesloShopApp />
  </StrictMode>,
);