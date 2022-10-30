// 用户信息的key
export const ACCESS_TOKEN_KEY = 'access_token'

// 当前app独有的key
export const STORAGE_KEY = 'transport-charge-caculator';

// 尾板费
export const tailboardFeeConfig = [
    {
        name: 'Yes(100 AUD)',
        value: 100
    },

    {
        name: 'No(0)',
        value: 0
    }
]

// 仓库预订费
export const bookingFeeConfig = [
    {
        name: 'Yes(22 AUD)',
        value: 22
    },

    {
        name: 'No(0)',
        value: 0
    }
]


// 仓库地址
export const warehouses = [
    {
        name: 'warehouse1',
        longtitude: 153.150146,
        latitude: -27.431228
    },
    {
        name: 'warehouse2',
        longtitude: 153.037142,
        latitude: -29.484764
    }
    // {
    //     name: 'warehouse3',
    //     longtitude: 153.037142,
    //     latitude: -29.484764
    // }
]

// 起始地址
export const startingPoints = [
    {
        name: '49 Reginald Street, Rocklea QLD 4106',
        longtitude: 152.99618,
        latitude: -27.562829
    }
]