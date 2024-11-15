import React, { useEffect, useState } from 'react';
import { API_MAP_KEY, API_MAP_URL } from '../config';
import HeaderMap from './HeaderMap';
import Trucks from './Trucks';
import TrucksList from './TrucksList';

const mok = [
    {
        id: '1',
        latitude: '55,654427',
        longitude: '37,552085',
        weight: '762',
        value: '2,2',
        pallet: '0',
        info: 'Москва, Научный проезд, д. 20, стр.4, Тел. 8-916-028-48-52 Аллексей, до 15-00 ',
        type: 'Москва и область',
        address: 'Москва, Научный проезд, д. 20, стр.4',
        client: 'ООО _ДНК-Технология ТС_',
        valueInPallet: '2,2',
    },
    {
        id: '2',
        latitude: '55,595689',
        longitude: '37,357789',
        weight: '1199',
        value: '4,1',
        pallet: '0',
        info: 'Москва г, Московский п, Хабарова ул, д 9.  до 14!!! Москва г, Московский п, Хабарова ул, дом № Домов 9, Склад работает с 8.30 до 17.00 8926-097-50-15 Наталья  ',
        type: 'Москва и область',
        address: 'Москва г, Московский п, Хабарова ул, д 9',
        client: 'ООО _ТД ВИКТОРИЯ_',
        valueInPallet: '4,1',
    },
];
const mok_pointsSelected = [1, 2];

const CenterSide = (props) => {
    // const {
    //     номер: id,
    //     широта: latitude,
    //     долгота: longitude,
    //     масса: weight,
    //     объем: value,
    //     паллеты: pallet,
    //     информация: info,
    //     тип: type,
    //     адрес: address,
    //     клиент: client,
    // } = props;
    const { data } = props;

    // https://www.mousedc.ru/learning/522-massiv-steyt-react/?ysclid=m3hcvf4nps534188601
    const [isLoadedScriptApi, setIsLoadedScriptApi] = useState(false);
    // const [pointsSelected, SetPointsSelected] = useState([]); // состояние-массив точек для отпраки в одну авто? - просто [1, 5, 10]
    const [trucks, setTracks] = useState([]); // состояние-массив объектов "авто" со своими точками. Оно будет в модалке от клика по Тракс

    let pointsSelected=[];
    //  Оно же и будет в LocalStorage.
    // т.е. понадобятся:
    // - функция удаления элемента(фильтр). Возможно удаления сразу нескольких элементов.
    // - функция добавения элемента. Хендлер кнопки Send
    // все они задействуют setListTracks

    const [isModalTrucksShow, setModalTrucksShow] = useState(false);

    const handleModalTrucksShow = () => {
        setModalTrucksShow(!isModalTrucksShow);
    };
    
    // useEffect(() => {
    //     console.log('Я вызовусь только при изменении valueA');
    //      console.log(pointsSelected.length);
    // }, [pointsSelected]);

    // получается quantity - это и будет кол-во МАШИН(о проще брать из length), а truck - это массив чисел pointsSelected выбранных точек
    // truck - pointsSelected ?
    // [ {1},{5},{10}, {2},{4},{9} ] - trucks на выходе
    // [ {2,4,9} ] - truck
    // ее никуда прокидвыать не надо, она привязана к карте, кнопка Send
    // const addTruck = (truck) => {
    //     const newTruck = truck.map((point) => {
    //         return {
    //             ...point,
    //             cuantity: trucks.length + 1,
    //         };
    //     });
    //     setTracks([...trucks, newTruck]);
    // };

    const addTruck = () => {
        if (pointsSelected.length === 0) return;
        // SetPointsSelected([1, 2]);
        //  console.log('trucks ' + trucks);
        // ??? УТОЧНИТЬ как обновиться стейт
        const newTruck = pointsSelected.map((point) => {
            // console.log('point ' + point);
            // if (!data[point - 1].cuantity)
            //     data[point - 1].cuantity = trucks.length; // этого ключа еще ни у кого нет
            return {
                ...data[point - 1],
                // cuantity: data[point - 1].cuantity + 1,
            };
        });
        console.log('newTruck ' + newTruck[0].client);
        setTracks(trucks => [...trucks, newTruck]);

        // обнуляем pointsSelected
        // SetPointsSelected([]);
        pointsSelected=[];
        //TODO и деактивируем метки на карте ...........
    };

    // клики по меткам обновляют pointsSelected через SetPointsSelected
    const hendlePlacemark = (id) => {
        // если метка стала активной(по таргету лучше), то добавляем ее в newPoints
        // елси деактивировали, то удаляем
        // либо это массив полных объектов, либо массив просто чисел. И из этих чисел затем каждый раз надо
        // формировать инфо. Т.е. в trukcs иметь тоже просто
    };

    // функция удаления авто из списка авто. Серыми будут все метки с полем quantity <> 0
    const removeTruck = (itemId) => {
        console.log('id ' + itemId);
        const newTruck = trucks.filter((el, index) => {
            return index !== itemId;
            // у того эл-та у которого id равен переданному в ф-ю id вернется false и он не будет добавлен в новоиспеченный массив newOrder
        });
        setTracks(newTruck);
    };

    // функция одидания загрузки на странице api maps 2.1
    function fetchScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');

            script.type = 'text/javascript';
            script.onload = resolve;
            script.onerror = reject;
            script.src = `${API_MAP_URL}?apikey=${API_MAP_KEY}&lang=ru_RU`;
            // script.src = 'https://yandex.st/jquery/2.2.3/jquery.min.js';
            script.async = 'async';

            document.head.appendChild(script);
        });
    }

    // загрузка скрипта на странице
    useEffect(() => {
        fetchScript().then(() => setIsLoadedScriptApi(true));
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

                // добавим метки из json
                // for (var i = 0; i < data.length; i++) {

                // }
                const myCollection = new window.ymaps.GeoObjectCollection(
                    {},
                    {
                        //preset: 'islands#redIcon', //все метки красные
                        draggable: true, // и их можно перемещать
                        balloonPanelMaxMapArea: Infinity,
                        //блокировка открытия балуна
                        //openBalloonOnClick: false
                        // Отключаем кнопку закрытия балуна.
                        //balloonCloseButton: false,
                        // Балун будем открывать и закрывать кликом по иконке метки.
                        //hideIconOnBalloonOpen: false
                    }
                );

                let varPreset;
                let varForBalloonContentBodyAndHintContent;
                for (var i = 0; i < data.length; i++) {

                    if (data[i]['type'] === 'Москва и область') {
                        varForBalloonContentBodyAndHintContent = data[i]["client"];
                        varPreset = 'islands#blueIcon';
                    } else {
                        varForBalloonContentBodyAndHintContent = data[i]["type"];
                        varPreset = 'islands#redIcon';
                    }
                    myCollection.add(
                        new window.ymaps.Placemark(
                            // [13.38, 52.51]
                            // console.log(data[i]['широта'].replace(/\,/g, '.'))
                            [
                                data[i]['latitude'].replace(/,/g, '.'),
                                data[i]['longitude'].replace(/,/g, '.'),
                            ],
                            {
                                hintContent:
                                    data[i]['weight'] +
                                    ', ' +
                                    data[i]['value'] +
                                    ', ' +
                                    data[i]['pallet'] +
                                    '<br/>' +
                                    varForBalloonContentBodyAndHintContent,
                                iconContent: data[i]['id'],
                                balloonContentBody: [
                                    '<address>',
                                    '<strong>' +
                                        data[i]['info'] +
                                        '</strong>',
                                    '<br/>',
                                    '' +
                                        data[i]['weight'] +
                                        ' кг, ' +
                                        data[i]['value'] +
                                        ' куб.м., ' +
                                        data[i]['pallet'] +
                                        ' паллет' +
                                        '',
                                    '<br/>',
                                    '' +
                                        varForBalloonContentBodyAndHintContent +
                                        '',
                                    '</address>',
                                ].join(''),
                                weight: data[i]['weight'],
                                volume: data[i]['value'],
                                pallet: data[i]['pallet'],
                                activeFlag: false,
                                typeDelivery: data[i]['type'],
                                dopInfo: data[i]['info'],
                                varHintAndBody:
                                    varForBalloonContentBodyAndHintContent,
                            },
                            {
                                preset: varPreset,
                            }
                        )
                    );
                }

                //добавлеяем слушателей на коллекцию
                myCollection.events.add([
                  'click'
                ], function (e) { 
                    let object = e.get('target');
                    console.log(object.properties._data.iconContent);

                    // const arr.push(object.properties._data.iconContent)
                   
                    pointsSelected.push(object.properties._data.iconContent);
                    // SetPointsSelected(
                    //     // ...pointsSelected,
                    //     // pointsSelected.push([object.properties._data.iconContent])
                    // [...pointsSelected, object.properties._data.iconContent]
                    //     (pointsSelected) => [
                    //         ...pointsSelected,
                    //         object.properties._data.iconContent,
                    //     ]
                    // );
                    
                    //  console.log( object.geometry.getType());
                    //  console.log( object.geometry._map.balloon._balloon._state);
                    //console.log( object.properties._data.balloonContent );
                    //console.log( object.options._parent._options.preset );
                    // txt =  object.properties._data.hintContent;
                    //log.innerHTML = '@' + e.get('type')  + txt + '<br/>' + log.innerHTML;
                    //sum_kg = sum_kg + object.properties._data.weight;

                    if (object.properties._data.activeFlag === true) {
                        // sum_kg = sum_kg - object.properties._data.weight;
                        // sum_kub = sum_kub - object.properties._data.volume;
                        // sum_kub = +sum_kub.toFixed(1);
                        // sum_pal = sum_pal - object.properties._data.pallet;
                        object.properties._data.activeFlag = false;
                        if (
                            object.properties._data.typeDelivery ===
                            'Москва и область'
                        ) {
                            //object.options._options.iconColor='#0095b6';
                            //object.options._options.preset= 'islands#redIcon';
                            e.get('target').options.set(
                                'preset',
                                'islands#blueIcon'
                            );
                        } else {
                            //object.options._options.iconColor='#FF4500';
                            //object.options._options.preset= 'islands#redIcon';
                            e.get('target').options.set(
                                'preset',
                                'islands#redIcon'
                            );
                        }
                    } else {
                        // sum_kg = sum_kg + object.properties._data.weight;
                        // sum_kub = sum_kub + object.properties._data.volume;
                        // sum_kub = +sum_kub.toFixed(1);
                        // sum_pal = sum_pal + object.properties._data.pallet;
                        object.properties._data.activeFlag = true;
                        //object.options._options.iconColor="#0005b6";
                        //object.options._options.preset= 'islands#greyIcon';
                        e.get('target').options.set(
                            'preset',
                            'islands#nightCircleIcon'
                        ); //'islands#blackIcon'); //  это работает - закараска балуна при нажатии
                    }
                })

                // Добавление коллекции на карту.
                newMap.geoObjects.add(myCollection);
                // setupControls(newMap, myCollection);
                // Устанавливаем центр и масштаб карты так, чтобы отобразить всю коллекцию целиком.
                newMap.setBounds(myCollection.getBounds());

                // const log = document.getElementById('log');
                rightButton.events.add('click', () => {addTruck(pointsSelected);});

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

    // если скрипт карты подключен, рендерим проинициализированную карту
    useEffect(() => {
        if (isLoadedScriptApi) {
            createMap();
            // и подгружаем данные? или раньше - скорее всего раньше надо это делать, перед  createMap(), а в креайт добавлять в
            // мап коллекцию меток
            // coords = data;
        }
    }, [isLoadedScriptApi]);

    return (
        <>
            <div className="side center_side">
                <HeaderMap
                    quantity={trucks.length}
                    handleModalTrucksShow={handleModalTrucksShow}
                />
                {isModalTrucksShow && (
                    <TrucksList
                        trucks={trucks}
                        handleModalTrucksShow={handleModalTrucksShow}
                        removeTruck={removeTruck}
                    />
                )}
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
