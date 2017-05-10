document.addEventListener("DOMContentLoaded", function () {

    var url = "https://api.nasa.gov/planetary/apod";
    var key = '&api_key=s7RAdgJ0dLEAiWBs9pCUNLPOSQzMeBdRunqrKI2c';
    var hd  = '&hd=bool';
    var particlesBackground = document.querySelector('#particles-js');
    var infoBox     = document.querySelector('#info');
    var infoBtn     = document.querySelectorAll('#button button')[0];
    var nextBtn     = document.querySelectorAll('#button button')[1];
    var title       =  document.querySelector('li[data_title] h3');
    var explanation =  document.querySelector('li[data_explanation]');

    function newBackgroundFromNASA (){
        /* ---- random number ---- */
        function getRandomInt( min, max ){
            return Math.floor( Math.random() * ( max - min + 1 ) + min );
        }

        /* ---- random date ---- */
        var year  = getRandomInt(2010,2016);
        var month = getRandomInt(1,12);
        var day   = getRandomInt(1,28);
        var  newDate = year + '-' + month + '-' + day;

        /* ---- NASA API ---- */
        $.ajax({
            url: url + '?date=' + newDate + key,
        }).done(function (response) {
            console.log(response);
            particlesBackground.style.backgroundImage = 'url(' + response.hdurl + ')';
            title.innerText = 'Title: ' + response.title + ', ' + response.date + '.';
            explanation.innerText = 'Explanation: ' + response.explanation;

        }).fail(function (error) {
            console.log(error);
        });
    }

    newBackgroundFromNASA();

    /* ---- Next random img ---- */
    nextBtn.addEventListener('click', function(){
        newBackgroundFromNASA();
    });

    /* ---- Info img ---- */
    infoBtn.addEventListener('click', function(){

        if (infoBox.classList.contains('hide') == true){
            infoBox.classList.remove('hide');
            infoBox.classList.add('show');
            infoBtn.innerText = 'Close info';

        }else{
            infoBox.classList.remove('show');
            infoBox.classList.add('hide');
            infoBtn.innerText = 'Info img';
        }
    });

    //prevent native touch activity like scrolling
    var body = document.querySelector('html, body');

    body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
});