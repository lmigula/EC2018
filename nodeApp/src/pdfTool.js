var when = require('when');
var moment = require('moment');
var tableHeader = [

    {
        text: 'Beschreibung',
        width: 230,
        align: 'left'

    },
    {   // No cellwidth defined for this column, there will be auto calculated later
        text: 'Menge',
        width: 65,
        align: 'center'

    },
    {
        text: 'Einzelpreis',
        width: 70,
        align: 'right'
    },
    {   // No cellwidth, there will be defined in the data section
        text: 'Summe',
        width: 75,
        align: 'right'
    }
];


createPdf = function (data) {
    var deferred = when.defer();
    var lxDocument = require('lx-pdf')('src/template.json');

    let rawData = [];
    data.positon.forEach(element => {
        let tableEntry = [];
        tableEntry.push(element.description);
        tableEntry.push(element.singlePrice);
        tableEntry.push(element.amount);
        tableEntry.push(element.amount * element.singlePrice);
        rawData.push(tableEntry);

    });
    lxDocument.addTable('content', rawData, tableHeader);

    if (data.customer) {
        lxDocument.addContent('personData', moment(data.date).format('DD.MM.YYYY '));
        lxDocument.addContent('personData', data.customer);
    }

    lxDocument.print(result => {
        // If result NULL then success otherwise it hold error informationen
        console.log('created PDF');
        deferred.resolve(result);
    });

    return deferred.promise;
}


module.exports = {
    createPdf: createPdf,
}
