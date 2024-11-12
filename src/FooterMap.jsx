import React from 'react';

const FooterMap = () => {
    return (
        <>
            <div className="footer_center_side">
                <div>1000 | 2.4 | 1</div>
                <form>
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
                </form>
            </div>
        </>
    );
};

export default FooterMap;
