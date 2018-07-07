var l=[];
var ans={
    arr:[]
};
$(()=> {
    let list = $("#list");
    list.html("");
    $("#add").on('click', () => {
        let value = $("#place").val();
        let priority = $("#priority").val();
        let ui = `<li>${value} with priority ${priority}</li>`;
        list.append(ui);
        l.push({value:value,priority:priority});
    });

    $("#findBest").on('click', () => {
        for(let i=0;i<l.length;i++)
            initMap(l[i].value,l[i].priority);
        console.log(ans);
        haan(ans);
    });

    function haan(ans) {
        $.post('/adminDecided/data',{ans:ans.arr},(data)=>{
            console.log(data);
        })
    }

});
function initMap(value,priority) {

    var geocoder = new google.maps.Geocoder();
    var myLatLng;
    geocoder.geocode( { 'address': value}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
        }

        myLatLng = {lat: latitude, lng: longitude};


    });
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 15
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var d=new Date();
            var n=4;
            var deadline;
            var prior = parseInt(priority)+parseInt(place.rating);
            if(n>place.opening_hours.periods.length){
                deadline=0;
                console.log(deadline);
            }
            else{

                deadline=parseInt(place.opening_hours.periods[n].close.time)-parseInt(place.opening_hours.periods[n].open.time);
                console.log(deadline/100);
            }
            ans.arr.push({
                id:value,
                deadline:deadline/100,
                profit:prior
            })
        }
    });

}