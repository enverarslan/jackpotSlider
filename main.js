$(document).on('click', 'button.startRoll', function (e) {
    e.preventDefault();

    startRoll();

    return false;
});

function startRoll(){

    timer('timer', 0, 10, goToWinner);


    function goToWinner(){
        /* Reset Position */
        $('.jackpot-slider ul').slick('slickGoTo', 0, false);

        /* Lock Slider and Set Winner */
        setTimeout(function(){

            /* Set Roll Speed */
            var options = {
                speed: 10000,
                arrows: false,
                swipe: false,
                centerMode: true,
                easing: 'easeOutSine'
            };
            $('.jackpot-slider ul').slick('slickSetOption', options, true);

            var winner = 32;

            /* Set Winner 32nd item. Set 31 for zero based counting. */
            $('.jackpot-slider ul').slick('slickGoTo', winner - 1, false);


            $('.jackpot-slider ul').on('afterChange', function(event, slick, currentSlide, nextSlide){

                if(currentSlide == winner -1){
                    setTimeout(function () {
                        $('.jackpot-slider').slideUp(500, function(){
                            $('#winner-box').slideDown();
                        });

                    }, 2000)
                }
            });




        }, 500);
    }



}

function timer(element, minutes, seconds, callback) {

    var time = minutes*60 + seconds;

    var interval = setInterval(function() {
        var el = document.getElementById(element);
        // if the time is 0 then end the counter
        if (time <= 0) {
            el.innerHTML = '00:00';

            if (typeof callback == "function"){
                callback();
            }
            clearInterval(interval);
            return;
        }
        var minutes = Math.floor( time / 60 );
        if (minutes < 10) minutes = "0" + minutes;
        var seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds;
        var text = minutes + ':' + seconds;
        el.innerHTML = text;
        time--;
    }, 1000);
}


$(function(){

    $('.jackpot-slider ul').slick({
        dots: false,
        infinite: false,
        variableWidth: true
    });



});