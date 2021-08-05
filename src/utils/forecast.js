const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=71a36564afa77bb186080c644af7226f&query='+ latitude +','+ longitude +'&units=f'
    
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to the Weather Service')
        } else if (body.error){
            callback('Unable to find location.')
        } else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out')
        }
    })
}

module.exports = forecast