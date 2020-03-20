const PAGE ={
  data:{
    navigatorBarIdArr:["introduction","online","teachers","products","footer"],
    navigatorBarActiveId: '',
    navigatorBarFixed:false,
    navigatorBarFixedOffset:430,
    navigatorBarheight:70,
  },
  init:function(){
    this.bind()
  },
  bind:function(){
    window.addEventListener('scroll',this.refreshNavigator);
    let headerNav = document.getElementById('header-nav')
    this.onEventLister(headerNav,'click','nav-item',this.goNavigator);
  },
  onEventLister: function(parentNode,action,childClassName,callback) {
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  refreshNavigator:function(){
    PAGE.fixedNavigator();
  },
  fixedNavigator:function(){
    let scrollTop = document.documentElement.scrollTop;
    let navigatorBarTop = (PAGE.data.navigatorBarFixedOffset + PAGE.data.navigatorBarheight);
    let navigatorBarFixed = scrollTop >= navigatorBarTop;
    if(PAGE.data.navigatorBarFixed !== navigatorBarFixed){
      PAGE.data.navigatorBarFixed = navigatorBarFixed;
      let headerNav = document.getElementById('header-nav');
      if(navigatorBarFixed){
        headerNav.className = 'header-nav fixed-top';
      }else{
        headerNav.className = 'header-nav';
      }
    }
  },
  goNavigator:function(e){
    let id = e.target.dataset.nav;
    let offsetTop = (document.getElementById(id).offsetTop - PAGE.data.navigatorBarheight);
    document.documentElement.scrollTop = offsetTop;
    let navItem = document.getElementsByClassName('nav-item');
    for(let i=0;i<navItem.length; i++){
      if(navItem[i].dataset.nav == id){
        navItem[i].className='nav-item active';
      }else{
        navItem[i].className='nav-item';
      }
    }
  },
}
PAGE.init()