const PAGE ={
  data:{
    navigatorBarIdArr:["introduction","online","teachers","products","footer"],
    navigatorBarActiveId: '',
    navigatorBarFixed:false,
    navigatorBarFixedOffset:500,
    index:0,
    duration:400,
    isLock:false,
    translateX:0,
    defaultLenght:null,
    itemWidth:240,
  },
  init:function(){
    this.bind();
    this.clone();
  },
  bind:function(){
    let headerNav = document.getElementById('header-nav')
    let teachLeft = document.getElementById('teach-left');
    let teachRight = document.getElementById('teach-right');
    window.addEventListener('scroll',this.fixedNavigator);
    teachLeft.addEventListener('click',this.teachLeft);
    teachRight.addEventListener('click',this.teachRight);
    this.onEventLister(headerNav,'click','nav-item',this.goNavigator);
  },
  onEventLister: function(parentNode,action,childClassName,callback){
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  teachLeft:function(){
    let index = PAGE.data.index;
    PAGE.goIndex(index - 1)
  },
  teachRight:function(){
    let index = PAGE.data.index;
    PAGE.goIndex(index + 1);
  },
  clone:function(){
    let teachItem = document.getElementsByClassName('teach-item');
    let teachList = document.getElementById('teach-list');
    let length = teachItem.length;
    let itemPrepend = []
    PAGE.data.defaultLenght = length - 1;
    for( let i = 0; i < 3; i++){
      teachList.appendChild(teachItem[i].cloneNode(true));
      itemPrepend.push(teachItem[length -1- i].cloneNode(true));
    }
    itemPrepend.forEach(data => {
      teachList.prepend(data);
    })
    let index = PAGE.data.index;
    let teachItemWidth = PAGE.data.itemWidth;
    
    PAGE.data.translateX = -(teachItemWidth + teachItemWidth * index);
    PAGE.goIndex(index);
  },
  goIndex:function(index){
    let teachDuration = PAGE.data.duration;
    let teachItemWidth = PAGE.data.itemWidth;
    let beginTranslateX = PAGE.data.translateX;
    let endTranslateX = -(teachItemWidth * 3 + teachItemWidth * index);
    let teachItem = document.getElementById('teach-list');
    let isLock = PAGE.data.isLock;
    if(isLock){
      return
    }
    PAGE.data.isLock = true;
    PAGE.navAnimateTo(beginTranslateX,endTranslateX,teachDuration,function(value){
      teachItem.style.transform = `translateX(${value}px)`;
    },function(value){
      let teachLength = PAGE.data.defaultLenght;
      if(index === -1){
        index = teachLength;
        value = -(teachItemWidth * 3 + teachItemWidth * index)
      }
      if(index === teachLength + 1){
        index = 0;
        value = - (teachItemWidth * 3 - teachItemWidth * index )
      }
      teachItem.style.transform = `translateX(${value}px)`;
      PAGE.data.index = index;
      PAGE.data.translateX = value;
      PAGE.data.isLock = false;
    })
  },
  navAnimateTo:function(begin,end,duration,changeCallback,finishCallback){
    let starTime = Date.now();
    requestAnimationFrame(function update(){
      let dataNow = Date.now();
      let time = dataNow - starTime;
      let value = PAGE.linear(time,begin,end,duration);
      typeof changeCallback === `function` && changeCallback(value)
      if(starTime + duration >dataNow){
        requestAnimationFrame(update);
      }else{
        typeof finishCallback === `function` && finishCallback(end)
      }
    })
  },
  fixedNavigator:function(){
      let headerNav = document.getElementById('header-nav');
      let scrollTop = document.documentElement.scrollTop;
    if(scrollTop > PAGE.data.navigatorBarFixedOffset){
        headerNav.className = 'header-nav fixed-top';
      }else{
        headerNav.className = 'header-nav';
    }
  },
  goNavigator:function(e){
    let id = e.target.dataset.nav;
    let offsetTop = document.getElementById(id).offsetTop - 75;
    PAGE.srcAnimateTo(offsetTop);
    let navItem = document.getElementsByClassName('nav-item');
    for(let i=0;i<navItem.length; i++){
      if(navItem[i].dataset.nav == id){
        navItem[i].className='nav-item active';
      }else{
        navItem[i].className='nav-item';
      }
    }
  },
  srcAnimateTo:function(end){
    let duration = PAGE.data.duration;
    let starTime = Date.now();
    let begin = document.documentElement.scrollTop;
    requestAnimationFrame(function update(){
      let dataNow = Date.now();
      let time = dataNow - starTime;
      let value = PAGE.linear(time,begin,end,duration);
      document.documentElement.scrollTop = value
      if(starTime + duration > dataNow){
        requestAnimationFrame(update)
      }else{
        document.documentElement.scrollTop = end;
      }
    })
  },
  linear: function(time,begin,end,duration) {
    return ( end - begin ) * time / duration + begin;
  }
}
PAGE.init()