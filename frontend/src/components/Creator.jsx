import { useDrag } from "react-dnd";
import getBorderColor from "../utils/getBorderColor";
import numberFormatter from "../utils/numberFormatter";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext, useMemo } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CreatorContext } from "../context/Creators";

const Creator = ({ creator, status }) => {
  const { _id, name, username, follower, following, avatar } = creator;
  const { fetchData } = useContext(CreatorContext);

  const trimmedAvatar = useMemo(() => {
    const index = avatar.indexOf("/v/");
    if (index !== -1) {
      return avatar.substring(index);
    }
    return avatar;
  }, [avatar]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CREATOR",
    item: { id: creator._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const borderColor = useMemo(() => {
    return getBorderColor(status);
  }, [status]);

  const removeCreatorHandler = async () => {
    try {
      await axios.delete(`/api/creator/${creator._id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={_id}
      ref={drag}
      draggable
      className={` bg-gray-950 p-2 ${borderColor} ${
        isDragging ? "border borderColor" : "border-t-2"
      }`}
    >
      <div className="text-xs flex justify-around">
        <div className="flex justify-center items-center text-center gap-2">
          <img
            src={`/external-images/${trimmedAvatar}`}
            alt=""
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="text-xs">
            <p>{name}</p>
            <p>@{username}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-4 text-center ">
        <div>
          <p>Followers</p>
          <p>{numberFormatter(follower)}</p>
        </div>
        <div>
          <p>Following</p>
          <p>{numberFormatter(following)}</p>
        </div>
      </div>
      <button
        className="btn bg-red-950 hover:bg-red-900 btn-sm w-full mt-5"
        onClick={removeCreatorHandler}
      >
        <MdDeleteForever />
      </button>
    </div>
  );
};

Creator.propTypes = {
  creator: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    follower: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
};

export default Creator;
