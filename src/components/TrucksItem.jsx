import React from 'react';

const TrucksItem = (props) => {
    const { item = [], index, removeTruck = Function.prototype } = props;
    // [{id:1},{id:2}]
    let sumKg = 0;
    let sumValue = 0;
    let sumPal = 0;

    function customRound(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
    console.log(customRound(2.675, 2)); // 2.68, совершенная точность!

    function calc(key) {
        item.reduce();
    }

    const totalKG = item.reduce(
        // Аргумент sum является аккумулятором,
        // в нём храним промежуточное значение
        function (sum, currentAccount) {
            // Каждую итерацию берём текущее значение
            // и складываем его с количеством денег
            // на текущем счету
            return sum + currentAccount['weight'] * 1;
        },
        0 // Начальное значение аккумулятора
    );
    // console.log('calc(value)' + calc('value')());

    return (
        <div>
            <li className="collection-item">
                <div id={`collection-item-${index+1}`}>
                    {/* {id}, {weight} кг */}
                    авто {index + 1}) точки: &nbsp;
                    <span className="red-text">
                        {item.map((point, index) => {
                            sumKg = sumKg + point.weight * 1;
                            sumValue =
                                sumValue +
                                customRound(
                                    point.volume.replace(/,/g, '.') * 1,
                                    2
                                );
                            sumPal = sumPal + point.pallet * 1;
                            return index === item.length - 1
                                ? point.id
                                : point.id + ', ';
                            // index point.length;
                        })}
                    </span>
                    &nbsp; - {sumKg} кг || {customRound(sumValue, 2)} м3 ||{' '}
                    {sumPal} паллет
                    <span className="secondary-content">
                        <i
                            className="material-icons truck-delete"
                            onClick={()=>removeTruck(index)}
                        >
                            close
                        </i>
                    </span>
                </div>
            </li>
        </div>
    );
};

export default TrucksItem;
