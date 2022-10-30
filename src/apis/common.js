const processAddress = (url, params) => {

    const coordinateJointer = '%2C'
    const addressJointer = '%3B'

    const {
        longtitude1,
        latitude1,
        longtitude2,
        latitude2,
        longtitude3 = '',
        latitude3 = '',
        longtitude4 = '',
        latitude4 = ''
    } = params

    const address1 = [longtitude1, latitude1].join(coordinateJointer)
    const address2 = [longtitude2, latitude2].join(coordinateJointer)
    const address3 = [longtitude3, latitude3].join(coordinateJointer)
    const address4 = [longtitude4, latitude4].join(coordinateJointer)

    const addressWhole = [address1, address2, address3, address4].filter(item => item !== '%2C').join(addressJointer)

    return url + addressWhole
}

/**
 * @description 社区相关
 * @param {*} http
 * @returns
 */
export default function (http) {
    return {
        // app启动页
        getDistance: params => http.get(processAddress('https://api.mapbox.com/directions/v5/mapbox/driving/', params), {
            params: {
                alternatives: false,
                exclude: 'ferry,unpaved',
                geometries: 'geojson',
                language: 'en',
                overview: 'simplified',
                annotations: 'distance',
                steps: true,
                access_token: `${params.accessToken}`
            }
        }),

        // 获取地址
        getCoordinates: params => http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${params.address}.json`, {
            params: {
                country: 'au',
                limit: 1,
                language: 'en',
                autocomplete: true,
                access_token: `${params.accessToken}`
            }
        })
    }
}

