const positionElement = {
  position: "",
  setPosition: true,
  getRelativeDocument: function(elm, auto){
    var bounding = elm.getBoundingClientRect();
    var obj = {
      left: bounding.x+scrollX,
      top: bounding.y+scrollY,
      width: elm.scrollWidth,
      height: elm.scrollY
    };
    if(this.setPosition && !auto)
     this.setPositionForElement(elm, obj, document.body);
    return obj;
  },
  getRelativeParentElement: function(elm, pElm){
    var cElement = elm;
    var pElement = cElement.parentElement;
    if (pElm) {
      if ((typeof pElm) == "number") {
        for(var i=1; i<=pElm; i++) {
          pElement = pElement.parentElement;
        }
      } else if((typeof pElm) == "object"){
        pElement = pElm;
      }
    }
    var cPosition = this.getRelativeDocument(cElement, true);
    var pPosition = this.getRelativeDocument(pElement, true);
    var obj = {
      left: cPosition.left - pPosition.left,
      top: cPosition.top - pPosition.top,
      width: cElement.scrollWidth,
      height: cElement.scrollHeight
    };
    if(this.setPosition)
      this.setPositionForElement(elm, obj, pElm);
    return obj;
  },
  setPositionForElement(elm, obj, pElm){
    if(pElm)
      pElm.appendChild(elm);
    if(this.position)
      elm.style.position = this.position;
    elm.style.left = obj.left+"px";
    elm.style.top = obj.top+"px";
    elm.style.width = obj.width+"px";
    elm.style.height = obj.height+"px";
  }
};




Element.prototype.addElement = function(type){
  type = type? type : "div";
  var elm = document.createElement(type);
  this.appendChild(elm);
  return elm;
}




function elementCentering(elm) {
  var childElement = elm;
  var parentElement = childElement.parentNode;
  var leftCentering = (parentElement.scrollWidth - childElement.scrollWidth) / 2;
  var topCentering = (parentElement.scrollHeight - childElement.scrollHeight) / 2;
  childElement.style.left = leftCentering + "px";
  childElement.style.top = topCentering + "px";
  return [leftCentering, topCentering];
}




function contactObjects(objA, objB) {
  var widthA = getNumberPx(objA.style.width);
  var heightA = getNumberPx(objA.style.height);
  var leftA = getNumberPx(objA.style.left);
  var topA = getNumberPx(objA.style.top);
  var widthB = getNumberPx(objB.style.width);
  var heightB = getNumberPx(objB.style.height);
  var leftB = getNumberPx(objB.style.left);
  var topB = getNumberPx(objB.style.top);
  var corners = [
    [leftB, topB],
    [leftB + widthB, topB],
    [leftB, topB + heightB],
    [leftB + widthB, topB + heightB]
  ];
  var c, e;
  for (var i = 0; corners[i]; i++) {
    e = corners[i];
    c = diapason(e[0], leftA, leftA + widthA);
    if (!c) continue;
    c = diapason(e[1], topA, topA + heightA);
    if (c) {
      return true;
    }
  }
  return false;

  function getNumberPx(str) {
    return 1 * (str.replace(/px/i, ""));
  }

  function diapason(x, a, b) {
    return (x >= a && x <= b);
  }
}




function inElement(elm1, elm2) {
  var style1 = elm1.style;
  var style2 = elm2.style;
  var l1 = parseInt(style1.left);
  var t1 = parseInt(style1.top);
  var w1 = parseInt(style1.width);
  var h1 = parseInt(style1.height);
  var l2 = parseInt(style2.left);
  var t2 = parseInt(style2.top);
  var w2 = parseInt(style2.width);
  var h2 = parseInt(style2.height);
  function diapasone(n1, m1, n2, m2) {
    var injection1 = n1 >= n2 && n1 <= (n2+m2);
    var injection2 = (n1+m1) >= n2 && (n1+m1) <= (n2+m2);
    return injection1 && injection2;
  }
  var d1 = diapasone(l1, w1, l2, w2);
  var d2 = diapasone(t1, h1, t2, h2);
  return d1 && d2;
}




const MoveFromAToB = function(leftA, topA, leftB, topB, move, targetObject){
    this.motion = true;
    this.startPosition  = true;
    this.arg = [...arguments];
    this.argState = [...arguments];
    this.nextCoordinates;
    this.j = 0;
    this.idIntrtval = false;
    this.interval;
    this.getNumberPx = function(str){
      return 1*(str.replace(/px/i,""));
    };
    this.getDistance = function(leftA, topA, leftB, topB, move, targetObject){
      var leftA = this.getNumberPx(leftA);
      var leftB = this.getNumberPx(leftB);
      var topA = this.getNumberPx(topA);
      var topB = this.getNumberPx(topB);
      var a = topB - topA;
      var b = leftB - leftA;
      return Math.sqrt((a*a + b*b));
    };
    this.distance = this.getDistance(...arguments);
    this.introFunction;
    this.endFunction;
    this.moveFunction;
    this.functionNextCoordinates;
    this.pauseStatus;
    this.i = 0;
    this.looping;
    this.defaultParameters = function(){
        this.motion = true;

        this.startPosition  = true;
        this.arg = [...this.argState];
        //this.nextCoordinates = false;
        this.idIntrtval = false;
        this.distance = this.getDistance(...this.argState);
        //this.endFunction = false;
        //this.moveFunction = false;
        this.pauseStatus = false;
        this.i = 0;
        this.j = 0;
    }
    this.setCoordinates = function(leftA, topA, leftB, topB, move, targetObject){
        var moveObj = this.getNumberPx(move);
        var currentDistance = this.i*moveObj;
        var ifStop;
        if (this.moveFunction) {
          this.moveFunction(this);
        }
        if(this.startPosition){
            this.startPosition = false;
            targetObject.style.left = leftA;
            targetObject.style.top = topA;
        }
        else{
            ifStop = currentDistance >= this.distance;
            var left2 = !ifStop? this.getLeft2(...arguments) : leftB;
            var top2 = !ifStop? this.getTop2(...arguments) : topB;
            targetObject.style.left = left2;
            targetObject.style.top  = top2;
            //obj.arg = arguments;
            this.arg[0] = left2;
            this.arg[1] = top2;
            if(ifStop){
              this.i = 0;
              if(this.nextCoordinates){
                      if(this.nextCoordinates[this.j]){
                       if(this.functionNextCoordinates){
                         this.functionNextCoordinates(this.nextCoordinates[this.j]);
                       }
                      this.arg = [...this.nextCoordinates[this.j]];
                      this.distance = this.getDistance(...this.arg);
                      this.j++;
                      ifStop = false;
                      this.i = 0;
                      //this.startPosition = true;
                    }
                    else{
                     this.stop(true);                    }
              }
              else{
                  this.stop(true);
              }
            }
        }
        this.i = ifStop? 0 : this.i+1;
    };
    this.start = function(interval){
        this.interval = interval;
        clearInterval(this.idInterval);
        if (this.introFunction && !interval && this.startPosition && this.moveFunction) {
          this.introFunction(this, [...this.arg]);
        }
        if (interval) {
              if (this.introFunction) {
                this.introFunction(this, [...this.arg]);
              }
              this.distance = this.getDistance(...this.arg);
              this.i = 0;
              this.arg = [...this.argState];
              this.motion = true;
              this.startPosition = true;
              this.motion = true;
              this.idInterval = setInterval(
                function(obj){
                  obj.setCoordinates(...obj.arg);
                }, interval,
              this
              );
        }
        else {
              this.idInterval = false;
        }
        if ((this.startPosition || (!interval)) && this.motion){

           this.setCoordinates(...this.arg);
        }

    };
    this.stop = function(interior){
        if(this.endFunction && (!this.looping || !interior)){
          this.endFunction(this);
        }
        clearInterval(this.idInterval);
        this.defaultParameters();
        if (!this.idInterval) {
          this.motion = false;
        }
        if(this.looping && interior){
            this .start(this.interval);
        }
    };
    this.pause = function(){
      clearInterval(this.idInterval);
      this.pauseStatus = true;
    };
    this.continue = function(interval){
      var interval = interval? interval : this.interval;
      if(this.pauseStatus){
          this.idInterval = setInterval(
            function(obj){
              obj.setCoordinates(...obj.arg);
            }, interval,
            this
          );
          this.pauseStatus = false;
      }
    };
    this.getLeft2 = function(leftA, topA, leftB, topB, move,targetObject){
          /*
        d = (m*b) / √((a1^2 + b^2));
        a1 = topN - top1;
        b = leftN - left1
        left2 = left1 - d;
        */
        var leftN = this.getNumberPx(leftB);
        var left1 = this.getNumberPx(leftA);
        var topN = this.getNumberPx(topB);
        var top1 = this.getNumberPx(topA);
        ;
        var m = this.getNumberPx(move);
        var a1 = topN - top1;
        var b = leftN - left1;
        var d = (m*b) / Math.sqrt((a1*a1 + b*b));
        var left2 = left1 + d;
        return left2+"px";
    };
    this.getTop2 = function(leftA, topA, leftB, topB, move,targetObject){
        /*
        n = (m*a1) / √((a1^2 + b^2));
        a1 = topN - top1;
        b = leftN - left1;
        top2 = top1 - n;
        */
        var leftN = this.getNumberPx(leftB);
        var left1 = this.getNumberPx(leftA);
        var topN = this.getNumberPx(topB);
        var top1 = this.getNumberPx(topA);
        var m = this.getNumberPx(move);
        var a1 = topN - top1;
        var b = leftN - left1;
        var n = (m*a1) / Math.sqrt((a1*a1 + b*b));
        var top2 = top1 + n;
        return top2+"px";
    };
}




class MovieElement {
  constructor(elm) {
    this.elm = elm;
    this.positionElement = {
      getRelativeDocument: function(elm){
      var bounding = elm.getBoundingClientRect();
      return {
        left: bounding.x+scrollX,
       top: bounding.y+scrollY
     }
    },
    getRelativeParentElement: function(elm, pElm){
      var cElement = elm;
      var pElement = cElement.parentElement;
      if (pElm) {
        if ((typeof pElm) == "number") {
         for(var i=1; i<=pElm; i++) {
           pElement = pElement.parentElement;
          }
        } else if((typeof pElm) == "object"){
          pElement = pElm;
       }
     }
      var cPosition = this.getRelativeDocument(cElement);
      var pPosition = this.getRelativeDocument(pElement);
      return {
       left: cPosition.left - pPosition.left,
       top: cPosition.top - pPosition.top
      };
     }
    };
    this.getPosition = this.positionElement.getRelativeParentElement.bind(this.positionElement);
    this.position = this.getPosition(elm);
    this.x = this.position.left;
    this.y = this.position.top;
    this.setPositionElement(this.elm, this.x, this.y);
    this.startX;
    this.startY;
    this.moveX = this.x;
    this.moveY = this.y;
    this.startF = () => {};
    this.argFuncStart = [];
    this.moveF = () => {return true};
    this.argFuncMove = [];
    this.endF = () => {};
    this.argFuncEnd = [];
    this.moveActive = true;
    this.moveStop;
    this.fixedElm;
    this.statusMoveX = true;
    this.statusMoveY = true;
    this.indexTouches = 0;
    
  }
  setStart(){
    this.elm.addEventListener("touchstart", evn => {
      this.indexTouches = evn.touches.length - 1;
      this.startX = evn.touches[this.indexTouches].screenX;
      this.startY = evn.touches[this.indexTouches].screenY;
      this.x = parseInt(evn.currentTarget.style.left);
      this.y = parseInt(evn.currentTarget.style.top);
      this.startF(this.x, this.y, ...this.argFuncStart);
    });
  };
  setMovie(){
    this.elm.addEventListener("touchmove", evn => {
    var moveX = this.moveX;
    var moveY = this.moveY;
      if(this.statusMoveX) {
        moveX = this.getElementCoordinates(evn, 0);
      }
      if(this.statusMoveY) {
        moveY = this.getElementCoordinates(evn, 1);
      }
      this.moveActive = this.moveActive || !this.fixedElm? this.moveF(moveX, moveY, this.argFuncMove) : false;
      if(this.moveActive) {
         this.setPosition(evn, moveX, moveY);
         this.moveX = moveX;
         this.moveY = moveY;
      }
      else if(!this.moveStop){
        this.moveX = parseInt(evn.currentTarget.style.left);
        this.moveY = parseInt(evn.currentTarget.style.top);
        this.moveStop = true;
    }
    });
  };
  setEnd(){
    this.elm.addEventListener("touchend", evn => {
      evn.currentTarget.style.left = this.moveX+"px";
      evn.currentTarget.style.top = this.moveY+"px";
      this.x = this.moveX;
      this.y = this.moveY;
      this.endF(this.x, this.y, ...this.argFuncEnd);
      this.moveActive = true;
      this.moveStop = false;
    });
  };
  getElementCoordinates(evn, i){
    var touches = evn.touches[this.indexTouches];
    touches = touches? touches : evn.touches[0];
    var touchesV = [touches.screenX, touches.screenY];
    var startV = [this.startX, this.startY];
    var distance = touchesV[i] - startV[i];
    var v = [this.x, this.y];
    return distance + v[i];
    
  };
  setPosition(evn, x, y){
    if (this.statusMoveX) {
      evn.currentTarget.style.left = x+"px"
    }
    if (this.statusMoveY) {
      evn.currentTarget.style.top = y+"px"
    }
  };
  setPositionElement(e, x, y){
    e.style.left = x+"px";
    e.style.top = y+"px";
  };
  startFunc(func, ...arg){
    this.startF = func;
    this.argFuncStart = [...arg];
  };
  moveFunc(func, ...arg){
    this.moveF = func;
    this.argFuncMove = [...arg];
  };
  endFunc(func, ...arg){
    this.endF = func;
    this.argFuncEnd = [...arg];
  };
  setEvents(){
    this.setStart();
    this.setMovie();
    this.setEnd();
    this.setPositionElement(this.elm, this.x, this.y);
  };
};




function Circling(r, left, top, move, targetObject){
   //PI = L / r*2;
   this.L = Math.PI * r*2;
   this.B = 360 / (this.L/move);
   this.BState = this.B;
   Math.Cos = function(x){
      return Math.cos(x*(Math.PI/180));
   }
   this.getMoveLeft = function(r, A){
      var b = r * Math.Cos(A);
      //alert(["r: "+r, " A: "+A, " cosA: "+Math.Cos(A)], " b: "+b)
      return b;
   }
   this.getMoveTop = function(r, B){
       var a = r * Math.Cos(B)
       return r - a;
  }
  this.getIndexArr = function(x, y , arr){
	  function diapasone(a, b){
		  var res = a-b;
		  res = res<0? -res : res;
		  return res;
	  }
	  function summa(x, y, arr, i){
		  var diapasoneX, diapasoneY;
		  diapasoneX = diapasone(x, arr[i][0]);
		  diapasoneY = diapasone(y, arr[i][1]);
		  return diapasoneX + diapasoneY;
	  }
	  var sum = summa(x, y, arr, 0);
	  var newSum;
	  var index = 0;
	  for(var i=0; arr[i]; i++){
		  newSum = summa(x, y, arr, i);
			  if(newSum < sum){
				  sum = newSum;
				  index = i;
			  }
		  }
	  return index;
  };
  this.getCoordinates = function(){

       var coordinates = [];
       var x, y;
       for (var i = 1; this.B <= 360; i++){
           this.B = this.BState * i;
           x = left+this.getMoveLeft(r, 90 - this.B);
           y = top+this.getMoveTop(r, this.B);
           coordinates[i-1] = [x, y];
        }
        return coordinates;
  }
			
   this.coordinates =   this.getCoordinates();
  //this.getCoordinates();
			this.arrStart = 0;
			this.arrEnd = this.coordinates.length-1;
  this.startPosition = true;
  this.left = left;
  this.top = top;
  this.i = 0;
  this.startFunction = function(){};
  this.moveFunction = function(){};
  this.endFunction = function(){};
  this.setCoordinates = function(){
  		  if(this.arrStart && this.startPosition){
  		  			this.i = this.arrStart;
  		  			this.startFunction(this.coordinates[this.i][0], this.coordinates[this.i][1]);
  		  }
     if(this.startPosition && !this.arrStart){
        targetObject.style.left = left+"px";
        targetObject.style.top = top+"px";
        this.startPosition = false;
        this.startFunction(left, top);
     }
     else if(this.coordinates[this.i] && this.i != this.arrEnd){
     			   this.startPosition = false;
          var x = this.
coordinates[this.i][0];
          var y = this.
coordinates[this.i][1];
     			   targetObject.style.left = x+"px";
     			   targetObject.style.top = y+"px";
          this.moveFunction(x, y);
         //alert([this.getMoveLeft(r, 90-this.B),"x", this.getMoveLeft(r, this.B)]);
         this.i++;
     			   if(this.arrStart && !this.coordinates[this.i]){
     			   			 this.i = 0;
     			   			 this.arrStart = 0;
     			   }
     			   
     }
    else{
        var crd = this.coordinates;
        this.endFunction(crd[crd.length-1][0], crd[crd.length-1][1]);
    }
  }
  this.start = function(){
         this.setCoordinates();
  }
}



const display = {
  verticalScroll: false,
  addDisplay(elm){
    var displayElm = elm? elm : document.getElementById("display");
    var style = displayElm.style;
    style.width = "100%";
    if(!this.verticalScroll)
      style.height = "100%";
    style.position = "absolute";
    style.left = 0;
    style.top = 0;
    style.overflow = "hidden";
    var meta = document.head.addElement("meta");
      //<meta name="viewport" content="width=device-width, user-scalable=no">
    meta.name = "viewport";
    meta.content = `width=device-width, user-scalable=no`;
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    };
  }
};



Element.prototype.touchInterval = function(func, interval, ...arg) {
 if(func && interval) {
   this.touchFunc = func;
   this.touchInterval = interval;
   this.idInterval;
   this.argTouchFunk = [...arg];
   this.statusEndFunc = typeof [...arg][0] == "function";
   if (this.statusEndFunc) {
     this.endTouchFunc = this.argTouchFunk.splice(0, 1)[0];
     
   }
   this.addEventListener(
     "touchstart",
     function(evn){
       elm = evn.currentTarget;
       elm.idInterval = setInterval(
         function(...arg){
           elm.touchFunc(...arg);
         },
         elm.touchInterval,
         ...elm.argTouchFunk
       );
     }
   );
   this.stopInterval = function() {
        clearInterval(this.idInterval);
        if (this.statusEndFunc) {
          this.endTouchFunc(...this.argTouchFunk);
        }
   };
   this.addEventListener(
     "touchend",
     this.stopInterval.bind(this)
   );
   this.addEventListener(
     "touchcancel",
     this.stopInterval.bind(this)
   );
   
 }
};

