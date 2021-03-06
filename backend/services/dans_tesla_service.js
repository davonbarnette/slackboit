const axios = require("axios")
const SETTINGS = require('../settings')
class DansTeslaService {
  static async getMyCarsLocation(){
    let api_call_response = await axios.get(`${SETTINGS.TESLA_MICROSERVICE_URL}location`, {
      headers: {'x-api-key': SETTINGS.TESLA_MICROSERVICE_API_KEY}
    })
    if(api_call_response) return api_call_response.data
    return null
  }

  static async getMyCarsTemperature(){
    let api_call_response = await axios.get(`${SETTINGS.TESLA_MICROSERVICE_URL}temp`, {
      headers: {'x-api-key': SETTINGS.TESLA_MICROSERVICE_API_KEY}
    })
    if(api_call_response) return api_call_response.data
    return null
  }

  static async startMyCarsClimate(){
    let api_call_response = await axios.post(`${SETTINGS.TESLA_MICROSERVICE_URL}start_climate`, {}, {
      headers: {'x-api-key': SETTINGS.TESLA_MICROSERVICE_API_KEY}
    })
    if(api_call_response) return api_call_response.data
    return null
  }

  static async stopMyCarsClimate(){
    let api_call_response = await axios.post(`${SETTINGS.TESLA_MICROSERVICE_URL}stop_climate`, {}, {
      headers: {'x-api-key': SETTINGS.TESLA_MICROSERVICE_API_KEY}
    })
    if(api_call_response) return api_call_response.data
    return null
  }

  static async getMyCarsBatteryLevel(){
    let api_call_response = await axios.get(`${SETTINGS.TESLA_MICROSERVICE_URL}battery_level`, {
      headers: {'x-api-key': SETTINGS.TESLA_MICROSERVICE_API_KEY}
    })
    if(api_call_response) return api_call_response.data
    return null
  }

  static async isMyCarCharging(){
    let api_call_response = await axios.get(`${SETTINGS.TESLA_MICROSERVICE_URL}is_charging`, {
      headers: {'x-api-key': SETTINGS.TESLA_MICROSERVICE_API_KEY}
    })
    if(api_call_response) return api_call_response.data
    return null
  }
}

module.exports = DansTeslaService;
