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
        volume: '2,2',
        pallet: '0',
        info: 'Москва, Научный проезд, д. 20, стр.4, Тел. 8-916-028-48-52 Аллексей, до 15-00 ',
        type: 'Москва и область',
        address: 'Москва, Научный проезд, д. 20, стр.4',
        client: 'ООО _ДНК-Технология ТС_',
        volumeInPallet: '2,2',
    },
    {
        id: '2',
        latitude: '55,595689',
        longitude: '37,357789',
        weight: '1199',
        volume: '4,1',
        pallet: '0',
        info: 'Москва г, Московский п, Хабарова ул, д 9.  до 14!!! Москва г, Московский п, Хабарова ул, дом № Домов 9, Склад работает с 8.30 до 17.00 8926-097-50-15 Наталья  ',
        type: 'Москва и область',
        address: 'Москва г, Московский п, Хабарова ул, д 9',
        client: 'ООО _ТД ВИКТОРИЯ_',
        volumeInPallet: '4,1',
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

//    data - это массив:
//    console.log(Array.isArray(data));
     
// добавим каждому объекту массива поле preset с цветом метки
    data.forEach((point) => { 
        if (point['type'] === "Москва и область") {
            point['preset'] = 'islands#blueIcon';
        } else { 
            point['preset'] = 'islands#redIcon';
        }
    })

    // https://www.mousedc.ru/learning/522-massiv-steyt-react/?ysclid=m3hcvf4nps534188601
    const [isLoadedScriptApi, setIsLoadedScriptApi] = useState(false);
    // const [pointsSelected, SetPointsSelected] = useState([]); // состояние-массив точек для отпраки в одну авто? - просто [1, 5, 10]
    const [trucks, setTracks] = useState([]); // состояние-массив объектов "авто" со своими точками. Оно будет в модалке от клика по Тракс
    const [varPreset, setVarPreset] = useState();

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

    function asd(e) {
        // let object = e.get('target');
        // let iterator = window.ymaps.geoObjects.GeoObjectCollection.myCollection.getIterator();
        // let lengthCol = e.current.target;
        // _sourceEvent._sourceEvent.originalEvent.target._data.properties._data
        // ООО _ДНК-Технология ТС_
        console.log(
            e._sourceEvent._sourceEvent.originalEvent.target._data.properties
                ._data.varHintAndBody
        );
    }

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

   
                const callbackForTruckDelete = (e) => {
                    if (
                        !e.target.parentElement.parentElement.id.match(
                            /collection-item-.*/
                        ) ||
                        e.button !== 0
                    )
                        return;

                    // let arrStr = '';
                    let IdTemp = e.target.parentElement.parentElement.id;
                    // console.log(e.button + IdTemp);
                    const arrStr = document
                        .getElementById(IdTemp)
                        .getElementsByTagName('span')[0].textContent;
                    // console.log(arrStr);
                        
                    // console.log(
                    //     'callbackForTruckDelete ' +
                    //         e.target.parentElement.parentElement.id
                    // );

                    // const e_id = e.target.parentElement.parentElement.id;
                    // const div_el = document.getElementById(e_id);
                    //  const a = e.target.parentElement.parentElement.getElementsByTagName(
                    //      'span'
                    //  )[0].textContent;
                    // collection-item-
                    // console.log('class ' + cl);
                    // let arrStr='';
                    // try {
                    //     const a =
                    //         e.target.parentElement.parentElement.getElementsByTagName(
                    //             'span'
                    //         )[0].textContent;
                    //     if (cl === 'material-icons truck-delete') {
                    //         // alert(e_id);
                    //         // const div_el = document.getElementById(e_id);
                    //         // alert(
                    //         //     a
                    //         // );
                    //         //получим строку меток в удаляемой авто и преобразуем в массив
                    //         arrStr =
                    //             a
                    //             // div_el.getElementsByTagName('span')[0]
                    //             //     .textContent;
                    //             // e.target.parentElement.parentElement.getElementsByTagName(
                    //             //     'span'
                    //             // )[0].textContent;
                            const arr = arrStr.split(',');
                            // сортировка т.к. будем иметь дело с итератором от 1 до ...
                            arr.sort();
                            arr.forEach((element) => {
                                // Найдем в коллекции геообъект с геометрией "Ломаная линия".
                                let iterator = myCollection.getIterator(),
                                    object;
                                element = element.trim();
                                while (
                                    (object = iterator.getNext()) !==
                                    iterator.STOP_ITERATION
                                ) {
                                    // alert(
                                    //     "point " + object.geometry.getType() + ", " + element + "===" +
                                    //         object.properties.get('iconContent')
                                    // );
                                    if (
                                        // true
                                         object.geometry.getType() === 'Point' &&
                                        // object.options.get('preset') === 'islands#redIcon'
                                        element === object.properties.get('iconContent')
                                    ) {
                                        let tempPreset = data[element]['preset']; //object.options.get('preset');
                                        // alert(tempPreset);
                                        console.log(
                                            'done ' +
                                            object.properties.get(
                                                'iconContent'
                                            ) +
                                            ', el =' +
                                            element
                                        );
                                        object.options.set(
                                            'preset',
                                            tempPreset
                                        );
                                        object.properties._data.activeFlag = false;
                                        // alert(object.options.get('preset'));
                                        break;
                                    }
                                }
                            })
                            subscribePlacemarkClick(arr);
                    //     };
                    // } catch (error) {
                    //     // arr = '';
                    //     // console.log(error);
                    //     return;
                    // }
                };

                // найдем на странице списки левый и правый
                let listLeft =
                    document.getElementsByClassName('myListDeliveryLeft');
                // console.log(listLeft);
                // document.addEventListener('click', () => callback(['3', '5']));
                document.addEventListener('mousedown', (e) => {
                    callbackForTruckDelete(e);
                });
                let listRight = document.getElementsByClassName(
                    'myListDeliveryRight'
                );


                let varPreset;
                let varForBalloonContentBodyAndHintContent;
    
                //заполняем левый и правый списки
                for (let i = 0; i < data.length; i++) {
                    if (data[i]['type'] === 'Москва и область') {
                        const li = document.createElement('li');
                        const hr = document.createElement('hr');

                        li.setAttribute('tabindex', '0');
                        li.innerText =
                            '- ' + data[i]['id'] + ') ' + data[i]['address'];
                        li.title = data[i]['client'];
                        // li.dataset.preset = 'islands#blueIcon';
                        // eslint-disable-next-line no-loop-func
                        // li.addEventListener('click', () => callback(['3','5']));
                        // li.addEventListener('click', function (e) {
                        //     console.log(e.target);
                        //     // varPreset = e.target.dataset['preset'];
                        //     varPreset = 'islands#redIcon';
                        // });
                        // console.log(li);
                        listLeft[0].appendChild(li);
                        listLeft[0].appendChild(hr);
                        varForBalloonContentBodyAndHintContent =
                            data[i]['client'];
                        // varPreset = li.dataset['preset'];
                    } else {
                        const li = document.createElement('li');
                        const hr = document.createElement('hr');
                        li.setAttribute('tabindex', '0');
                        li.innerText =
                            '- ' + data[i]['id'] + ') ' + data[i]['address'];
                        li.title = data[i]['info'];
                        listRight[0].appendChild(li);
                        listRight[0].appendChild(hr);
                        varForBalloonContentBodyAndHintContent =
                            data[i]['type'];
                    }
                }

                // let varPreset;
                // let varForBalloonContentBodyAndHintContent;
                // заполнение меток совйствами и складывание их в колллекцию
                for (let i = 0; i < data.length; i++) {
                    if (data[i]['type'] === 'Москва и область') {
                        varForBalloonContentBodyAndHintContent =
                        data[i]['client'];
                        varPreset = 'islands#blueIcon';
                        // console.log(firstItem.dataset);
                        // varPreset = li.dataset["preset"];
                    } else {
                        varForBalloonContentBodyAndHintContent =
                            data[i]['type'];
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
                                    data[i]['volume'] +
                                    ', ' +
                                    data[i]['pallet'] +
                                    '<br/>' +
                                    varForBalloonContentBodyAndHintContent,
                                iconContent: data[i]['id'],
                                balloonContentBody: [
                                    '<address>',
                                    '<strong>' + data[i]['info'] + '</strong>',
                                    '<br/>',
                                    '<hr/>',
                                    '' +
                                        data[i]['weight'] +
                                        ' кг, ' +
                                        data[i]['volume'] +
                                        ' куб.м., ' +
                                        data[i]['pallet'] +
                                        ' паллет' +
                                        '',
                                    '<br/>',
                                    '<hr/>',
                                    '' +
                                        varForBalloonContentBodyAndHintContent +
                                        '',
                                    '</address>',
                                ].join(''),
                                volumeInPallet: data[i]['volumeInPallet'],
                                weight: data[i]['weight'],
                                volume: data[i]['volume'],
                                pallet: data[i]['pallet'],
                                activeFlag: false,
                                typeDelivery: data[i]['type'],
                                dopInfo: data[i]['info'],
                                varHintAndBody:
                                    varForBalloonContentBodyAndHintContent,
                            },
                            {
                                preset: data[i]['preset'],
                                // preset: () => cb(),
                            }
                        )
                    );
                }

                // сюда еще повесим калькулятор
                // myCollection.events.add(['click'], asd);
                //добавлеяем колбэк слушателя на коллекцию это для калькуляции и окраску+флаг активных меток
                const calc = document.getElementsByClassName('calculator');
                
                let sum_kg = 0;
                let sum_kub = 0;
                let sum_pal = 0;
                let sum_val_in_pal = 0;
                let operand;

                const subscribePlacemarkClick = (numbersOfPoints) => {
                                        numbersOfPoints
                                            .sort()
                                            .forEach((element) => {
                                                // Найдем в коллекции геообъект с геометрией "Point".
                                                let iterator =
                                                        myCollection.getIterator(),
                                                    object;
                                                element = element.trim();
                                                while (
                                                    (object =
                                                        iterator.getNext()) !==
                                                    iterator.STOP_ITERATION
                                                ) {
                                                    if (
                                                        // true
                                                        object.geometry.getType() ===
                                                            'Point' &&
                                                        // object.options.get('preset') === 'islands#redIcon'
                                                        element ===
                                                            object.properties.get(
                                                                'iconContent'
                                                            )
                                                    ) {
                                                        object.events.add(['click'], hendleClickPlacemark)
                                                        // alert(object.options.get('preset'));
                                                        break;
                                                    }
                                                }
                                            });
                }

                const UnSubscribePlacemarkClick = (
                    numbersOfPoints
                ) => {
                    numbersOfPoints
                        .sort()
                        .forEach((element) => {
                            // Найдем в коллекции геообъект с геометрией "Point".
                            let iterator =
                                    myCollection.getIterator(),
                                object;
                            element = element.trim();
                            while (
                                (object =
                                    iterator.getNext()) !==
                                iterator.STOP_ITERATION
                            ) {
                                if (
                                    // true
                                    object.geometry.getType() ===
                                        'Point' &&
                                    // object.options.get('preset') === 'islands#redIcon'
                                    element ===
                                        object.properties.get(
                                            'iconContent'
                                        )
                                ) {
                                    object.events.remove(
                                        'click',
                                        hendleClickPlacemark
                                    );
                                    break;
                                }
                            }
                        });
                };

                // const hendleClickPlacemark = (e) => { 
                //     console.log(e.get('target'));
                //     pointsSelected.push(
                //         e.get('target').properties._data.iconContent
                //     );
                // }

                // стартовая инициализация подписки всех меток коллекции
                const lengthCol = myCollection.getLength();
                (() => { 
                    let tempArr =[];
                    for (let i = 1; i <= lengthCol; i++) { 
                        tempArr.push("" + i)
                    }
                    subscribePlacemarkClick(tempArr);
                })()


                // TEST- done ---------------------------------------------
                function hendleClickPlacemark(e) {
                    let object = e.get('target');

                    // console.log(
                    //     '123' + e.get('target').options._options.preset
                    // );

                    // if (
                    //     e.get('target').options._options.preset ===
                    //     'islands#grayCircleIcon'
                    //     // object.properties._data.activeFlag === true
                    // ) {
                    //     console.log(
                    //         'asd ' + e.get('target').options._options.preset,
                    //         e.get('target').properties._data.activeFlag
                    //     );

                    //     // e.get('target').options.set(
                    //     //     'preset',
                    //     //     'islands#grayCircleIcon'
                    //     // );
                    //     // e.get('target').properties._data.activeFlag = true;
                    //     return;
                    // }

                    if (!object.properties._data.activeFlag) {
                        operand = 1;
                    } else {
                        operand = -1;
                    }
                    let rez = '';
                    calc[0].innerHTML = '';

                    console.log(object.properties._data.activeFlag);
                    console.log(object.properties._data.iconContent);
                    //если флаг активный, то суммируем
                    sum_kg = sum_kg + object.properties._data.weight * operand;
                    sum_kub =
                        sum_kub +
                        object.properties._data.volume.replace(/,/g, '.') *
                            operand;
                    sum_kub = sum_kub.toFixed(1) * 1;
                    sum_pal =
                        sum_pal + object.properties._data.pallet * operand;
                    sum_val_in_pal =
                        sum_val_in_pal +
                        object.properties._data.volumeInPallet.replace(
                            /,/g,
                            '.'
                        ) *
                            operand;
                    sum_val_in_pal = sum_val_in_pal.toFixed(1) * 1;
                    console.log(
                        sum_kg,
                        sum_kub,
                        sum_pal,
                        '(',
                        sum_val_in_pal,
                        ')'
                    );
                    rez = `${sum_kg} кг | ${sum_kub} м3 | ${sum_pal} пал ( ${sum_val_in_pal} м3)`;
                    calc[0].innerHTML += rez;
                    // const arr.push(object.properties._data.iconContent)

                    // массив для сбора выбранных меток в массив
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
                        object.properties._data.activeFlag = false;
                        if (
                            object.properties._data.typeDelivery ===
                            'Москва и область'
                        ) {
                            object.options.set('preset', 'islands#blueIcon');
                        } else {
                            object.options.set('preset', 'islands#redIcon');
                        }
                    } else {
                        object.properties._data.activeFlag = true;
                        object.options.set('preset', 'islands#nightCircleIcon');
                    }

                    // if (object.properties._data.activeFlag === true) {
                    //     // sum_kg = sum_kg - object.properties._data.weight;
                    //     // sum_kub = sum_kub - object.properties._data.volume;
                    //     // sum_kub = +sum_kub.toFixed(1);
                    //     // sum_pal = sum_pal - object.properties._data.pallet;
                    //     object.properties._data.activeFlag = false;
                    //     if (
                    //         object.properties._data.typeDelivery ===
                    //         'Москва и область'
                    //     ) {
                    //         //object.options._options.iconColor='#0095b6';
                    //         //object.options._options.preset= 'islands#redIcon';
                    //         e.get('target').options.set(
                    //             'preset',
                    //             'islands#blueIcon'
                    //         );
                    //     } else {
                    //         //object.options._options.iconColor='#FF4500';
                    //         //object.options._options.preset= 'islands#redIcon';
                    //         e.get('target').options.set(
                    //             'preset',
                    //             'islands#redIcon'
                    //         );
                    //     }
                    // } else {
                    //     // sum_kg = sum_kg + object.properties._data.weight;
                    //     // sum_kub = sum_kub + object.properties._data.volume;
                    //     // sum_kub = +sum_kub.toFixed(1);
                    //     // sum_pal = sum_pal + object.properties._data.pallet;
                    //     object.properties._data.activeFlag = true;
                    //     //object.options._options.iconColor="#0005b6";
                    //     //object.options._options.preset= 'islands#greyIcon';
                    //     e.get('target').options.set(
                    //         'preset',
                    //         'islands#nightCircleIcon'
                    //     ); //'islands#blackIcon'); //  это работает - закараска балуна при нажатии
                    // }
                }

                // пока отключим
                // myCollection.events.add(['click'], MyClick);

                // Добавление коллекции на карту.
                newMap.geoObjects.add(myCollection);
                // setupControls(newMap, myCollection);
                // Устанавливаем центр и масштаб карты так, чтобы отобразить всю коллекцию целиком.
                newMap.setBounds(myCollection.getBounds());

                // const log = document.getElementById('log');
                rightButton.events.add('click', () => {
                    pointsSelected.sort().forEach(
                        (element) => {
                                                        // Найдем в коллекции геообъект с геометрией "Point".
                                                        let iterator =
                                                                myCollection.getIterator(),
                                                            object;
                                                        element =
                                                            element.trim();
                                                        while (
                                                            (object =
                                                                iterator.getNext()) !==
                                                            iterator.STOP_ITERATION
                                                        ) {
                                                            // alert(
                                                            //     "point " + object.geometry.getType() + ", " + element + "===" +
                                                            //         object.properties.get('iconContent')
                                                            // );
                                                            if (
                                                                // true
                                                                object.geometry.getType() ===
                                                                    'Point' &&
                                                                // object.options.get('preset') === 'islands#redIcon'
                                                                element ===
                                                                    object.properties.get(
                                                                        'iconContent'
                                                                    )
                                                            ) {
                                                                // let tempPreset =
                                                                //     data[
                                                                //         element
                                                                //     ]['preset']; //object.options.get('preset');
                                                                // alert(
                                                                //     tempPreset
                                                                // );
                                                                console.log(
                                                                    'done ' +
                                                                        object.properties.get(
                                                                            'iconContent'
                                                                        ) +
                                                                        ', el =' +
                                                                        element
                                                                );
                                                                object.options.set(
                                                                    'preset',
                                                                    'islands#grayCircleIcon'
                                                                );
                                                                // alert(object.options.get('preset'));
                                                                break;
                                                            }
                                                        }
                                                    }
                    );
                    UnSubscribePlacemarkClick(pointsSelected);
                    addTruck(pointsSelected);
                    sum_kg = 0;
                    sum_kub = 0;
                    sum_pal = 0;
                    sum_val_in_pal = 0;
                    calc[0].innerHTML = `0 кг | 0 м3 | 0 пал ( 0 м3)`;
                    // myCollection.events.remove('click', MyClick);
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
                    asd={asd}
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
