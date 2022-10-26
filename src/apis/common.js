/**
 * @description 社区相关
 * @param {*} http
 * @returns
 */
export default function (http) {
    return {
        // app启动页
        getDistance: params => http.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${params.longtitude1}%2C${params.latitude1}%3B${params.longtitude2}%2C${params.latitude2}?alternatives=false&exclude=ferry%2Cunpaved&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1Ijoid2Vja3NvbiIsImEiOiJjbDlpa3Y3OHMwOGdlM3Bwa3VzbXVudW5rIn0.2LA9W6XHbOFXFZgY0nGI_w`, params),

        // 获取地址
        getCoordinates: params => http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${params.address}.json?country=au&limit=1&language=en&autocomplete=true&access_token=pk.eyJ1Ijoid2Vja3NvbiIsImEiOiJjbDlpa3Y3OHMwOGdlM3Bwa3VzbXVudW5rIn0.2LA9W6XHbOFXFZgY0nGI_w`)
    }
}

