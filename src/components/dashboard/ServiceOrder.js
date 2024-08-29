import React from "react";
import "./ServiceOrder.css";

function ServiceOrder({ onChangePage }) {
  const handleButtonClick = () => {
    onChangePage("Service Orders");  // This will trigger the change to "Service Orders"
  };

  return (
    <section className="service-order">
      <div className="table">
        <div className="table-header">
          <h3>Service Order</h3>
          <a
          href="#"
          className="see-all text-primary"
          onClick={handleButtonClick}
        >
          See all
        </a>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Horizon UI PRO</td>
              <td>
                <span className="status approved">Approved</span>
              </td>
              <td>18 Apr 2022</td>
              <td>
                <progress value="80" max="100"></progress>
              </td>
            </tr>
            <tr>
              <td>Horizon UI Free</td>
              <td>
                <span className="status disabled">Disabled</span>
              </td>
              <td>18 Apr 2022</td>
              <td>
                <progress value="50" max="100"></progress>
              </td>
            </tr>
            <tr>
              <td>Marketplace</td>
              <td>
                <span className="status error">Error</span>
              </td>
              <td>20 May 2021</td>
              <td>
                <progress value="30" max="100"></progress>
              </td>
            </tr>
            <tr>
              <td>Weekly Updates</td>
              <td>
                <span className="status approved">Approved</span>
              </td>
              <td>12 Jul 2021</td>
              <td>
                <progress value="90" max="100"></progress>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ServiceOrder;
