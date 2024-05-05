import { useContext, useState } from "react";
import axios from "axios";
import { CreatorContext } from "../context/Creators";

const AddCreator = () => {
  const [creator, setCreator] = useState("");
  const { fetchData } = useContext(CreatorContext);

  const addCreatorHandler = async () => {
    try {
      await axios.post("/api/creator", {
        username: creator,
      });
      fetchData();
      setCreator("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-col md:flex-row items-center justify-center flex mx-auto py-10 gap-2">
      <input
        value={creator}
        className="input input-primary"
        placeholder="Enter creator username..."
        onChange={(e) => setCreator(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addCreatorHandler}>
        ADD CREATOR
      </button>
    </div>
  );
};

export default AddCreator;
