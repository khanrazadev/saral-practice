import { useDrop } from "react-dnd";
import Creator from "./Creator";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext } from "react";
import { CreatorContext } from "../context/Creators";

const StatusBlock = ({ state, count, creators }) => {
  const { fetchData } = useContext(CreatorContext);

  const [, drop] = useDrop(() => ({
    accept: "CREATOR",
    drop: (item) => addCreatorToStatusBlock(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addCreatorToStatusBlock = async (id) => {
    if (!id) return;

    try {
      await axios.put(`https://saral-practice.onrender.com/api/creator/${id}`, {
        newStatus: state.name,
      });
      fetchData();
    } catch (error) {
      console.error("Failed to update creator status:", error);
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col h-[70vh]" ref={drop}>
      <div className="flex justify-between bg-gray-950 m-1 p-3">
        <h2 className="uppercase">{state.name}</h2>
        <p>{count}</p>
      </div>
      <div className="flex flex-col px-2 gap-4 overflow-y-auto no-scrollbar py-2 rounded-md">
        {creators.length ? (
          creators.map((creator) => (
            <Creator key={creator._id} creator={creator} status={state.name} />
          ))
        ) : (
          <p className="text-center text-gray-500">No creators</p>
        )}
      </div>
    </div>
  );
};

StatusBlock.propTypes = {
  state: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  creators: PropTypes.array.isRequired,
};

export default StatusBlock;
