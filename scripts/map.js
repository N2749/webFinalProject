function initMap() {
    const mainOffice = {
        name: "Our Main Office",
        lat: 43.24049491099068,
        lng: 76.90534372909418,
    };
    const map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 15,
        center: mainOffice,
    });
    const marker = new google.maps.Marker({
        position: mainOffice,
        map: map,
        title: mainOffice.name,
        icon: "images/iconMarker.png",
    });
    const window = new google.maps.InfoWindow({
        content: `<strong>Our Main Office</strong>
        <p>
            <small>
                43.240° Latitude <br>
                76.905° Longitude
            </small>
        </p>`,
    });
    marker.addListener("click", () => {
        window.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });
}
