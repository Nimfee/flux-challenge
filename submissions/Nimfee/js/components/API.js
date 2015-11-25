/**
 * Created by aleks on 23.11.15.
 */
var request = require('superagent');
var requests = [];

var Api = {
    get: function (url, cur_type, Store) {
        return new Promise(function (resolve, reject) {
            var req = request
                .get(url)
                .end(function (err, res) {
                    if (res.ok) {
                        resolve(res.body);
                        requests.forEach(function(request, i) {
                            if (request.url == url) {
                                requests.splice(i);
                                return 1;
                            }
                        });

                    } else {
                        reject();
                    }
                });

            var abort = false;

            requests.forEach(function(request) {
                if (request.type != '' && cur_type != '') {
                    abort = true;
                    return;
                }
            });
            var exists = false;
            requests.forEach(function(request, i) {
                if (request.url == url) {
                    exists = true;
                    return 1;
                }
            });


            if (abort || Store.getRed() == true) {
                requests.forEach(function(request, i) {
                    if (request.url != url) {
                        request.request.abort();
                        requests.splice(i);
                    }
                });
            }
            if (!exists) {
                requests.push({type:cur_type, request:req, url:url});
            } else {
                req.abort();
            }
        });
    }
};

module.exports = Api;