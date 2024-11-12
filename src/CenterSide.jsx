import React, { useEffect, useState } from 'react';
import { API_MAP_KEY, API_MAP_URL } from './config';
import FooterMap from './FooterMap';

const CenterSide = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    // const [map, setMap] = useState(null);

    function fetchScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');

            script.type = 'text/javascript';
            script.onload = resolve;
            script.onerror = reject;
            script.src = `${API_MAP_URL}?apikey=${API_MAP_KEY}&lang=ru_RU`;
            script.async = 'async';

            document.head.appendChild(script);
        });
    }

    // загрузка скрипта на странице
    useEffect(() => {
        fetchScript().then(() => setIsLoaded(true));
    }, []);

    // создаем карту из подгруженного ymaps.Map
    const createMap = () => {
        try {
            window.ymaps.ready(() => {
                
                const newMap = new window.ymaps.Map(
                        'customMap',
                        { center: [55.76, 37.64], zoom: 10, controls: [] }
                        // {
                        //     searchControlProvider: 'yandex#search',
                        // }
                    ),
                    rightButton = new window.ymaps.control.Button('Send');
                newMap.controls.add(rightButton, {
                    float: 'right',
                    selectOnClick: false,
                });
                // const log = document.getElementById('log');
                rightButton.events.add('click', () => {
                    console.log('Clicked right button');
                    //  log.innerHTML = 'sum_kg +  |  + sum_kub +  |  + sum_pal';  
                });

                // var secondButton = new ymaps.control.Button({
                //     data: {
                //         // Зададим текст и иконку для кнопки.
                //         content: 'Адаптивная кнопка',
                //         // Иконка имеет размер 16х16 пикселей.
                //         image: 'images/error.png',
                //     },
                //     options: {
                //         // Поскольку кнопка будет менять вид в зависимости от размера карты,
                //         // зададим ей три разных значения maxWidth в массиве.
                //         maxWidth: [28, 150, 178],
                //     },
                // });

                // setMap(newMap);
            });
        } catch (error) {
            console.log('error is', error);
        }
    };

    // если скрипт карты подключен, рендерим проинициализируемую карту
    useEffect(() => {
        if (isLoaded ) {
            createMap();
            // и подгружаем данные? или раньше - скорее всего раньше надо это делать, перед  createMap(), а в креайт добавлять в
            // мап коллекцию меток
            // coords = data;
        }
    }, [isLoaded]);

    return (
        <>
            <div className="side center_side">
                <FooterMap />
                <div id="customMap"></div>
                {/* напишем элементы, которые раскидаем по карте на карте */}
            </div>
        </>
    );
};

export default CenterSide;

// let counter = 0.1;

// return (
//     <>
//         <div className="side center_side" id="customMap">
//             Here will be a map
//         </div>

//         <button
//             style={{ marginTop: 150 }}
//             onClick={() => {
//                 console.log('ymaps', window.ymaps);
//                 counter = counter + 0.1;

//                 var myGeoObject = new window.ymaps.GeoObject({
//                     geometry: {
//                         type: 'Point', // тип геометрии - точка
//                         coordinates: [55.8, 37.07 + counter], // координаты точки
//                     },
//                 });

//                 // Размещение геообъекта на карте.
//                 map.geoObjects.add(myGeoObject);
//             }}
//         >
//             Create Point
//         </button>
//     </>
// );

// document.addEventListener('readystatechange', function () {
//     if (document.readyState === 'complete') {
//         // good luck!
//       // console.log('React app DOM is fully loaded.');
//       // console.log(window.ymaps);
//       const init = () => {
//             let myMap = new window.ymaps.Map('map', {
//                 center: [55.76, 37.64],
//                 zoom: 10,
//             });
//       };
//        window.ymaps.ready(init);
//     }
// });
