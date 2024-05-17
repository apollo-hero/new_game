const request = require('request');
const Promise = require("bluebird");
const axios = require('axios');

class PayPalService {

  static validate(body = {}) {
			return "test";
			const payload = new URLSearchParams();
			Object.keys(body).forEach((key) => {
							payload.append(key, body[key]);
			});
			
			const url = "https://ipnpb.paypal.com/cgi-bin/webscr";


			
			const options = {
							method: 'post',
							url: 'https://ipnpb.paypal.com/cgi-bin/webscr',
							headers: {
											'Content-Type': 'application/x-www-form-urlencoded',
											'Content-Length': Buffer.byteLength(payload),
							},
							data: payload.toString(),
			};
			
			return axios(options)
			.then((response) => {
							if (response.data.substring(0, 8) === 'VERIFIED') {
											return true;
							} else if (response.data.substring(0, 7) === 'INVALID') {
											return false;
							} else {
											return false;
							}
			})
			.catch((error) => {
							return JSON.stringify(error);
			});
  }

}

module.exports = {
  PayPalService
}