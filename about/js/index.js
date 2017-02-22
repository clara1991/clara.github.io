window.onload = function(){
    //显示头部内容
    var showHead = {
        introBtn : document.getElementById("introBtn"),
        motto : document.getElementById("motto"),
        closeBtn : document.getElementById("closeBtn"),

        init : function(){
            var self = this,introBtn = self.introBtn,motto = self.motto,closeBtn = self.closeBtn;

            introBtn.addEventListener("click",function(ev){
                ev.preventDefault();

                motto.style.height = "490px";
            });

            closeBtn.addEventListener("click",function(ev){
                ev.preventDefault();

                motto.style.height = "0px";
            });
        }
    };
    var scroll = {
        nav : document.getElementById("nav"),
        content : document.getElementById("content"),
        timer : null,
        from : window.pageYOffset || document.documentElement.scrollTop ||document.body.scrollTop,
        to : 0,
        direction : 0,

        init : function(){
            var self = this, nav = self.nav, content = self.content,
                li = nav.getElementsByTagName("a"),   //选项卡
                section = content.getElementsByTagName("section"),
                val = 0;

            nav.addEventListener("click",function(ev){
                ev.preventDefault();
                var target = ev.target;
                if( target.getAttribute('class') == 'active' ){
                    return;
                }

                for(var i = 0 ; i < li.length;i++){
                    li[i].setAttribute("class","");
                }
                target.setAttribute("class","active");

                self.from = window.pageYOffset || document.documentElement.scrollTop ||document.body.scrollTop;
                self.to = parseInt(ev.target.getAttribute("data-top"),10);
                self.direction = self.from - self.to;

                scroll();
            }); 

            function scroll(){
                var from = self.from,
                    to = self.to,
                    step = Math.abs( from - to )/15;

                if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
                    self.direction < 0 ? document.documentElement.scrollTop += step : document.documentElement.scrollTop -= step;
                }else{
                    self.direction < 0 ? document.body.scrollTop += step : document.body.scrollTop -= step;
                }
                self.from = window.pageYOffset || document.documentElement.scrollTop ||document.body.scrollTop;
                self.timer = setTimeout(scroll,30);
                if( self.direction < 0 && from >= to || self.direction > 0 && from <= to ){
                    clearTimeout( self.timer );
                    self.timer = null;
                }
                window.onscroll = function (){
                    var marginBot = 0;
                    if (document.documentElement){ 
                        var _scrollHeight = document.body.scrollHeight,
                            _scrollTop = document.body.scrollTop,
                            _clientHeight = window.innerHeight;
                        marginBot = _scrollHeight - _scrollTop - _clientHeight;
                        //marginBot = document.body.scrollHeight – document.body.scrollTop- document.body.clientHeight;
                    }
                    if(marginBot<=0) {
                        clearTimeout( self.timer );
                        self.timer = null;
                    }
                }
            }
        }
    };

    var animate = {
        nav : document.getElementById("nav"),
        top : [0,750,1163,2613,3839],
        skill : document.getElementById("skill"),
        project : document.getElementById("project"),
        exp : document.getElementById("exp"),

        init : function(){
            var timer,li = nav.getElementsByTagName("a"),skillList = skill.getElementsByTagName("span"),proList = project.getElementsByTagName("a"),expList = exp.getElementsByTagName("div");
            animate();

            function animate(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||document.body.scrollTop;;

                if(scrollTop >= 0 && scrollTop < 720){
                    addActive(0);
                }else if(scrollTop >= 750 && scrollTop < 1133){
                    addActive(1);
                    addClass(skillList,"active");
                }else if(scrollTop >= 1133 && scrollTop < 2573){
                    addActive(2);
                    addClass(proList,"show");
                }else if(scrollTop >= 2573 && scrollTop < 2900){
                    addActive(3);
                    addClass(expList,"exp_c_l show");
                }else{
                    addActive(4);
                }
            };
            setInterval(animate,30);

            function addActive(id){
                for(var i = 0;i < li.length;i++){
                    li[i].setAttribute("class","");
                    if(i == id){
                        li[i].setAttribute("class","active");
                    }
                }
            }
            function addClass(ele,classname){
                for(var i = 0;i < ele.length;i++){
                    ele[i].setAttribute("class",classname);
                }
            }
        }
    }

    showHead.init();
    scroll.init();
    animate.init();
}