/*global describe, it, expect, waits*/
'use strict';

var sut = require('../lib/lx-pdf.js')('test/templates/template.json');

var bigTextNumberOne = 'Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus commodo vel.';
var bigTextNumberTwo = '\nVivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi aliquam nisi dui elita.';
var bigTextNumberThree = '\n\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.\n';
var bigTextNumberFour = '\n\nThis section demonstrates how to sign code by creating digital signatures and associating them with files using Microsoft Authenticode technology. Creating a fully verifiable certificate might assume the existence of a complex hierarchy of certification authorities. A root certificate and a root private key are provided for testing purposes only. Independent software vendors (ISVs) must obtain a certificate from a certification authority that is trusted by default in Windows. (For a list of trusted certification authority (CA) see Microsoft Root Certificate Program Members.)';

var fontNormal = './test/fonts/arial.ttf';
var fontBold = './test/fonts/arialbd.ttf';
var simpleTemplate = {
    name: 'Dummy Template for Test',
    options: {
        pages: [
            {
                layout: {
                    size: 'A4',
                    layout: 'portrait',
                    margins: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    }
                },
                sections: {
                    header: {
                        font: {
                            name: './test/fonts/arial.ttf',
                            size: 12,
                            color: '#000000'
                        },
                        format: {
                            align: 'left',
                            left: 70,
                            top: 50,
                            width: 481,
                            height: 300
                        }
                    },
                    content: {
                        font: {
                            name: './test/fonts/arial.ttf',
                            size: 12,
                            color: '#000000'
                        },
                        format: {
                            align: 'left',
                            left: 70,
                            top: 350,
                            width: 481,
                            height: 320
                        }
                    }
                }
            },
            {
                layout: {
                    size: 'A4',
                    layout: 'portrait',
                    margins: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    }
                },
                sections: {
                    content: {
                        font: {
                            name: './test/fonts/arial.ttf',
                            size: 12,
                            color: '#000000'
                        },
                        format: {
                            align: 'left',
                            left: 70,
                            top: 50,
                            width: 481,
                            height: 620
                        }
                    }
                }
            }
        ]
    }
};

describe('lx-pdf', function () {
    it('should be initialized correctly', function () {
        expect(sut).toBeDefined();
        expect(typeof sut.loadTemplate).toBe('function');
        expect(typeof sut.addContent).toBe('function');
        expect(typeof sut.addTable).toBe('function');
        expect(typeof sut.addImage).toBe('function');
        expect(typeof sut.addPageBreak).toBe('function');
        expect(typeof sut.save).toBe('function');
        expect(typeof sut.print).toBe('function');
        expect(typeof sut.clear).toBe('function');
        expect(typeof sut.resetDocumentIndices).toBe('function');
        expect(typeof sut.showTextboxframe).toBe('function');
    });

    it('should be loads a wrong template', function () {
        expect(sut.loadTemplate('nonexistfile.json')).toBeFalsy();
        expect(sut.loadTemplate('')).toBeFalsy();
    });

    it('add some content and save to file', function () {
        expect(sut.addContent('list', ['Entry A', 'Entry B', '', 'Entry D'])).toBeTruthy();
        expect(sut.addContent('linebreak', 'This text is too width. And should be automatic break.')).toBeTruthy();

        expect(sut.addContent('date', '31.12.2013')).toBeTruthy();
        expect(sut.addContent('subject', 'Small Test')).toBeTruthy();
        expect(sut.addContent('content', 'Content for Page')).toBeTruthy();

        expect(sut.addContent('area51', bigTextNumberOne)).toBeTruthy();
        expect(sut.addContent('area51', bigTextNumberTwo)).toBeTruthy();
        expect(sut.addContent('area51', bigTextNumberThree)).toBeTruthy();

        // Table
        var tableHeader = [
            {text: 'Column 1', width: 120, align: 'left', font: {name: fontBold, size: 12, color: '#000000'}},
            {text: 'Column 2', align: 'left', font: {name: fontBold, size: 12, color: '#000000'}},
            {text: 'Column 3', width: 100, align: 'center', font: {name: fontBold, size: 12, color: '#000000'}},
            {text: 'Column 4', width: 80, align: 'right', font: {name: fontBold, size: 12, color: '#000000'}}
        ];

        var tableData = [
            // Simple Row
            ['Cell A1', 'Cell B1', 'Cell C1', 'Cell D1'],
            // Simple Row with empty text
            ['Cell A2', {}, '', 'Cell D2'],
            ['Cell A3', null, 'Cell C3', 'Cell D3'],
            ['Cell A4', 'Cell B4', 'Cell C4', 'Cell D3'],
            ['Cell A5', 'Cell B5', [], 'Cell D3'],
            // A Row with Styling in CELL B6
            ['Cell A6', {text: 'Cell B6', align: 'right', font: {color: '#FF00FF'}}, 'Cell C6', 'Cell D6'],
            ['Cell A7', 'Cell B7', 'Cell C7', 'Cell D7'],
            // Draw a row with cell lines. Option "linemode" says, use border for every next cell in this line
            [
                {
                    text: 'Cell A8',
                    border: {
                        color: '#000000',
                        style: 'normal',
                        position: ['bottom', 'top'],
                        linemode: true,
                        linewidth: 2
                    }
                },
                'Cell B8',
                'Cell C8',
                'Cell D8'
            ],
            // A Cell with different font, the € Symbol is ignored by PDF Kit for text width calculation.
            [
                {
                    text: 'Colspan over "2" Cells, thats cool',
                    colspan: 2,
                    align: 'center',
                    font: {name: fontBold},
                    border: {color: '#000000', position: ['top', 'bottom', 'left', 'right']}
                },
                '',
                {text: 'One Cell', align: 'right'}
            ],
            ['', {
                text: 'Colspan over "3" Cells, thats cool',
                colspan: 3,
                align: 'center',
                font: {name: fontBold},
                border: {color: '#000000', position: ['top', 'bottom', 'left', 'right']}
            }],
            [
                {
                    text: 'Colspan over "4" Cells, thats cool',
                    colspan: 4,
                    align: 'center',
                    font: {name: fontBold},
                    border: {color: '#000000', style: 'double', position: ['bottom']}
                }
            ]
        ];

        // Enable Textboxes
        sut.showTextboxframe(true);

        sut.addTable('area51', tableData, tableHeader);
        sut.addContent('area51', bigTextNumberFour);

        // Add Table without Header
        sut.addTable('area51', ['Col A', 'Col B', 'Col C', 'Col D']);
        sut.addContent('area51', '\n\nA Image below');
        sut.addImage('area51', './test/images/litixlogo.png');
        sut.addContent('area51', 'A Image above');

        sut.addPageBreak();
        sut.addContent('area50', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.');
        sut.addImage('area51', './test/images/testbox.png');
        sut.addContent('area51', 'A Image above and below');
        sut.addImage('area51', './test/images/litixlogo.png', {width: 200});
        sut.addContent('area51', 'A Image above');

        sut.save('test/Dummy.pdf', function (result) {
            expect(result).toBeNull();
        });

        waits(1000);
    });

    it('invoice pdf', function () {
        function getCell(text, width, align, font) {
            return {
                text: text,
                width: width,
                align: align || 'left',
                font: font || {name: fontNormal}
            };
        }

        function addSummary(data, offsetColspan, colspan) {
            var offset = {text: '', colspan: offsetColspan};
            data.tablebody.push(
                [offset, {
                    text: 'Gesamt netto:',
                    align: 'left',
                    font: {name: fontBold},
                    colspan: colspan
                }, {text: data.summary, align: 'right', font: {name: fontBold}}]);
        }

        var invoice = {
            summary: '4.100,00 €',
            tablehead: [
                getCell('Pos', 40),
                getCell('Leistungsbeschreibung', 200),
                getCell('Kosten / Einheit', 100),
                getCell('Einheiten', 50, 'right'),
                getCell('Betrag (netto)', 76, 'right')
            ],
            tablebody: [
                [1, 'Null', '60.00 €', 5, '300.00 €'],
                [1, 'Nil', '95.00 €', 2, '190.00 €'],
                ['']
            ]
        };

        addSummary(invoice, 2, 2, 0);

        sut.loadTemplate('./test/templates/invoice.json');
        sut.showTextboxframe(false);

        sut.addContent('address', 'Anrede\nVorname Nachname\nStraße\n\nPLZ Ort');
        sut.addContent('info', 'Kundennummer: KDR 08741\nRechnungsnummer: RE 0815 00\n\n\nDatum: 01.11.2013');
        sut.addContent('subject', 'Rechnung');

        sut.addContent('content', 'Sehr geehrte Damen und Herren,\n\ndie unten aufgelisteten Positionen stellen wir ihnen in Rechnung:\n');

        sut.addTable('content', invoice.tablebody, invoice.tablehead);

        sut.addContent('content', '\nBitte überweisen Sie den Gesamtbetrag in Höhe von ' + invoice.summary.toString() + ' € innnerhalb von 2 Wochen nach Erhalt dieser Rechnung unter Angabe der Kunden- und Rechnungsnummer auf das Konto Nr 000 000 00 00 bei dem Geldinstitut Leipzig BLZ 000 000 00. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diama.');
        sut.addContent('content', '\nVielen Dank.\n\nDieses Schreiben wurde maschinell oder von gen-manipulierten Affen erstellt und ist ohne Unterschrift gültig.');

        sut.addPageBreak();
        sut.addContent('content', 'Landscape Format? Nice! No Header, no Footer? No Problem. Turn it off.');

        // a long text to print
        sut.addContent('content', '\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');
        sut.addContent('content', '\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.');
        sut.addContent('content', '\nUt wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.');
        sut.addContent('content', '\nNam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer');

        sut.save('test/invoice.pdf', function (result) {
            expect(result).toBeNull();
        });

        waits(1000);
    });

    it('simple pdf with errors', function () {
        sut.loadTemplate(simpleTemplate);

        sut.clear();

        expect(sut.addContent('header', 'Hello World!')).toBeTruthy();
        expect(sut.addContent('content', 'Hello World!')).toBeTruthy();
        expect(sut.addContent('noneexits', 'This text will never display.')).toBeTruthy();

        sut.addPageBreak();

        expect(sut.addContent('header', 'Hello World!')).toBeTruthy();
        expect(sut.addContent('content', 'Hello World!')).toBeTruthy();

        sut.resetDocumentIndices();

        expect(sut.addContent('header', 'Hello World!')).toBeTruthy();
        expect(sut.addContent('content', 'Hello World!')).toBeTruthy();

        sut.print(function (result, error) {
            console.log(error);
            expect(result).toBeNull();
            expect(error).toBeDefined();
            expect(typeof error).toBe('object');
            expect(error.length).toBe(2);
        });
    });

    it('simple pdf without errors', function (done) {
        sut.loadTemplate(simpleTemplate);

        sut.clear();

        expect(sut.addContent('header', 'Hello World!')).toBeTruthy();
        expect(sut.addContent('content', 'Hello World!')).toBeTruthy();

        sut.addPageBreak();

        expect(sut.addContent('content', 'Hello World!')).toBeTruthy();

        sut.resetDocumentIndices();

        expect(sut.addContent('content', 'Hello World!')).toBeTruthy();

        sut.print(function (result, error) {
            expect(error).toBeUndefined();
            expect(result).toBeDefined();
            expect(typeof result).toBe('object');

            done();
        });
    });

});