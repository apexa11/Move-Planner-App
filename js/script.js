
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

    $greeting.text ('So, You Want to live at ' + address + '!!');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address +'';
    $body.append('<img class = "bgimg" src = " '+ streetviewUrl +' ">');

    // AJAX request for NYtimes

    var nytimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityStr+'&sort=newest&api-key=e620b09505834c0dbb674725514fc906'
    $.getJSON(nytimesUrl , function(data){
        $nytHeaderElem.text('New York Times Article ABout' + cityStr);

        articles = data.response.docs;
        for (var i = 0;i < articles.length;i++){
            var article = articles[i];
            $nytElem.append('<li class = "article">' +
                    '<a href =" '+ article.web_url+' ">'+article.headline.main+
                        '</a>'
                    +'<p>'+article.snippet + '</p>'+
                 '</li>');

        };
    // error handling
    }).error(function(e){
        $nytHeaderElem.text('New York Times Article could not be loadded');
    });

    // AJAX request for Wikipedia

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';


    $.ajax({
        url:wikiUrl,
        dataType :"jsonp",
        success : function(response){
            var articleList = response[1];

            for  (var i =0 ; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = "http://en.wikipedia.org/wiki/" + articleStr;
                $wikiElem.append('<li> <a href = "'+ url + ' ">' + articleStr + '</a></li>');
            };
        }
        #error handling
    }).error(function(e){
        $wikiElem.text(' failed to get wikipedia resources');
    } );
    return false;
};

$('#form-container').submit(loadData);

