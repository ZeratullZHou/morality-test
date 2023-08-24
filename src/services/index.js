import request from 'umi-request';
import url from '../config/url';

async function newRequest(api, params, method = 'get') {
    return request[method](url + api, { ...params })
        .then(function (response) {
            if (response.code === 200) {
                return {
                    isSuccess: true,
                    data: response.data,
                    msg: response.message,
                };
            } else {
                return {
                    isSuccess: false,
                    data: [],
                    msg: response.message,
                };
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default newRequest;
