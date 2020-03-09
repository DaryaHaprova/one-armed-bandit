import {callApi} from "../helpers/apiHelper";


export function getImages() {
    // http://www.mocky.io/v2/5e6669803100002293239f9d
        try {
            const endpoint = 'v2/5e6669803100002293239f9d';
            const apiResult = callApi(endpoint, 'GET');
            console.log(apiResult)
            return apiResult
            // return JSON.parse(apiResult);
        } catch (error) {
            throw error;
        }
}

