import React from 'react'

const RightSide = (props) => {
    const { data } = props;
    return (
        <div className="side side_right">
            Right
            <br />
            <br />
            <hr />
            {data.map((item, index) => (
                <div className="card" key={index}>
                    <div>{item.номер}</div>
                    <div>{item.адрес}</div>
                    <div>{item.клиент}</div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default RightSide
