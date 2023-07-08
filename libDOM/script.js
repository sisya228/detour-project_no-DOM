const concept = {
  info: {
    title: `libDOM`,
    text: `,,libDOM,, - это библиотека  с набором  функций, прототипов, объектов и классов позволяющих работать с ,,DOM,,, для работы с более сложными проектами, например при создании игр для браузеров.`,
    url: "https://drive.google.com/file/d/12ET4uT0rWPGCyjGKEWBomJqeUV2PhPac/view?usp=drivesdk",
    urlTex: "download ,,libDOM,,"
  },
  sections: [
    {
      title: `positionElement`,
      text: `Если в таблице стилей ,,(css),, задать такие заначения как ,,left, top, width, height,,, то эти данные не будут вычислены в скрипте через такие свойства как, напимер: ,, elm.style.left ,,. В этих свойствах просто будет содержаться пустая строка .
      Объект positionElement определяет позиции элемента (такие как left, top, width, height) и задают эти данные в высше упомянутые свойства.`,
      additions: [[
        "Методы",
        {
          title: 'getRelativeDocument(elm), и метод getReletiveParentElement(elm)'
          ,
          text: `Где ,, elm,, - элемент в отношинии которого проходят вычисляния. Эти методы возвращают объект, содержащий свойства ,,left, top, width, height,,. Также задают эти значения в style элемента: ,, elm.style.left, elm.style.top, elm.style.width, elm.style.height,,.
           Первый метод возвращает данные относительно документа, а второй относительно родительского элемента. &&&&В качестве второго аргумента метода ,, getReletiveParentElement(cElement, pElement),, Можно указать элемент (pElement) в отношении к  которому и будут вычислены и заданы. координаты, а cElement будет присвоен для pElement в качестве дочернего элемента &&&&.`
        }
       ],
       [
         'Свойства',
         {
           title: 'setPosition',
           text: `Если не надо, чтобы данные записывались в объект ,,style,, нужно установить значение этого свойства в false (positionElement.setElement = false), по умолчанию значение этого свойства- &&&&true&&&&`
         },
         {
           title: "position",
           text: `Можно в качестве значения указать тип позиционирования элемента, &&&& Например: ,,positionElement.position = "absolute",,&&&& .`
         }
       ]
      ],
    },
    {
      title: "Element.prototype.addElement",
      text: "Прототип, который создаёт и добавляет дочерний узел к элеменуту. Этот прототип создаёт метод, принимающий аргумент с указанием на тип элемента, на имя тега (по умолчанию- &&&& \"div\")&&&&, Возвращает созданный элемент",
      additions: [[
        'Пример',
        {
          title: '',
          text: `
            ,,
            var elm = document.getElementById("block"); ,, // Находим элемент по идентифекатору.
            ,,var newElm = elm.addElement("img"); ,,// Создаём дочерний узел в хтом элементе. newElm- новый дочерний элемент.
            
          `
        }
        ]
      ]
    },
    {
      title: "elementCentering(elm)  &&&&-где elm ,- элемент для центрирования.&&&&",
      text: "Центрирует передаваемый в параметер функции элемент в родительском элементе",
      additions: [
        [
          "Примечание",
          {
            title: '',
            text: `Функция возвращает массыв содержащий позиции элемента: ,,[left, top,,]`
          }
          ]
        ]
    },
    {
      title: "contactObjects(elm1, elm2)",
      text: "Функция проверяет прикосается ли элемент ,,elm1,, элемента ,,elm2,,",
      additions: [
          [
            'Дополнение:',
            {
              title: 'Возвращает ,,true,, или  ,,false,,',
              text: `
              Если два переданных в функцию элемента прикосаются друг друга результат будет- ,,true,,, если же эти элементы находятся в определённом расстоянии друг от друга, то получим- ,,false,,.
              `
            }
          ]
        ]
    },
    {
      title: "inElement(elm1, elm2);",
      text: "Работает подобно функции ,, contactObject,,, но возвращает &&&&true&&&&, если ,,elm1,, находится на ,,elm2,,, не выходя за его приделы.",
      additions: [
          [
            'Примечание',
            {
              title: '',
              text: `Длина и высота ,,elm1,, не должны перевышать ,,elm2,,, иначе результат всегда будет &&&&false&&&& . `
            }
          ]
        ]
    },
    {
      title: "new MoveFromAToB(leftA,topA, leftB, topB, move, targetObject;)",
      text: "Это конструктор объекта, спомощью которого можно перемещать элементы веб-страницы с одной позиции в другую (из точки A в точку B).",
      additions: [
          [
            'Концепция',
            {
              title: 'Синтаксис',
              text: `
var ,,moveFromAToB = new MoveFromAToB(позизия точки A с лева, позиция точки A с верху, позизия точки B с лева, позиция точки B с верху, длина шага, целевой объект (элемент веб-страницы)) ;,,

Для начала движения целевого объекта используется метод start(здержка шага в милисекундах);
&&&&Если не указать задержку, то движение будет происходить при каждом вызове метода ,,start(),,&&&&`
            },
            {
              title: 'Пример',
              text: `&&&&
var moveFromAToB = new MoveFromAToB(
10+"px", 20+"px",
100+"px", 120+"px",
10+"px",
document.getElementById("id_target_object")
);
moveFromAToB.start(100);&&&&
              `
            }
          ],
          [
          'Методы',
          {
            title: 'stop(); pause(); continue();',
            text: `
            ,,stop();,, - Остановка движения целевого объекта.

,,pause();,, - Пауза.

,,continue();,, - Восстановление движения после паузы. В качестве параметра можно указать новую задержку шага в милисекундах, например ,,continue(50);,,
            `
          }
           
          ],
          [
            'Свойства',
            {
              title: 'nextCoordinates',
              text: `
              С помощью данного свойста можно задать массив, состоящий из множества массивов, в которых содержатся дополнительные координаты для продолжения передвижения целевого объекта, или других объектов. Координаты указываются в том формате, что и при инициализации конструктора объектов ,,MoveFromAToB,,:
&&&&[
[позизия точки A с лева, позиция точки A с верху, позизия точки B с лева, позиция точки B с верху, длина шага, целевой объект (элемент веб-страницы)]
];&&&&

Пример использования:
<hr>&&&&
var c = document.getElementById("target_object");
var coordinates = [
[70+"px", 90+"px", 110+"px", 120+"px", 10+"px", c],
[110+"px", 120+"px", 154+"px", 140+"px", 10+"px", c],
[154+"px", 140+"px", 200+"px", 300+"px", 10+"px", c]
];
moveFromAToB.nextCoordinates = coordinates;&&&&
              `
            },
            {
              title: ' Встраиваемые функции:   moveFunction, nextCoordinates, introFunction, endFunction:',
              text: `
             ,,moveFunction,, - Функция, которая будет вызываться при каждом шаге целевого объекта.
Пример использования:
<hr>&&&&
var color = [
"#9fff7f",
"#ffffcf",
"#ff9fff",
"#ffff9f",
"#9fffff",
"#9fff9f",
"#ffffff"
];
moveFromAToB.moveFunction = function(){
container = document.getElementById("container"); container.style.background = color[i];
i = i < color.length
}
&&&&<hr>
,,functionNextCoordinates,, - Функция, при смене координат (если они заданы в nextCoordinates).

,,introFunction,, - Функция в начале выполнения сценнария.

,,endFunction,, - Функция при завершении сценария. 
              `
            },
            {
              title: 'distance',
              text: `Дистанция от точки ,,A,, до точки ,,B,, в пикселях.`
            },
            {
              title: 'looping',
              text: `Если установить значение  true, то движение будет зациклено. По умочанию- false.`
            }
          ]
        ]
    },
    {
      title: "new MovieElement(elm)",
      text: `
      Класс для передвижения объектов по веб странице. &&&&Предназначен для сенсорных экранов.&&&&
      `,
      additions: [
          [
            'Задать события',
            {
              title: 'setEvents();',
              text: `Чтобы подготовить элемент к возможности передвижения надо задать необходимые для этого события с пощью метода ,,setEvents(),,`
            },
            {
              title: 'Пример',
              text: `
              var movie = new MovieElement(elm);
             movie.,,setEvents(),,;
             `
            }
          ],
          [
           'Методы',
           {
             title: `
             startFunc((x, y) => {}, ...arg);
             moveFunc((x, y) => {return true;}, ...arg);
             endFunc((x, y) => {}, ...arg);
             Где первый аргумент- функция обратного вызова, а следующие аргументы- значения передаваемые функции обратного вызова. x, y - это значения позиции left и top элемента в пераметрах функции.
             `,
             text: `
             Эти методы передают функции обратного вызова, которые будут вызываться при определённых этапах передвижения элемента:
             ,,startFunc,, - сработает когда пользоатель начнёт взаимодействовать с элементом;
             ,,moveFunc,, - Будет срабатывать при движении элемента. Эта функция должна возвращать устловие прикотором элемент будет продолжать передвигаться. Если он должен передвигаться в любом случаето стоит утановить ,,return &&&&true&&&&,,;
             ,,endFunc,, - сработает в тот момент, когда пользователь перестанет взаимодействовать с элементом.
             
             ,,Пример:,,
             <hr>&&&&
             var movie = new MovieElement(elm);
             movie.fixedElm = false;
             movie.moveFunc((x, y, text) => {
               console.log(text+'x: '+x+', y: '+y);
               return x > 0;
             }, 'position element- ');
             &&&&
             
             `
             
           }
          ],
          [
            'Свойства',
            {
              title: 'fixedElm',
              text: `
              При использовании функции обратного вызова в ,,moveFunc(cBeck),, определяет
              стоит ли фиксировать элемент когда условие возвращаемое функцией будет ложным, или ждать когда условие станит итинным. Для фиксации установить на &&&&true&&&&: при этом элемент не будет двигаться, пока пользовать снова не станет взаимодействовать с элементом. По умолчанию это свойство - &&&&false&&&&. `
             },
             {
               title: 'statusMoveX; statusMoveY;',
               text: `
               Чтобы запретить пользователю передвигать элемент по оси &&&&,,X,,&&&& или ,,&&&&Y,,&&&&, то надо установить одно из этих свойств на &&&&false&&&& .
               `
             }
          ]
        ]
    },
    {
      title: `function Circling(r, left, top, move, targetObject); Где ,,r,, - радиус, ,,left,,, и ,,top,, - позиция точки начала движения, ,,move,, - длина шага. ,,targetObject,, - целевой объект. Координаты указывать в чиловом значении (без ,,px,,)`,
      text: `
      Класс, который двигает элемент по окружности. Передвижение на каждый шаг происходит при вызове метода ,,start,, .
      `,
      additions: [
          [
            'Свойства:',
            {
              title: 'coordinates',
              text: ` Содержит в массиве координаты окружности по которым движется элемент при каждом вызове ,,start(),,`
            },
            {
             title: 'arrStart; arrEnd',
             text: `
             Здесь можно указать индексы массива ,,coordinates,,, с которых объект начнёт и окончит движение.
             &&&&Например:&&&&
             arrStart = 10;
             arrEnd = objC.coordinates.length-1;
             `
            },
            {
              title: 'reverse',
              text: `Элемент перемещается против часовой стрелки.`
            },
            {
              title:'startFunction; moveFunction; endFunction;',
              text: `Можно в эти свойства задать функции которые будут вызываться в начале движения, при каждом шаге и в конце движения. Подобно как в классе ,,moveFromAToB,,. В эти функции передаются текущие координаты движущегося элемента для первого и второго параметров функций.`
            }
          ],
          [
           'Методы',
           {
             title: 'getIndexArr(x, y, arr); Где ,,x,, и ,,y,, - координаты точки, ,,arr,, - массив &&&&coordinates&&&&', 
             text: `С помощью этого метода можно определить индекс массива ,,coordinates, указывающий на ближайшие координаты для точки с координатами ,,x,, и ,,y,,. `
           }
          ]
        ]
    },
    {
      title: "display",
      text: `
      Это объект, который позволяет создать область на вебстранице, без полос прокрутки и увеличения масштаба. Для этого надо создать &&&&div&&&&-элемент в &&&&html&&&&-файле и передать его в метод ,,addDisplay,,. При этом весь контент должен находится внутри этого &&&&div&&&&-элемента. Создание такого дисплея идеально подходит для написания браузерных игр, так как не мешает навязчивая прокрутка страницы и не увеличивается масштаб при двойном клике.
      `,
      additions: [
          [
            'Пример',
            {
              title: 'index.html',
              text: `< !DOCTYPE html>
< html>
    < head>
        < title>Page Title< /title>
         < script src="libDOM.js">< /script>
  < script src="script.js">< /script>
    < /head>
    < body>
        ,,< div id="display">,,
          &&&&Здесь помещаем весь контент.&&&&
        ,,< /div>,,
    < /body>
< /html>                `
            },
            {
              title: 'script.js',
              text: `
            window.onload = () => {
              var displayElm = document.getElementById("display");
             ,,var coordinatesDisplay = display.addDisplay(displayElm);,,
             // &&&&Метод создаёт область без полос прокрутки и возвращает объект содержащий ширину и высоту этой области.&&&&
            console.log(coordinatesDisplay.width, coordinatesDisplay.height);
            };
              `
            },
          ],
          [
            'Свойство',
            {
              title: 'verticalScroll',
              text: `
              Чтобы разрешить вертикальную прокрутку- в свойство ,,verticalScroll,, устанавливаем &&&&,,true,,&&&& .
             ,,display.verticalScroll = &&&&true&&&&;,,
              `
            }
          ]
        ]
    },
    {
      title: "Element.prototype.touchInterval(func, interval, ...arg); &&&&Где ,,func,,- функция обратного вызова, ,,interval,, - задержка в милисекудах, при которых обновляет ся функция, ,,..arg,, - аргументы функции обратного вызова.&&&&",
      text: ` Прототип позволяющий обновлять функцию в заданный интервал времени в тот момент, когда элемент удерживается. Чтобы было легче разобраться с использованием ,,touchInterval,,, то надо понимать, что синтаксис здесь такой же как и при вызове ,,setInterval,,.
      `,
      additions: [
          [
            'Пример',
            {
              title: 'index.html',
              text: `
              < !DOCTYPE html>
< html>

< head>
  < meta charset="UTF-8">
  < link rel="stylesheet" href="style.css">
  < script src="script.js">< /script>
    < script src="libDOM.js">< /script>
< /head>

< body>
< div id="info">i< /div>
< div id="button">< /div>
< /body>

< /html>

              `
            },
            {
              title: 'script.js',
              text: `
var log;
var i = 0;
window.onload = function(arg) {
  var btn = document.getElementById("button");
  log = document.getElementById("info");
  &&&&,,btn.touchInterval(
    function(arg) {
      log.innerHTML = i;
      i++;
    },
    300
  );,,&&&& 
  //Функция обратного вызова обновляется через каждые &&&&300&&&& миллисекунд  во время удерживания кнопки. 
}`
              
            },
            {
              title: "style.css",
              text: `
              #button {
  width: 100px;
  height: 50px;
  border: solid 3px red;
  border-radius: 25px;
  background: linear-gradient(#CB38CA, #38CB6E);
  position: relative;
  left: 100px;
  top: 300px;
}

              `
            }
          ],
          [
            'Дополннние:',
            {
              title: 'Функция в конце сценария',
              text: `
                Если первым параметрем переданным в функцию обратного вызова будет являться фунцией, то она будет вызвана в конце сценария (когда пользователь перестанет удерживать элемент);
              `
            },
            {
              title: 'Например',
              text: `
              function intervalFunc(...arg) {
                // body...
              };
              function endFunc(...arg) {
                console.log("stop interval");
                var btn = document.getElementById("button");
                btn.touchInterval(intervalFunc, 500 ,,endFunc,,, ...arg); // Функция ,&&&&endFunc&&&& будет вызвана когда пользователь отпустит кнопку
              }
              `
            }
            
          ]
        ]
    },

/*    {
      title: "",
      text: "",
      additions: [
          [
            'name addition',
            {
              title: '',
              text: ``
            }
          ]
        ]
    },
*/
/*    {
      title: "",
      text: "",
      additions: [
          [
            'name addition',
            {
              title: '',
              text: ``
            }
          ]
        ]
    },
*/
/*    {
      title: "",
      text: "",
      additions: [
          [
            'name addition',
            {
              title: '',
              text: ``
            }
          ]
        ]
    },
*/

   ] 
};
String.prototype.replaceAll = function() {
  var str = this.replace(
    /\n/img, "<br>"
  );
  str = str.replace(
     /,,(.*?),,/img, "<b><u><var>$1</var></u></b>" 
  );
  str = str.replace(
    /&&&&(.*?)&&&&/img, "<i>$1</i>"
  );
  return str;
}
var num = 1;
window.onload = () => {
  display.verticalScroll = true;
  display.addDisplay(document.getElementById("display"));
  var containerElm = document.getElementById("container");
  var info = {
    title: '',
    text: ''
  };
  var sections = [
          {
      title: "",
      text: "",
      additions: [
          [
            'name addition',
            {
              title: '',
              text: ``
            }
          ]
        ]
     }
  ];
  var headElm = document.getElementById("head");
  headElm.className = "general-style";
  info.title = headElm.addElement("h1");
  info.text = headElm.addElement("p");
  info.url = headElm.addElement("a");
  info.title.innerHTML = concept.info.title;
  info.text.innerHTML = concept.info.text.replaceAll();
  info.url.href = concept.info.url;
  info.url.id = "urlLib";
  info.url.innerHTML = concept.info.urlTex.replaceAll();
  
  var blockAddition;
  for (var i = 0; concept.sections[i]; i++) {
    sections[i] = containerElm.addElement("p");
    sections[i].className = "sections";
    sections[i].sTitle = sections[i].addElement();
    sections[i].sTitle.className = "title-section general-style";
    sections[i].sTitle.innerHTML = concept.sections[i].title.replaceAll();
    sections[i].text = sections[i].addElement();
    sections[i].text.className = "text-section general-style";
    sections[i].text.innerHTML = concept.sections[i].text.replaceAll();
    sections[i].sTitle = sections[i].addElement();
    sections[i].button = sections[i].addElement("button");
    sections[i].button.innerHTML = "Дополнительная информация:";
    sections[i].additions = sections[i].addElement();
    sections[i].additions.className = "additions general-style";
    sections[i].additions.arrAddition = [];
    sections[i].additions.style.display = "none";
    sections[i].onclick = function(evn){
      var styleAddition = evn.currentTarget.additions.style;
      styleAddition.display  = styleAddition.display == "none"? "block" : "none";
      
    };
    for (var j = 0; concept.sections[i].additions[j]; j++) {
      sections[i].additions.arrAddition[j] = sections[i].additions.addElement();
      sections[i].additions.arrAddition[j].className = "block-addition";
      sections[i].additions.arrAddition[j].innerHTML;
      sections[i].additions.arrAddition[j].arrBlock = [];
      sections[i].additions.arrAddition[j].arrBlock[0] = sections[i].additions.arrAddition[j].addElement();
      sections[i].additions.arrAddition[j].arrBlock[0].innerHTML = concept.sections[i].additions[j][0].replaceAll();
      for (var x = 1; concept.sections[i].additions[j][x]; x++) {
        blockAddition = sections[i].additions.arrAddition[j].arrBlock;
        blockAddition[x] = {};
        blockAddition[x].title = sections[i].additions.arrAddition[j].addElement();
        blockAddition[x].title.className = "title-block";
        blockAddition[x].title.innerHTML = concept.sections[i].additions[j][x].title.replaceAll();
        blockAddition[x] = {};
        blockAddition[x].text = sections[i].additions.arrAddition[j].addElement();
        blockAddition[x].text.className = "text-block";
        blockAddition[x].text.innerHTML = concept.sections[i].additions[j][x].text.replaceAll();
      }
    }
    
  }
  var inf = concept.sections[0].additions[0][0];
  
} 
