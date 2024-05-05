import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const CreatorContext = createContext(null);

export const CreatorProvider = (props) => {
  const [creators, setCreators] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://saral-practice.onrender.com/api/creator"
      );
      setCreators(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CreatorContext.Provider value={{ creators, fetchData, setCreators }}>
      {props.children}
    </CreatorContext.Provider>
  );
};

CreatorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
