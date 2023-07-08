class Detour {
  constructor(startElm, endElm, obstaclesClassName) {
    this.L = 10;
    this.CLASS_NAME = "new-elm"
    this.ID = 0;
    this.ITERATION = 4;
    this.num = 0;
    this.blockElm = startElm;
    this.end = endElm;
    this.perimeterPrev1 = [];
    this.perimeterPrev2 = [];
    this.perimeterGrov = [];
    this.obstaclesArr = [];
    this.obstaclesClass = obstaclesClassName;
    this.endCell = false;
    this.num = 0;
    positionElement.getRelativeParentElement(this.end);
    positionElement.getRelativeParentElement(this.blockElm);
  }
  
  getCoordinates(iteration) {
    this.blockElm.prevElements = [];
    var obstArr = document.getElementsByClassName(this.obstaclesClass);
    obstArr = [...obstArr];
    obstArr.forEach((elm) =>{
      positionElement.getRelativeParentElement(elm);
    } );
    this.obstaclesArr = obstArr;
    var lastCells;
    lastCells = this.add8Cells(this.blockElm);
    this.perimeterGrov = [];
    this.perimeterPrev1 = [];
    this.ITERATION = iteration? iteration : this.ITERATION;
    this.perimeterPrev1 = lastCells;
    for (var i = 0; i < this.ITERATION; i++) {
      lastCells = this.getLastCells(lastCells);
      if (i == 0) {
        for (var j = 0; j < lastCells.length; j++) {
          if (inElement(this.blockElm, lastCells[j])) {
            lastCells[j].remove();
            lastCells[j].removeStatus = true;
            break;
          }
        }
      }
      this.deleteElementsArrey(lastCells, (elm) => { return elm.removeStatus });
      this.perimeterPrev2 = this.perimeterPrev1;
      this.perimeterPrev1 = lastCells;
      if (i == 1) {
        this.perimeterPrev1.forEach(
          (arg) => {
            //arg.style.background = 'green';
          }
        );
        this.perimeterPrev2.forEach(
          (arg) => {
    
          }
        );
      }
      this.perimeterGrov = [];
      if (this.endCell) {
        //console.log('break');
        break;
      }
   }
   var arrClass = document.getElementsByClassName(this.CLASS_NAME);
   console.log('summ cell'+arrClass.length);
   console.log(`num iteration ${this.num}`);
   if (this.endCell){
     this.endCell.prevElements.push(this.endCell);
     return this.endCell.prevElements;
    }
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
    newElm[i] = centerElm.parentElement.addElement();
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
    if (this.centerElm) return;
    elm.style.left = x + "px";
    elm.style.top = y + "px";
    var resDel = this.condForDeletionElm(elm);
    if (resDel) {
      elm.remove();
      elm.removeStatus = true;
    } else {
      this.perimeterGrov.push(elm);
      var contactCellTarget = contactObjects(elm, this.end);
      if (contactCellTarget) {
         this.endCell = elm;
          return;
      }
    }
  }


deleteElementsArrey(arr, condition) {
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
};


/*

*/
window.onload = () => {
  var stElm = document.getElementById("block");
  var targElm = document.getElementById('target');
  var myClass = document.getElementById('go_for_class');
  myClass.onclick = () => {
    //console.log(targElm);
    var detour = new Detour(stElm, targElm, "obstacles");
    var coordinates = detour.getCoordinates(11);
    coordinates = coordinates? coordinates:[];
    coordinates.forEach((elm) => {
      elm.style.background = "red";
      elm.style.zIndex = 3;
    });
    /*var moveObj = new MoveFromAToB(
      stElm.style.left, stElm.style.top,
      coordinates[coordinates.length-1].style.left, coordinates[coordinates.length-1].style.top,
      '1px',
      stElm
      );*/
    //moveObj.start(100);
  }
  document.getElementById('go').onclick = () => {
  var arr = [];
  for (var i = 0; i < 10000000; i++) {
    arr[i] = {
     style: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      }
   };
}

console.log(arr.length);
    
  }
}
