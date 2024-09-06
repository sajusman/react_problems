import { useState } from "react";
import * as Problems from "./Problems";

type TProblems = keyof typeof Problems;

function App() {
  const [selectedProblem, setSelectedProblem] =
    useState<TProblems>("UpdateEffect");
  const Component = Problems[selectedProblem] as () => JSX.Element;
  return (
    <>
      {/* NAV_ITEMS */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        {Object.keys(Problems).map((problemName) => (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSelectedProblem(problemName as TProblems);
            }}
          >
            {problemName}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="h-full w-full flex justify-center">
        <Component />
      </div>
    </>
  );
}

export default App;
