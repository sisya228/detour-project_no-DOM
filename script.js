class Detour {
  constructor(arreyObstaclesCoordinates, containerCoordinates) {
    this.L = 10;
    this.CLASS_NAME = "new-elm"
    this.ID = 0;
    this.ITERATION = 70;
    this.num = 0;
    this.start;
    this.end;
    this.perimeterPrev1 = [];
    this.perimeterPrev2 = [];
    this.perimeterGrov = [];
    this.obstaclesArr = [];
    this.obstArrCoord = arreyObstaclesCoordinates;
    this.obstArr = [];
    this.obstArrCoord.forEach((elm) =>{
      this.obstArr.push({style: this.parseIntProperatiObj(elm)});
    });
    this.endCell = false;
    this.num = 0;
    this.limitIteration = 500000;
    this.positionContainer = this.parseIntProperatiObj(containerCoordinates);
    this.containerElm;
    this.psevdoContainerElm = {};
  }

  defaultValue() {
    this.num = 0;
    this.endCell = false;
  }

  getCoordinates(startCoordinates, targetCoordinates) {
    this.setProperaty(startCoordinates, targetCoordinates);
    this.start.prevElements = [];
    var obstArr = this.obstArr;
    this.obstaclesArr = obstArr;
    var lastCells;
    lastCells = this.add8Cells(this.start);
    this.perimeterGrov = [];
    this.perimeterPrev1 = [];
    this.perimeterPrev1 = lastCells;
    for (var i = 0; i < this.ITERATION; i++) {
      lastCells = this.getLastCells(lastCells);
      this.deleteElementsArrey(lastCells, (elm) => { return elm.removeStatus });
      if (i == 0) {
        for (var j = 0; j < lastCells.length; j++) {
          if (this.inElement(this.start, lastCells[j])) {
            //lastCells[j].remove();
            lastCells[j].removeStatus = true;
            lastCells.splice(j, 1);
            break;
          }
        }
      }
      this.perimeterPrev2 = this.perimeterPrev1;
      this.perimeterPrev1 = lastCells;
      this.perimeterGrov = [];
      if (this.endCell || this.num > this.limitIteration) {
        if (this.num > this.limitIteration) {
          const err = new Error("limit iteration")
          console.log(`
            ${err.stack}
            numder itteration: ${this.num}, limit itteration: ${this.limitIteration}
          `);
          this.defaultValue();
        }
        break
      }
   }

   if (this.endCell){
     this.endCell.prevElements.push(this.endCell);
     let res = [];
     for (var i = 0; i < this.endCell.prevElements.length; i++) {
       res.push(
         {
           left: this.endCell.prevElements[i].style.left,
           top: this.endCell.prevElements[i].style.top
          }
       )
     }
     //return this.endCell.prevElements;
    // var arrClass = document.getElementsByClassName(this.CLASS_NAME);
    // console.log('summ cell'+arrClass.length);
     console.log(`num iteration ${this.num}`);
     this.defaultValue();
     return res;
    }
}

 setProperaty(startElm, endElm) {
    this.start = {style: this.parseIntProperatiObj(startElm)};
    this.end = {style: this.parseIntProperatiObj(endElm)};
    this.end.style.width = this.L;
    this.end.style.height = this.L;
    this.psevdoContainerElm = {
      style: this.positionContainer,
    };
    this.psevdoContainerElm.style.left = 0;
    this.psevdoContainerElm.style.top = 0;
    // this.end.style.width = 0;
    // this.end.style.height = 0;
  }
  
getLastCells(arrCells1) {
  var arrCells2 = [];
  for (var i = 0; i < arrCells1.length; i++) {
    arrCells2 = arrCells2.concat(this.add8Cells(arrCells1[i]));
  }
  return arrCells2;
}
  
  
add8Cells(centerElm) {
  var newElmArr = this.getNewElm(centerElm);
  this.styleNewElm(centerElm, newElmArr);
   return newElmArr;
}

getNewElm(centerElm) {
 var newElm = [];
 for (var i = 0; i < 8; i++) {
    newElm[i] = this.addElement();
    newElm[i].prevElements = [...centerElm.prevElements];
    newElm[i].prevElements.push(centerElm);
 }
 return newElm;
}

 
condForDeletionElm(elm, obj) {
  var arrClass = document.getElementsByClassName(this.CLASS_NAME);

  var res = false;
  var inElement = this.inElement;
  var n = 1;
  var num = this.num;
  var perimeterGrov = [...this.perimeterGrov];
  if (perimeterGrov.length >= 24) {
    //perimeterGrov.splice(8,7);
  }
  if (n)
    res = getResult(this.perimeterPrev2);
  if (!n)
    res = getResult(arrClass);
  if (!res && n) {
    res = getResult(perimeterGrov);
  }
  if (!res && n) {
    res = getResult(this.perimeterPrev1);
  }
  if (!res) {
    res = forInElement(this.obstaclesArr);
  }
  if (!res) {
    res = outContainer(this.psevdoContainerElm);
  }
  function getResult(arr) {
    for (var i = 0; i < arr.length; i++) {
      num++;
      if (elm != arr[i] 
      && elm.style.left == arr[i].style.left
      && elm.style.top == arr[i].style.top) {
        res = true;
      }
      if (res) {
        break;
      }
    }
    return res;
  }
  function forInElement(arr) {
    var res;
    for (var i = 0; i < arr.length; i++) {
      res = inElement(elm, arr[i]);
      if (res) {
        break;
      }
    }
    return res;
  }
  function outContainer(containerElm) {
    var res;
    if (!inElement(elm, containerElm)) {
      res = true;
    }
    return res;
  }
  this.num = num;
  return res;
}  

styleNewElm(centerElm, arrNewElm) {
  if (this.centerElm) return;
  for (var i = 0; i < arrNewElm.length; i++) {
    arrNewElm[i].className = this.CLASS_NAME;
    arrNewElm[i].id = "cell" + this.ID;
    this.ID++;
    var L = this.L;
    arrNewElm[i].style.width = L;
    arrNewElm[i].style.height = L;
  }
  var leftCElm = parseInt(centerElm.style.left);
  var topCElm = parseInt(centerElm.style.top);
  var fnDelElm = this.condForDeletionElm;
  var obj = this;
  this.setPosition(
    arrNewElm[0],
    leftCElm - L,
    topCElm - L
  );
  //if (this.centerElm) return;
  this.setPosition(
    arrNewElm[1],
    leftCElm,
    topCElm - L
  );
  //if (this.centerElm) return;
  this.setPosition(
    arrNewElm[2],
    leftCElm + L,
    topCElm - L
  );
  //if (this.centerElm) return;
  this.setPosition(
    arrNewElm[3],
    leftCElm - L,
    topCElm
  );
  //if (this.centerElm) return;
  this.setPosition(
    arrNewElm[4],
    leftCElm + L,
    topCElm,
  );
  //if (this.centerElm) return;
  this.setPosition(
    arrNewElm[5],
    leftCElm - L,
    topCElm + L
  );
  //if (this.centerElm) return;
  this.setPosition(
    arrNewElm[6],
    leftCElm,
    topCElm + L
  );
  //if (this.centerElm) return;
  this.setPosition(
    arrNewElm[7],
    leftCElm + L,
    topCElm + L
  );
}

setPosition(elm, x, y) {
    if (this.centerElm) return;
    elm.style.left = x;
    elm.style.top = y;
    var resDel = this.condForDeletionElm(elm);
    if (resDel) {
      //elm.remove();
      elm.removeStatus = true;
    } else {
        this.perimeterGrov.push(elm);
        var contactCellTarget = this.contactObjects(elm, this.end);
        if (contactCellTarget) {
          this.endCell = elm;
          return;
        }
      // this.wiewElement(elm, "new-elm");
      }
  }

parseIntProperatiObj(obj) {
  function filtrObject(obj) {
    let {left, top, width, height} = obj;
    return {left, top, width, height};
  }
  obj = filtrObject(obj);
  for(let p in obj) {
    obj[p] = parseInt(obj[p]);
  }
  return obj;
}

deleteElementsArrey(arr, condition, test) {
  var i = true;
  for (var i = 0; i < arr.length; i++) {
    if (condition(arr[i])) {
      arr.splice(i, 1);
      i--;
    }
  }
}
addElement() {
  return {
    style: {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    },
    removeStatus: false
  }
}

inElement(elm1, elm2) {
  var style1 = elm1.style;
  var style2 = elm2.style;
  var {left: l1, top: t1, width: w1, height: h1} = style1;
  var {left: l2, top: t2, width: w2, height: h2} = style2;
  function diapasone(n1, m1, n2, m2) {
    var injection1 = n1 >= n2 && n1 <= (n2+m2);
    var injection2 = (n1+m1) >= n2 && (n1+m1) <= (n2+m2);
    return injection1 && injection2;
  }
  var d1 = diapasone(l1, w1, l2, w2);
  var d2 = diapasone(t1, h1, t2, h2);
  return d1 && d2;
}

getContactObjects(objA, objB, crossroads) {
  var widthA = objA.style.width;
  var heightA = objA.style.height;
  var leftA = objA.style.left;
  var topA = objA.style.top;
  
  var widthB = objB.style.width;
  var heightB = objB.style.height;
  var leftB = objB.style.left;
  var topB = objB.style.top;
  
  var corners = [
    [leftB, topB],
    [leftB + widthB, topB],
    [leftB, topB + heightB],
    [leftB + widthB, topB + heightB]
  ];
  var cornersA;
  if (crossroads) {
      cornersA = [
    [leftA, topA],
    [leftA + widthA, topA],
    [leftA, topA + heightA],
    [leftA + widthA, topA + heightA]
  ];

  }
  
  var c, e;
  for (var i = 0; corners[i]; i++) {
    e = corners[i];
    c = !crossroads? diapason(e[0], leftA, leftA + widthA) : diapason(cornersA[i][0], leftB, leftB + widthB);
    if (!c) continue;
    c = diapason(e[1], topA, topA + heightA);
    if (c) {
      return true;
    }
  }
  return false;


  function diapason(x, a, b) {
    return (x >= a && x <= b);
  }
}

contactObjects(objA, objB){
  return this.getContactObjects(objA, objB) || this.getContactObjects(objB, objA)
    ||
    this.getContactObjects(objA, objB, true) || this.getContactObjects(objB, objA, true);
}

wiewElement(elm, className) {
  var newElm = this.containerElm.addElement();
  newElm.className = className;
  newElm.style.width = elm.style.width;
  newElm.style.height = elm.style.height;
  newElm.style.left = elm.style.left;
  newElm.style.top = elm.style.top;
  newElm.style.zIndex = 3;
}
};


/*




*/

window.onload = () => {
  var stElm = document.getElementById("block");
  positionElement.getRelativeParentElement(stElm);
  var startCoord = stElm.style;
  var containerElm = stElm.parentElement;
  var targElm = document.getElementById('target');
  positionElement.getRelativeParentElement(targElm);
  var moveElement = containerElm.addElement();
  moveElement.className = 'move';
  var targCoord = targElm.style;
  var arrObsElm = [...document.getElementsByClassName('obstacles')];
  var arrObsCoord = [];
  arrObsElm.forEach((elm, index) => {
    positionElement.getRelativeParentElement(elm);
    arrObsCoord.push(elm.style);
  } );
  containerElm.onclick = (e) => {
    setPositionElm(e, stElm, targElm);
    console.log('start left', startCoord.left);
    console.log('target left', targCoord.left);    
  } 
  var detour = new Detour(arrObsCoord, {width: 300, height: 300});
  var myClass = document.getElementById('detour');
  myClass.onclick = () => {
    detour.L = 10;
    detour.limitIteration = 500000;
    var coordinates = detour.getCoordinates(startCoord, targCoord);
    coordinates = coordinates || [];
    coordinates.forEach((elm, i) => {
      if(i != 0) {
        var newElm = containerElm.addElement();
        newElm.className = 'path';
        newElm.innerHTML = i;
        newElm.style.width = detour.L+'px';
        newElm.style.height = detour.L+'px';
        newElm.style.left = elm.left+'px';
        newElm.style.top = elm.top+'px';
        console.log(elm);
      }
      
    });
    var nextCoordinates = [];
    coordinates.forEach((elmArr, i, arr) => {
      if (i > 2) {
        nextCoordinates.push(
          [
            arr[i-1].left+'px',
            arr[i-1].top+'px',
            elmArr.left+'px',
            elmArr.top+'px',
            '1px',
            moveElement
            ]
          );
      }
    });
    //nextCoordinates.forEach((elm) => {console.log(elm);});
    if (coordinates[0]) {
      var moveObj = new MoveFromAToB(
        stElm.style.left, stElm.style.top,
        coordinates[2].left+'px',
        coordinates[2].top+'px',
        '1px',
        moveElement
        );
      console.log(nextCoordinates[0][5]);
      moveObj.nextCoordinates = nextCoordinates;
      moveObj.start(50);
    }
    
  // console.log(coordinates[2].left + 'px', coordinates[2].top + 'px');
  }
}

function setPositionElm(objEvn, elm1, elm2){
  elm2.style.left = elm1.style.left;
  elm2.style.top = elm1.style.top;
  elm1.style.left = objEvn.layerX+'px';
  elm1.style.top = objEvn.layerY+'px';
}

function roundingNumbers(num, r) {
  return num - (num % r);
}

