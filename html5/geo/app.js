document.getElementById('get-location').addEventListener('click', function() {
    const status = document.getElementById('status');
    const map = document.getElementById('map');

    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

        const mapUrl = `https://maps.app.goo.gl/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;
        map.innerHTML = `<iframe width="100%" height="100%" src="${mapUrl}" frameborder="0"></iframe>`;
    }

    function error() {
        status.textContent = 'Não foi possível obter sua localização.';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocalização não é suportada pelo seu navegador.';
    } else {
        status.textContent = 'Localizando…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
