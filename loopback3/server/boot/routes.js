var pdfTool = require('../pdfTool');

module.exports = function (app) {
    var router = app.loopback.Router();
    let Invoice = app.models.Invoice;


    router.get('/api/invoicepdf/:id', function (req, res) {
        var id = req.params.id;
        Invoice.find({ where: { id: id }, limit: 3 },
            function (err, invoice) {
                console.log(invoice)
                if (invoice) {
                    pdfTool.createPdf(invoice[0])
                        .then(pdf => {
                            res.setHeader('Content-Type', 'application/pdf');
                            res.setHeader('Content-Disposition', 'attachment; filename=quote-' + id + '.pdf');
                            res.send(pdf);
                        })
                }
                // res.send(invoice);
            });

    });
    app.use(router);
}