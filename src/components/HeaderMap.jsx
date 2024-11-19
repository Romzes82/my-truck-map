import React from 'react';
import Trucks from './Trucks';
import Calculator from './Calculator';

const HeaderMap = (props) => {
    const { quantity = 0, handleModalTrucksShow = Function.prototype, asd = Function.prototype} = props;
    return (
        <>
            <div className="header_center_side">
                <Calculator />
                           {/* <button onClick={asd}> clk </button>   */}
                {/* <div> */}
                <Trucks
                    quantity={quantity}
                    handleModalTrucksShow={handleModalTrucksShow}
                />
                {/* </div> */}
                {/* <form>
                    <label htmlFor="city-select">.</label>
                    <select name="city" id="city-select">
                        <option value="">-- Удалить авто --</option>
                        <option value="auto1">
                            авто 1: (1-12-5)
                        </option>
                        <option value="auto2">
                            авто 2: (10-2-6)
                        </option>
                        <option value="auto3">
                            авто 3: (4-7-9)
                        </option>
                    </select>
                </form> */}
            </div>
        </>
    );
};

export default HeaderMap;
