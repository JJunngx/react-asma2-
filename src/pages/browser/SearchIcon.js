import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faSearch}
      className="fs-1 "
      style={{ color: "#dee2e6" }}
    />
  );
};

export default SearchIcon;
