
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

     // streetview image
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr +',' + cityStr;

    $greeting.text ('So,you want to live at ' + address + '?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address +'';
    $body.append('<img class = "bgimg" src = " '+ streetviewUrl +' ">');

    // AJAX call for NYtimes
    $.getJSON(url , function(data){

    })




    return false;
};

$('#form-container').submit(loadData);

