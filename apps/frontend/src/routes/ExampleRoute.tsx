import React from "react";
import { ExampleComponent } from "../components/ExampleComponent.tsx";

export default function ExampleRoute() {
  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <h1>Text</h1>

      <ExampleComponent></ExampleComponent>
    </div>
  );
}
