/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let formData = null;
    let result = '';

    xhr.responseType = 'json';

    if (options.method === 'GET') {
        if (options.data) {
            result = '?';

            for (let i in options.data) {
                result += `${i}=${options.data[i]}&`; 
            }   
        }
    } 
    
    else {
        formData = new FormData();
        for (let i in options.data) {
        formData.append( i, options.data[i] ); 
        }
    }

    try {
        xhr.open(`${options.method}`, `${options.url}${result}`);
        
        xhr.send(formData);
    }
    
    catch (err) {
        options.callback(err);
    }

    
    xhr.onload = function() {
        options.callback(null, xhr.response);
    }
};
