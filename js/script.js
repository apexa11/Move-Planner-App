
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

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address +'';
    $body.append('<img class = "bgimg" src = " '+ streetviewUrl +' ">');

    // AJAX request for NYtimes

    var nytimesUrl = "http://api.nytimes.com/svc/search/v2/aticlesearch.json?q="+cityStr+'&sort=newest&api-key=e620b09505834c0dbb674725514fc906'
    $.getJSON(nytimesUrl , function(data){
        $nytHeaderElem.text('New York Times Article ABout' + cityStr);

        articles = data.response.docs;
        for (var i = 0;i < articles.length;i++){
            var article = article[i];
            $nytElem.append('<li class = "article">' +
                    '<a href =" '+ article.web_url+' ">'+article.headline.main+
                        '</a>'
                    +'<p>'+article.snippet + '</p>'+
                 '</li>');

        };

    })
return false;
};

$('#form-container').submit(loadData);

