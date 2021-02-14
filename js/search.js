 // Google Map API取得
// var MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516);
//     var Options = {
//      zoom: 15,      //地図の縮尺値
//      center: MyLatLng,    //地図の中心座標
//      mapTypeId: 'roadmap'   //地図の種類
//     };
//     var map = new google.maps.Map(document.getElementById('map'), Options);



// 地図を表示する
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
  });
}

// 現在地を取得して地図に表示する
let a = navigator.geolocation.getCurrentPosition(test2);
function test2(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  var myPosi = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
      position: myPosi,
      map: map,
      icon: {
        url: 'Octocat.png',
        scaledSize: new google.maps.Size(40, 40)
      }
  });

// 現在地の近くにあるwifiのあるカフェを探す
  $.ajax({  
    type : "get",
    url　: "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=7a5527507df2f79d5ce305da65cb6771&wifi=1&latitude="+lat+"&longitude="+lng+"&range=4&category_l=RSFST20000,RSFST18000",
    dataType : 'json',
    success　: function(json){
      let num_shop = json.rest.length;
      for( let i=0; i < num_shop; i++){
        console.log(json.rest[i].url);
        var latLng = new google.maps.LatLng(json.rest[i].latitude, json.rest[i].longitude);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            label: {
              text: String(i+1),
              color: "#fff",
              fontWeight: 'bold',
              fontSize: '14px'
            },
            url: json.rest[i].url,
        });
        google.maps.event.addListener(marker, 'click', (function(url){
          return function(){ location.href = url; };
        })(json.rest[i].url));
        $('<li class="each-shop"><i class="fas fa-map-marker fa-3x"></i><span class="icon">'+ String(i+1) + '</span><a href="' + json.rest[i].url + '"><img class="shop-img" src=' + json.rest[i].image_url.shop_image1 + '><span class="shop-content"><span class="shop-name">' + String(i+1) + " " + json.rest[i].name + '</span><span class="time">営業時間：' + json.rest[i].opentime + '</span></span></a></li>').appendTo('#shop-list');
      }
    },
    error: function(json){
      console.log("error")
    }
  });
//
  // 地図をカスタマイズする
  var styleOptions = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#FFBB00"
            },
            {
                "saturation": 43.400000000000006
            },
            {
                "lightness": 37.599999999999994
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "hue": "#FFC200"
            },
            {
                "saturation": -61.8
            },
            {
                "lightness": 45.599999999999994
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "hue": "#FF0300"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 51.19999999999999
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "hue": "#FF0300"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 52
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#0078FF"
            },
            {
                "saturation": -13.200000000000003
            },
            {
                "lightness": 2.4000000000000057
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "hue": "#00FF6A"
            },
            {
                "saturation": -1.0989010989011234
            },
            {
                "lightness": 11.200000000000017
            },
            {
                "gamma": 1
            }
        ]
    }
];
  var sampleType = new google.maps.StyledMapType(styleOptions);
  map.mapTypes.set('map', sampleType);
  map.setMapTypeId('map');
  map.setCenter(myPosi);
};
