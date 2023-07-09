class Detour {
  constructor(arreyObstaclesCoordinates, containerCoordinates) {
    this.L = 10;
    this.CLASS_NAME = "new-elm"
    this.ID = 0;
    this.ITERATION = 70;

    this.console = true;

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
      this.obstArr.push({style: elm});
    });
    this.endCell = false;
    this.num = 0;
    this.limitIteration = 500000;
    this.positionContainer = containerCoordinates;
    this.containerElm;
    this.psevdoContainerElm = {};
  }
  
  getCoordinates(startCoordinates, targetCoordinates) {
    this.setProperety(startCoordinates, targetCoordinates);
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
          if (inElement(this.start, lastCells[j])) {
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
          console.log(`${err.name}__${err.message}\n${err.stack}`);
        }
        break
      }
   }
   var arrClass = document.getElementsByClassName(this.CLASS_NAME);
   console.log('summ cell'+arrClass.length);
   console.log(`num iteration ${this.num}`);
   if (this.endCell){
     this.endCell.prevElements.push(this.endCell);
     let res = [];
     for (var i = 0; i < this.endCell.prevElements.length; i++) {
       res.push(
         [
           this.endCell.prevElements[i].style.left,
           this.endCell.prevElements[i].style.top
           ]
         )
     }
     //return this.endCell.prevElements;
     return res;
    }
}

 setProperety(startElm, endElm) {
  console.log(startElm);
    this.start = {style: startElm};
    this.end = {style: endElm};
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
    arrNewElm[i].style.width = L + "px";
    arrNewElm[i].style.height = L + "px";
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
    if (this.console) {
      console.log(elm);
    }
    this.console = false;
    if (this.centerElm) return;
    elm.style.left = x + "px";
    elm.style.top = y + "px";
    var resDel = this.condForDeletionElm(elm);
    if (resDel) {
      //elm.remove();
      elm.removeStatus = true;
    } else {
        this.perimeterGrov.push(elm);
        var contactCellTarget = contactObjects(elm, this.end);
        if (contactCellTarget) {
          this.endCell = elm;
          return;
        }
      // this.wiewElement(elm, "new-elm");
      }
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
      width: "0px",
      height: "0px",
      left: "0px",
      top: "0px"
    },
    removeStatus: false
  }
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
  var startCoord = filtrObject(stElm.style);
  var containerElm = stElm.parentElement;
  // console.log(startCoordinates == stElm.style);
  var targElm = document.getElementById('target');
  positionElement.getRelativeParentElement(targElm);
  var targCoord = targElm.style;
  console.log(startCoord, targCoord);
  var arrObsElm = [...document.getElementsByClassName('obstacles')];
  var arrObsCoord = [];
  arrObsElm.forEach((elm, index) => {
    positionElement.getRelativeParentElement(elm);
    arrObsCoord.push(elm.style);
  } );
  function filtrObject(obj) {
    let {left, top} = obj;
    return {left, top}
  }
  var myClass = document.getElementById('detour');
  myClass.onclick = () => {
    //console.log(targElm);
    var detour = new Detour(arrObsCoord, {width: 300, height: 300});
    detour.L = 10;
    detour.limitIteration = 500000;
    var coordinates = detour.getCoordinates(startCoord, targCoord);
    //console.log(coordinates[2].style);
    //console.log(coordinates[0]);
    //coordinates = coordinates? coordinates:[];
    coordinates = coordinates || [];
    coordinates.forEach((elm, i) => {
      if(i != 0) {
        var newElm = containerElm.addElement();
        newElm.style.position = 'absolute';
        newElm.style.width = detour.L+'px';
        newElm.style.height = detour.L+'px';
        console.log(elm);
        newElm.style.left = elm[0];
        newElm.style.top = elm[1];
        newElm.style.background = 'red';
        newElm.style.zIndex = 3;
        //console.log(newElm.style);
      }
      
    });
    /*var moveObj = new MoveFromAToB(
      stElm.style.left, stElm.style.top,
      coordinates[coordinates.length-1].style.left, coordinates[coordinates.length-1].style.top,
      '1px',
      stElm
      );*/
    //moveObj.start(100);
  }
}

