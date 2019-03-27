import React, { Component } from "react";

export default class Hall extends Component {
  render() {
    return (
      <div
        className="card text-white bg-dark"
        style={{
          width: "20rem",
          position: "fixed",
          marginLeft: "1560px",
          marginTop: "5px"
        }}
      >
        <div
          className="card-header"
          style={{ paddingTop: "1px", paddingBottom: "2px", color: "#dddd" }}
        >
          {" "}
          <strong> Hall of Fame</strong>{" "}
        </div>

        <div
          className="card-body row"
          style={{ textAlign: "left", paddingTop: "1px", paddingBottom: "1px" }}
        >
          <div>
            <img
              src="https://pbs.twimg.com/profile_images/527469927226023936/4-X_cJ4G_400x400.png"
              style={{
                width: "75px",
                borderRadius: "100px",
                border: "1px #dddd solid",
                height: "75px",
                marginTop: "2px"
              }}
              alt="..."
            />
          </div>

          <div style={{}}>
            <p style={{ marginTop: "10px", paddingLeft: "10px" }}>
              <small>
                <strong>
                  <img
                    src="https://dfwexcel.com/wp-content/uploads/2016/12/thank-you.png "
                    style={{ width: "50px", height: "40px" }}
                    alt="..."
                  />
                  &nbsp;Ronaldo ,
                </strong>
                <br /> <br />
                &nbsp;&nbsp;&nbsp;133 contribuições !
              </small>{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
