$(".catalog__filter_item").on("click", "a", function(){
        $(".catalog__filter_item a").removeClass("active"); //удаляем класс во всех вкладках
        $(this).addClass("active"); //добавляем класс текущей (нажатой)
    });
    