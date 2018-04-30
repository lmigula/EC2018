var when = require('when');
var nodeCouchDB = require("node-couchdb");
var couchConfig = require("./couchConfig.js");

var couch = new nodeCouchDB({
    host: couchConfig.host,
    protocol: 'http',
    port: couchConfig.port
});

console.log('couch', couch)

var dbName = "ec-invoice";

var mergeDataPoints = function (savedData, newData) {
    var dataPoint = savedData;

    for (var property in newData) {
        if (newData[property] instanceof Object) {
            newData[property] = mergeDataPoints(savedData[property], newData[property]);
        }

        dataPoint[property] = newData[property];
    }

    return dataPoint;
};



module.exports = {

    getAllDocs: function () {
        var deferred = when.defer();

        var viewUrl = "_design/list/_view/allDocs";
        var queryOptions = {
            "_id": { "$gt": null }
        };
        couch.get(dbName, viewUrl, queryOptions)
            .then(function (data, headers, status) {

                if (data.data.rows.length) {
                    var view = data.data.rows
                    console.log('entry: ' + JSON.stringify(data.data.rows[0]));
                    var len = view.length;
                    for (var idx = 0; idx < len; idx++) {
                        var id = view[idx].id;
                        if (id !== '_design/list') {
                            console.log('ent ' + view[idx].id + ' rev ' + JSON.stringify(view[idx].value.rev));
                        }

                    }

                    //'_design/list'
                    deferred.resolve(data.data.rows);



                } else {
                    deferred.reject('noData');
                }
                //deferred.resolve(data);

            }, function (err) {
                console.log('err ' + err);
                deferred.reject(err);
            });


        return deferred.promise;
    },
    insert: function (dataPoint) {
        var deferred = when.defer();
        couch.insert(dbName, dataPoint)
            .then(function (data, headers, status) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    },
    update: function (dataPoint) {
        var deferred = when.defer();
        couch.update(dbName, dataPoint)
            .then(function (data, headers, status) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    },
    save: function (dataPoint) {
        var deferred = when.defer();


        var viewUrl = "_all_docs";
        var queryOptions = {
            key: dataPoint._id
        };
        couch.get(dbName, viewUrl, queryOptions)
            .then(function (data, headers, status) {


                if (0 === data.data.rows.length) {


                    couch.insert(dbName, dataPoint)
                        .then(function (data, headers, status) {
                            deferred.resolve();
                        }, function (err) {
                            deferred.rejecterr();
                        });

                } else {
                    deferred.resolve({ 'txt': 'aready exists' });
                }
                //deferred.resolve(data);

            }, function (err) {
                console.log('err ' + err);
                deferred.reject(err);
            });


        return deferred.promise;
    },
    getDataByDate: function () {

        var viewUrl = "_design/list/_view/byDate";

        var deferred = when.defer();
        const queryOptions = {

        };

        couch.get(dbName, viewUrl, queryOptions)
            .then(function (data, headers, status) {
                deferred.resolve(data);

            }, function (err) {
                console.log('err ' + err);
                deferred.reject(err);
            });

        return deferred.promise;
    },
    checkDatabaseExists: function (taskDB) {
        var deferred = when.defer();
        couch.listDatabases().then(dbs => {
            deferred.resolve(dbs.indexOf(taskDB) >= 0);
        }, err => {
            console.error('err: ' + JSON.stringify(err));
            deferred.reject(console.error(err));
        });

        return deferred.promise;
    },
    createDatabase: function (dbName) {
        var deferred = when.defer();
        couch.createDatabase(dbName).then(() => {
            deferred.resolve({ 'created': true });
        }, err => {
            // request error occured
            console.error('err: ' + JSON.stringify(err));
            deferred.reject(console.error(err));
        });
        return deferred.promise;
    },
    getInvoice(id) {
        var deferred = when.defer();
        couch.get(dbName, id)
            .then(({ data, headers, status }) => {
                // data is json response
                // headers is an object with all response headers
                // status is statusCode number
                deferred.resolve(data);
            }, err => {
                // either request error occured
                // ...or err.code=EDOCMISSING if document is missing
                // ...or err.code=EUNKNOWN if statusCode is unexpected
                console.log('err ' + err);
                deferred.reject(err);
            });
        return deferred.promise;
    }

    //byPersonAndDate
}