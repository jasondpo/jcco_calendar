var calendar = (function(){

    let multiDates;
    let leaveCalBlock;
    let containerHeight;
    let bottomPos;
    let calendarItem;
    let calendarLink;

    $(".calendar-item").mouseenter(function(){
        enterDataIntoHover($(this));
        placeHoverBlock($(this));
        getMultiDates($(this));
        clearTimeout(leaveCalBlock);
        setTimeout(()=>{
            $(".calendar-hover-block").removeClass("calendar-hover-block-fadeOut").addClass("calendar-hover-block-fadeIn");
        },150);
    });

    function enterDataIntoHover(calItem){
        $(".calendar-hover-header p").text($(calItem).attr("data-name"));
        $(".calendar-hover-time").text($(calItem).attr("data-time"));
        $(".calendar-hover-location").text($(calItem).attr("data-location"));
    }

    function placeHoverBlock(calItem){ 
        containerHeight = $(".calendar-container").outerHeight();
        calendarItem = $(calItem).position().top;
        bottomPos = (containerHeight - calendarItem) + 8;
        $(".calendar-hover-block").css({"left":110, "bottom": bottomPos})
    }


    $(".calendar-item").mouseleave(function(e){
        leaveCalBlock = setTimeout(()=>{
            $(".calendar-hover-block").removeClass("calendar-hover-block-fadeIn").addClass("calendar-hover-block-fadeOut");
            setTimeout(()=>{$(".calendar-hover-block").css({"left":"-1000%", "top": "auto"})},250);
        },250);
    });

    $(window).on("mouseover", function(){
        (".calendar-hover-block").css({"left":"-1000%", "top": "auto"})
    })

    $(".calendar-list").on("mouseover", function(e){
        e.stopPropagation();
    })

//////////////////////////////////////////////////////////////////////////////////////////////////

    // Generate Date(s)category inside calendar-hover-box ONLY if there are multiple days
    function getMultiDates(calItem){
        multiDatesLength = $(calItem).attr("data-multiDates").length;
        if(multiDatesLength != 0){
            multiDates = $(calItem).attr("data-multiDates");
            $(".date-hover-time").html("Days: "+multiDates);
            $(".date-hover-time").closest("h4").show(); 
        }else{
            $(".date-hover-time").html("");
            $(".date-hover-time").closest("h4").hide(); 
        }
    }

    let fullDay = 864 * 100000; // Millissconds
    let d = new Date();
    let currentTime = Math.round(d.getTime());
    let eventTime;

    $(".calendar-item").each(function() {
        eventTime = $(this).attr("data-endDate");
        eventTime = new Date(eventTime).getTime() + fullDay;

        if(eventTime < currentTime){
            $(this).hide();
        }
    });
   

//////////// Extend Calendar link to parent DIV //////////////

    $(".calendar-item").on("click", function() { 
        calendarLink = $(this).find("a").attr("href");
        window.location.href = calendarLink;
    })

})();