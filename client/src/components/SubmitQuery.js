import React from "react";

const SubmitQuery = props => {
  return (
    <div>
        <button {...props} onClick={() => console.log(props.query)}>Submit</button>
    </div>
  );
}

export default SubmitQuery;
