import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { CreatorProvider } from "./context/Creators.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <CreatorProvider>
        <App />
      </CreatorProvider>
    </DndProvider>
  </React.StrictMode>
);
