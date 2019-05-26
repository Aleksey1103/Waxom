$(document).ready(function () {
     //Конфигурации страницы зависящие от исходной и изменяемой ширины окна
     var windowWidth = window.innerWidth;
     counter = 5; // счетчик количества отображаемых элементов в блоке "block-projects-grid" в зависимости от ширины окна
     function projectsOnTop() {
        projectsTop = $('.block-projects').offset().top - 30;           
        $('body,html').animate({scrollTop: projectsTop}, 500);
     };
     if (windowWidth<=1152) {counter = 3;}; 
     if (windowWidth<=840) {counter = 1;};
     //Включение модального меню при загрузке страницы   
     if (windowWidth<=1100) {
         $('.nav-list').addClass('modal');                         
     };
     //- - - - - - - - -- - - - - - - - - - - - - - - -
     $(window).resize(function(){        
        var resisedWidth = window.innerWidth;
        //Переключение количества отображаемых элементов в в блоке "block-projects-grid"
        function visibilityCounter() {           
            $('.block-projects-grid-item:lt(' + (counter + 1) + ')').show();
            $('.block-projects-grid-item:gt(' + counter + ')').hide();
            $('.page__btn_more').show().text('load more');
            $('.block-projects-nav__link').removeClass('active');
            $('#all').addClass('active');            
        };
        if (resisedWidth>1152) {
            counter = 5;
            visibilityCounter();
        };            					
        if (resisedWidth<=1152) {
            counter = 3;
            visibilityCounter();
        };            					
        if (resisedWidth<=840) {
            counter = 1;
            visibilityCounter();
        };
        //Переключение модального/немодального меню
        if (resisedWidth<=1100) {                    
            $('.nav-list').addClass('modal');            						
        };
        if (resisedWidth>1100) {
            $('.nav-list').removeClass('modal').removeAttr('style');            
        };
     });        
    //Показать/скрыть дополнительные элементы блока "block-projects-grid"
    $('.block-projects-grid-item:gt(' + counter + ')').hide(); // начальное состояние дополнительных элементов
    $('.page__btn_more').click(function(){                       
        var itemVisibility = $('.block-projects-grid-item:hidden').length;            
        if (itemVisibility != 0 ) {
            $('.block-projects-grid-item:hidden').fadeIn(); 
            $('.page__btn_more').text('hide');
        }                
        else  {                
            $('.block-projects-grid-item:gt(' + counter + ')').fadeOut();                
            $('.page__btn_more').text('load more');
            projectsOnTop();            
        }            
    });
    //Переключение между группами элементов блока "block-projects-grid"
    $('.block-projects-nav__link').click(function(event){
        event.preventDefault();           
        $('.block-projects-nav__link').removeClass('active');
        $(this).addClass('active');
        var elementGroup = '.' + $(this).attr('id');            
        if (elementGroup == '.all') {
            $('.block-projects-grid-item').hide();
            $('.block-projects-grid-item:lt(' + (counter + 1) + ')').fadeIn();            
            $('.page__btn_more').fadeIn().text('load more');          
        }
        else {
            $('.block-projects-grid-item:not(' +  elementGroup + ')').hide();
            $(elementGroup).fadeIn();
            $('.page__btn_more').hide();
        }                            
    });
    //Ховер эффект элементов в блоке "block-projects-grid"    
    $('.block-projects-grid-item').hover(            
        function () {
            $(this).children().css('transition', '.3s');                                         
            $(this).find('.block-projects-grid__img').css({'filter': 'brightness(50%)'});
            $(this).find('.block-desc_projects').css({'background-color': '#362f2d',
            'z-index': '1', 'border-bottom-color': '#362f2d'});           
            $(this).find('.block-desc__heading_projects').css('color', '#fff');
            $(this).find('.block-desc__subheading_projects').css('color', '#c7b299');               
            $(this).find('.block-projects-grid-item__chain').fadeIn(200);                
        },
        function () {                
            $(this).find('.block-projects-grid__img').removeAttr('style');
            $(this).find('.block-desc_projects').removeAttr('style');           
            $(this).find('.block-desc__heading_projects').removeAttr('style');
            $(this).find('.block-desc__subheading_projects').removeAttr('style');
            $(this).find('.block-projects-grid-item__chain').hide();
            $(this).children().css('transition', '.3s');
        }
    );
    //Ховер эффект кнопки в разделе "page page_video"
    $('.block-video-btn').hover(
        function(){
            $('.block-video-btn__bg').css({'transition': '.5s', 'transform': 'rotate(-360deg)', 'box-shadow': '0px 0px 30px #fff'});
        },
        function() {
            $('.block-video-btn__bg').removeAttr('style');
        }
    );        
    //Карусель в разделе "page page_main"
    $('.block-carousel').slick({
        dots: true,
        arrows: true,            
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="73"><defs><filter id="a" x="0" y=".031" width="40" height="72.938" filterUnits="userSpaceOnUse"><feFlood result="flood" flood-color="#fff"/><feComposite result="composite" operator="in" in2="SourceGraphic"/><feBlend result="blend" in2="SourceGraphic"/></filter></defs><path d="M38.026 72.979L0 36.5 38.026.018l1.969 2L4.066 36.5l35.929 34.477z"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="73"><defs><filter id="a" x="0" y=".031" width="40" height="72.938" filterUnits="userSpaceOnUse"><feFlood result="flood" flood-color="#fff"/><feComposite result="composite" operator="in" in2="SourceGraphic"/><feBlend result="blend" in2="SourceGraphic"/></filter></defs><path d="M1.974 72.979L40 36.5 1.974.018 0 2.022 35.934 36.5 0 70.977z"/></svg></button>',
        responsive: [
            {
                breakpoint: 901,
                settings: {
                arrows: false                     
                }
            }                
            ]
    });       
    //Плавный скроллинг по разделам страницы
    $('.scroll').on('click', function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),            
        top = $(id).offset().top;                 
        $('body,html').animate({scrollTop: top}, 1500);
        $('.modal').fadeOut(200);
    });
    //Управленин отображением кнопки "btn-up"
    $(window).scroll(function(){
        var windowScroll = $(window).scrollTop();
            if (windowScroll>1000) {
                $('.btn-up').fadeIn();
            }
            else {
                $('.btn-up').fadeOut();
            }
    });
    //Управление отображением поля поиска в разделе "page page_main" 
    $('.btn-search').click(function(){
        var btnColor =  $('.btn-search svg').attr('fill');
        if (btnColor == '#fff') {
            $('.btn-search svg').attr('fill', '#c7b299');
        } 
        else {
            $('.btn-search svg').attr('fill', '#fff');
        }       
        $('.nav-search').fadeToggle(500);
        $('.nav-search__input').removeAttr('placeholder');            
    });
    //Поиск по странице
    $('.nav-search__input').focus(function(){
        $('.nav-search__input').removeAttr('placeholder');
    });
    $('.nav-search__btn').click(function(){
        var searchingText = $('#searchValue').val();
        if (searchingText != '') {           
            $('h1,h2,h3,p,a,li:not(:has(a, button))').each(function(){
                var elemText = $(this).text();
                var searchingRegExp = new RegExp(searchingText,'i');                          
                var  searching = elemText.match(searchingRegExp);                                
                if (searching != null) {                   
                   var markedWord = elemText.replace(searching, '<span class="word-marker">' + searching + '</span>');
                   $(this).html(markedWord);                                                   
                }                
            });            
        }
        var markedItems = $('.word-marker').length;
        if ( markedItems!= 0) {
            $('.nav-search').fadeOut(200);
            wordTop = $('.word-marker:first-child').offset().top - 100;
            $('body,html').animate({scrollTop: wordTop}, 1000);
            $('.nav-search').removeAttr('style').addClass('searching-result').fadeIn(500);
        }
        else {
            $('#searchValue').val('').attr('placeholder','No resalts');
        }
        if (searchingText == '') {
            $('.nav-search').fadeOut(200);
            $('.btn-search svg').attr('fill', '#fff');
        }        
    });
    $('.nav-search__btn-close').click(function(){
        $('#searchValue').val('');
        $('.nav-search').fadeOut(500, function(){
            $(this).removeClass('searching-result').removeAttr('style');
        });
        $('.word-marker').removeClass('word-marker');
        $('.btn-search svg').attr('fill', '#fff');
    });
     //Карусель в разделе "page page_posts"
    $('.block-posts').slick({
        arrows: true,
        loop: true,
        dots: false,                    
        initialSlide: 1,
        centerMode: true,
        slidesToShow: 3,
        centerPadding: 0,
        variableWidth: true,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><defs><filter id="a" x="0" y=".031" width="21.969" height="21.969" filterUnits="userSpaceOnUse"><feFlood result="flood" flood-color="#d1d1d1"/><feComposite result="composite" operator="in" in2="SourceGraphic"/><feBlend result="blend" in2="SourceGraphic"/></filter></defs><path d="M7.583 10.434l4.772-4.773A.736.736 0 1 1 13.4 6.7l-4.259 4.257 4.259 4.254a.736.736 0 1 1-1.04 1.041L7.583 11.48a.742.742 0 0 1 0-1.046zm3.4-10.409A10.985 10.985 0 1 1 0 11.011 10.985 10.985 0 0 1 10.987.026zm0 20.5a9.513 9.513 0 1 0-9.513-9.512 9.525 9.525 0 0 0 9.517 9.51z"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><defs><filter id="a" x=".031" y=".031" width="21.969" height="21.969" filterUnits="userSpaceOnUse"><feFlood result="flood" flood-color="#d1d1d1"/><feComposite result="composite" operator="in" in2="SourceGraphic"/><feBlend result="blend" in2="SourceGraphic"/></filter></defs><path d="M14.417 10.434L9.645 5.661A.736.736 0 0 0 8.6 6.7l4.255 4.255L8.6 15.211a.736.736 0 0 0 1.04 1.041l4.772-4.771a.742.742 0 0 0 .005-1.047zM11.017.025A10.985 10.985 0 1 0 22 11.011 10.985 10.985 0 0 0 11.013.026zm0 20.5a9.513 9.513 0 1 1 9.513-9.512 9.525 9.525 0 0 1-9.517 9.51z"/></svg></button>',
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                slidesToShow: 2,                    
                centerMode: false,
                variableWidth: false,                    
                }
            },
            { 
                breakpoint: 841,
                settings: {
                slidesToShow: 1,
                centerMode: false,
                variableWidth: false,
                }
            }               
        ]
    });
    //Управление открытием/закрытием модального меню
    $('.btn-menu').click(function(){
        $('.modal').slideDown();
    });      
    $('.btn-close').click(function(){
        $('.modal').slideUp();
    });      
});

