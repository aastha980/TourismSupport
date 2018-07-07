var l=[];
var a;
$(()=>{
    let list=$("#list");
    list.html("");
    $("#add").on('click',()=>{
        let value=$("#place").val();
        let ui=`<li>${value}</li>`;
        list.append(ui);
        l.push(value);
    });

    $("#findDistance").on('click',()=>{
        initMap('distance');
    });
    $("#findTime").on('click',()=>{
        initMap('time');
    });
    function initMap(param) {

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: l,
            destinations: l,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function(response, status) {
            if (status !== 'OK') {
                alert('Error was: ' + status);
            } else {
                var originList = response.originAddresses;
                var destinationList = response.destinationAddresses;
                console.log(response.rows);
                var ans=[];
                for(let i=0;i<l.length;i++){
                    var smallans=[];
                    var r=response.rows[i];
                    for(let j=0;j<l.length;j++){
                        if(param=='distance')
                            smallans.push(parseInt(r.elements[j].distance.text.replace(/\,/g,''), 10));
                        else if(param=='time')
                            smallans.push(parseInt(r.elements[j].duration.text.replace(/\,/g,''), 10));
                    }
                    ans.push(smallans);
                }
                console.log(ans);
                if(param=='distance') {
                    $.post('/customerDecided/distance', {ans: ans}, (data) => {
                        console.log(data);
                    })
                }
                else if(param=='time'){
                    $.post('/customerDecided/time', {ans: ans}, (data) => {
                        console.log(data);
                    })
                }
            }
        });
    }

});