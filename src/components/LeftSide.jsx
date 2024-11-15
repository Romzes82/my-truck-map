import React from 'react'

const LeftSide = (props) => {
  const { data } = props;
  return (
      <div className="side side_left">
          Left
          <br />
          <br />
          <hr />
          {data.map((item, index) => (
              <div className="card" key={index}>
                  <div>{item.id}</div>
                  <div>{item.client}</div>
                  {/* <div>{item.клиент}</div> */}
                  <hr />
              </div>
          ))}
      </div>
  );
}

export default LeftSide
