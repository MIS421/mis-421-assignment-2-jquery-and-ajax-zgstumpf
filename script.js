var len;
var results = '';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "a0693cd0b29747bda1313244ef7c7f51");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      document.getElementById("searchResults").style.visibility = "visible"

      $('#searchResults').html(results);
      $('#searchResults').dialog({width: 1000, height:700});

      // If the draggables for search results and time are present at the same time, the html for their titles is similar,
      // so this is necessary to differentiate between them.
      document.querySelector('[aria-describedby="searchResults"]')
              .getElementsByClassName("ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle")[0]
              .getElementsByClassName("ui-dialog-title")[0]
              .innerHTML = "Search Results"
    })
    .fail(function () {
      alert("error");
    });
} 

var image1 = "url('https://images.unsplash.com/photo-1675068766426-eb0f1a065314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')"
var image2 = "url('https://images.unsplash.com/photo-1674856320941-7e442d7c4799?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')"

function changeBackgroundImage() {
    [image1, image2] = [image2, image1] // Cycle between the images
    document.getElementsByTagName("body")[0].style.background = image1
}


function getTime() {
    var date = new Date()
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm;

    if (hours >= 12) {
        ampm = 'PM'
    }
    else {
        ampm = 'AM'
    }

    hours = hours % 12;

    if (hours == 0) {
        hours = 12
    }
    else if (hours > 12){
        hours = hours - 12
        }

    if (minutes < 10) {
        minutes = '0' + minutes
    }
    
    var time = hours + ':' + minutes + ' ' + ampm

    $("#time").dialog()
    document.getElementById("time").style.visibility = "visible"

    // If the draggables for search results and time are present at the same time, the html for their titles is similar,
    // so this is necessary to differentiate between them.
    document.querySelector('[aria-describedby="time"]')
            .getElementsByClassName("ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle")[0]
            .getElementsByClassName("ui-dialog-title")[0]
            .innerHTML = "Current Time"

    document.getElementById("time").innerHTML = `<p id="timeText">${time}</p>`


}


function searchLucky() {
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "a0693cd0b29747bda1313244ef7c7f51");
        },
        type: "GET",
    })
        .done(function (data) {
            location.href = data.webPages.value[0].url
            
        })
        .fail(function () {
            alert("error");
        });
}