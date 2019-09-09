const axios = require('axios');

//console.log(argv.direccion);

const getLugarLatLng = async(dir) => {

    const encodeUrl = encodeURI(dir);

    const instance = axios.create({
        // baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=New York',

        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeUrl}`,
        //baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php',
        headers: {
            'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
            'x-rapidapi-key': '2edbd0a2d0mshdd37b12807a3fcdp197401jsnf8dc3c3c92ea'
        }


    });
    //console.log(instance);
    //instance.get('https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php', {
    //        params: {
    //           location: encodeUrl
    //       }
    //   })
    /*instance.get()
        .then(resp => {
            console.log(resp.data.Results[0]);
        })
        .catch(err => {
            console.log('Error', err);
        });
        */
    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para direccion ${dir}`)
    }

    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;
    return {
        direccion,
        lat,
        lng
    }

}

module.exports = {
    getLugarLatLng
}