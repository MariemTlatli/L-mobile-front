import React from "react";

const DispatcherDetails = ({ dispatcher, onBack }) => {
  return (
    <div>
      <h2>Dispatcher Details</h2>
      <p>
        <strong>Message:</strong> {dispatcher.message}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(dispatcher.dispatchDate).toLocaleString()}
      </p>
      <button onClick={onBack}>Back to Table</button>
    </div>
  );
};

export default DispatcherDetails;
