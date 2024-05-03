import { useMemo, useContext } from "react";
import "./App.css";
import StatusBlock from "./components/StatusBlock";
import { CreatorContext } from "./context/Creators";
import AddCreator from "./components/AddCreator";

function App() {
  const { creators } = useContext(CreatorContext);

  // Group creators by status using useMemo
  const creatorsByStatus = useMemo(() => {
    return status.map((state) =>
      creators.filter((creator) => creator.status === state.name)
    );
  }, [creators]);

  return (
    <div className="h-[100vh] text-xs flex flex-col text-gray-400">
      <AddCreator />
      <div className="grid font-semibold  sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-6 px-10">
        {status.map((state, index) => (
          <StatusBlock
            key={state.id}
            state={state}
            count={creatorsByStatus[index].length}
            creators={creatorsByStatus[index]}
          />
        ))}
      </div>
    </div>
  );
}

const status = [
  { id: 1, name: "prospects" },
  { id: 2, name: "reached out" },
  { id: 3, name: "in conversation" },
  { id: 4, name: "onboarded" },
  { id: 5, name: "rejected" },
];

export default App;
