import React from 'react';
import TrucksItem from './TrucksItem';

const TrucksList = (props) => {
    const {
        trucks = [],
        handleModalTrucksShow = Function.prototype,
        removeTruck = Function.prototype,
    } = props;
    // [[{id:1},{id:2}] , [{id:3},{id:4}]]
    console.log('in TrucksList ' + trucks.length);
    return (
        <div>
            <ul className="collection with-header trucks-list">
                <li className="collection-header active">
                    <h4>Список авто</h4>
                </li>
                {trucks.length ? (
                    trucks.map((item, index) => {
                        console.log('---');
                        console.log(item);
                        return (
                            <TrucksItem
                                key={index}
                                item={item}
                                index={index}
                                removeTruck={removeTruck}
                            />
                        );
                    })
                ) : (
                    <li className="collection-item">Список пуст</li>
                )}
                <i
                    className="material-icons trucks-list-close"
                    onClick={handleModalTrucksShow}
                >
                    close
                </i>
            </ul>
        </div>
    );
};

export default TrucksList;
