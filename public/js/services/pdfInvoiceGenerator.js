'use strict';
angular.module('app').service('pdfInvoiceGenerator', [
  '$filter',
  '$rootScope',
  function ($filter, $rootScope) {


    var businessPartner = function (data) {
      var businessPartner = '';
      var businessName = _(data).has('businessName') ? data.businessName : '';
      var comercialName = _(data).has('comercialName') ? data.comercialName : '';
      var personName = _(data).has('names') ? data.names : '';
      var personSurname = _(data).has('surnames') ? data.surnames : '';
      var personCompleteName = personName.trim() + ' ' + personSurname.trim();

      businessPartner = (personCompleteName !== ' ' ? personCompleteName: businessPartner);
      businessPartner = (businessName !== '' ? businessName: businessPartner);
      businessPartner = (comercialName !== '' ? comercialName: businessPartner);

      return businessPartner;
    };



    var layout = {
      hLineWidth: function(i, node) {
        return 0.3
      },
      vLineWidth: function(i, node) {
        return 0.3
      },
      hLineColor: function(i, node) {
        return 'gray';
      },
      vLineColor: function(i, node) {
        return 'gray';
      }
    };


    return {
      ride : function(customerInvoice, barcode){

        function cell(text){
          return {text: text, fontSize: 8};
        }

        function cellCenter(text){
          return {text: text, fontSize: 8, alignment: 'center'};
        }

        function cellRight(text){
          return {text: text, fontSize: 8, alignment: 'right'};
        }

        function cellCurrency(text){
          return {text: $filter('currency')(text), fontSize: 8, alignment: 'right'};
        }

        function cellNumber(text){
          return {text: $filter('number')(text), fontSize: 8, alignment: 'right'};
        }

        function row(text, fontSize){
          return {text: text, fontSize: fontSize};
        }

        var customerName = businessPartner(customerInvoice.customer);

        var companyInformation = {
          headerRows: 0,
          widths: ['100%'],
          body: [
            [ { stack: [
              _(row(COMPANY_INFORMATION.businessName, 10)).extend({alignment: 'center', margin: [0, 5, 0, 5]}),
              {text : [{ text: 'Dirección Matriz : ', fontSize: 7, bold: true } ,row(COMPANY_INFORMATION.address, 7) ]},
              {text : [{ text: 'Dirección Sucursal : ', fontSize: 7, bold: true } ,row(WAREHOUSE_INFORMATION.address, 7) ]},
              {text : [{ text: 'Contribuyente Especial Nro : ', fontSize: 7, bold: true } , row(COMPANY_INFORMATION.specialContributorCode || '', 7) ]},
              {text : [{ text: 'Obligado a llevar  Contabilidad : ', fontSize: 7, bold: true } , row(COMPANY_INFORMATION.accountingForced ? 'SI' : 'NO', 7)]
                , margin: [0, 0, 0, 5]
              }
            ] }]
          ]
        };

        var customerInformation = {
          headerRows: 0,
          widths: ['100%'],
          body: [
            [
              {
                columns: [
                  { stack : [
                    {text : [{ text: 'Razón Social / Nombres y Apellidos :', fontSize: 7, bold: true } , row(customerName, 7) ]},
                    {text : [{ text: 'Fecha de Emisión :', fontSize: 7, bold: true } , row(customerInvoice.creationDate, 7) ]}
                  ]},
                  { stack : [
                    {text : [{ text: 'Identificación :', fontSize: 7, bold: true } , row(customerInvoice.customer.identification, 7) ]},
                    {text : [{ text: 'Guía Remisión :', fontSize: 7, bold: true } , row('', 7) ]}
                  ]}
                ]
              }
            ]
          ]
        };

        var documentMiddle = {
          columns: [
            {table: customerInformation, margin: [0, 5, 0, 0], layout: layout}
          ]
        };

        var products = [[
          cellCenter('Cod. Principal'), cellCenter('Cantidad'), cellCenter('Descripci\xf3n'), cellCenter('Precio Unitario'),
          cellCenter('Descuento'), cellCenter('Precio Total')]
        ];

        _(customerInvoice.products).each(function(product){
          var newProduct = [
            cell(product.code), cellNumber(product.quantity), cell(product.name), cellCurrency(product.price),
            cellRight(product.totalDiscount + '%'), cellCurrency(product.subtotal)
          ];
          products.push(newProduct);
        });

        var tableProducts = {
          headerRows: 0,
          widths: ['auto', 'auto', '*', 'auto', 'auto', 'auto'],
          body: products
        };

        var documentProduct = {
          columns: [
            {table: tableProducts, margin: [0, 5, 0, 0], layout: layout}
          ]
        };

        var tableMoreDetails = {
          headerRows: 0,
          widths: ['*', '*'],
          body: [
            [{text: 'Informacion Adicional', fontSize: 7, bold: true, alignment: 'center', colSpan: 2}]
          ]
        };

        _(customerInvoice.aditionalInformation).each(function(extraData){
          tableMoreDetails.body.push([
            {text : [{ text: extraData.key + " : ", fontSize: 7, bold: true } ,row(extraData.value, 7) ]}
          ])
        });

        var tableTotals = {
          headerRows: 0,
          widths: ['*', '*'],
          body: [
            [{ text: 'Subtotal 12 % :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalIva)],
            [{ text: 'Subtotal 0 %  :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalIvaZero)],
            [{ text: 'Subtotal no objeto de IVA :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalWithOutIva)],
            [{ text: 'Subtotal extento de IVA :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalWithOutIva)],
            [{ text: 'Subtotal sin impuestos :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalWithOutIva)],
            [{ text: 'Total descuentos :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.totalDiscount)],
            [{ text: 'ICE :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.totalICE)],
            [{ text: 'IVA 12% :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.totalIVA)],
            [{ text: 'IRBPNR :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.totalIRBPNR)],
            [{ text: 'Propina :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.tip)],
            [{ text: 'Valor Total :', fontSize: 7, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.total)]
          ]
        };

        var documentBottom = {
          columns: [
            {table: tableMoreDetails, margin: [0, 5, 5, 0], layout: layout},
            {table: tableTotals, margin: [0, 5, 0, 0], layout: layout}
          ]
        };

        var documentInformation = {
          headerRows: 0,
          widths: ['100%'],
          body: [
            [ { stack: [
              _(row('R.U.C.: ' + COMPANY_INFORMATION.identification, 10)).extend({alignment: 'center'}),
              _(row('FACTURA', 9)).extend({alignment: 'center'}),
              {text : [{ text: 'No.: ', fontSize: 7, bold: true } , row(customerInvoice.number, 7) ], margin: [0, 5, 0, 0]},
              { text: 'Número de autorización', fontSize: 7, bold: true , margin: [0, 5, 0, 0]},
              row(customerInvoice.accessPasword, 7),
              //{ text: 'Fecha y Hora de Autorización', fontSize: 7, bold: true , margin: [0, 5, 0, 0]},
              //row(customerInvoice.number, 7),
              { text: 'Ambiente', fontSize: 7, bold: true , margin: [0, 5, 0, 0]},
              row($rootScope.FEAMBIENTE, 7),
              { text: 'Emisión', fontSize: 7, bold: true , margin: [0, 5, 0, 0]},
              row($rootScope.FEEMISION, 7),
              { text: 'Clave de Acceso', fontSize: 7, bold: true , margin: [0, 5, 0, 0]},
              { image: barcode, width: 200, margin: [0, 0, 0, 5]}
            ] }]
          ]
        };

        var documentHeader =  {
          columns: [
            [
              {image: COMPANY_INFORMATION.logo.src, width: 200, alignment: 'center'},
              {table: companyInformation, width: '100%', margin: [0, 10, 10, 0], layout: layout}
            ],
            {table: documentInformation, layout: layout}
          ]
        };

        return {
          pageSize: 'A4',
          content: [
            documentHeader,
            documentMiddle,
            documentProduct,
            documentBottom
          ]
        };


      },

      a5: function(customerInvoice, barcode){

        function cell(text){
          return {text: text, fontSize: 5};
        }

        function cellCenter(text){
          return {text: text, fontSize: 5, alignment: 'center'};
        }

        function cellRight(text){
          return {text: text, fontSize: 5, alignment: 'right'};
        }

        function cellCurrency(text){
          return {text: $filter('currency')(text), fontSize: 5, alignment: 'right'};
        }

        function cellNumber(text){
          return {text: $filter('number')(text), fontSize: 5, alignment: 'right'};
        }

        function row(text, fontSize){
          return {text: text, fontSize: fontSize};
        }

        var customerName = businessPartner(customerInvoice.customer);

        var companyInformation = {
          headerRows: 0,
          widths: ['100%'],
          body: [
            [ { stack: [
              _(row(COMPANY_INFORMATION.businessName, 8)).extend({alignment: 'center', margin: [0, 5, 0, 5]}),
              {text : [{ text: 'Dirección Matriz : ', fontSize: 5, bold: true } ,row(COMPANY_INFORMATION.address, 5) ]},
              {text : [{ text: 'Dirección Sucursal : ', fontSize: 5, bold: true } ,row(WAREHOUSE_INFORMATION.address, 5) ]},
              {text : [{ text: 'Contribuyente Especial Nro : ', fontSize: 5, bold: true } , row(COMPANY_INFORMATION.specialContributorCode || '', 5) ]},
              {text : [{ text: 'Obligado a llevar  Contabilidad : ', fontSize: 5, bold: true } , row(COMPANY_INFORMATION.accountingForced ? 'SI' : 'NO', 5)]
                , margin: [0, 0, 0, 5]
              }
            ] }]
          ]
        };


        var customerInformation = {
          headerRows: 0,
          widths: ['100%'],
          body: [
            [
              {
                columns: [
                  { stack : [
                    {text : [{ text: 'Razón Social / Nombres y Apellidos :', fontSize: 5, bold: true } , row(customerName, 5) ]},
                    {text : [{ text: 'Fecha de Emisión :', fontSize: 5, bold: true } , row(customerInvoice.creationDate, 5) ]}
                  ]},
                  { stack : [
                    {text : [{ text: 'Identificación :', fontSize: 5, bold: true } , row(customerInvoice.customer.identification, 5) ]},
                    {text : [{ text: 'Guía Remisión :', fontSize: 5, bold: true } , row('', 5) ]}
                  ]}
                ]
              }
            ]
          ]
        };

        var documentMiddle = {
          columns: [
            {table: customerInformation, margin: [0, 5, 0, 0], layout: layout}
          ]
        };

        var products = [[
          cellCenter('Cod. Principal'), cellCenter('Cantidad'), cellCenter('Descripci\xf3n'), cellCenter('Precio Unitario'),
          cellCenter('Descuento'), cellCenter('Precio Total')]
        ];

        _(customerInvoice.products).each(function(product){
          var newProduct = [
            cell(product.code), cellNumber(product.quantity), cell(product.name), cellCurrency(product.price),
            cellRight(product.totalDiscount + '%'), cellCurrency(product.subtotal)
          ];
          products.push(newProduct);
        });

        var tableProducts = {
          headerRows: 0,
          widths: ['auto', 'auto', '*', 'auto', 'auto', 'auto'],
          body: products
        };


        var documentProduct = {
          columns: [
            {table: tableProducts, margin: [0, 5, 0, 0], layout: layout}
          ]
        };

        var tableMoreDetails = {
          headerRows: 0,
          widths: ['*', '*'],
          body: [
            [{text: 'Informacion Adicional', fontSize: 5, bold: true, alignment: 'center', colSpan: 2}]
          ]
        };

        _(customerInvoice.aditionalInformation).each(function(extraData){
          tableMoreDetails.body.push([
            {text : [{ text: extraData.key + " : ", fontSize: 5, bold: true } ,row(extraData.value, 5) ]}
          ]);
        });

        var tableTotals = {
          headerRows: 0,
          widths: ['*', '*'],
          body: [
            [{ text: 'Subtotal 12 % :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalIva)],
            [{ text: 'Subtotal 0 %  :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalIvaZero)],
            [{ text: 'Subtotal no objeto de IVA :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalWithOutIva)],
            [{ text: 'Subtotal extento de IVA :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalWithOutIva)],
            [{ text: 'Subtotal sin impuestos :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.subtotalWithOutIva)],
            [{ text: 'Total descuentos :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.totalDiscount)],
            [{ text: 'ICE :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.totalICE)],
            [{ text: 'IVA 12% :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.totalIVA)],
            [{ text: 'IRBPNR :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.totalIRBPNR)],
            [{ text: 'Propina :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.tip)],
            [{ text: 'Valor Total :', fontSize: 5, bold: true, alignment: 'right' }, cellCurrency(customerInvoice.totals.total)]
          ]
        };

        var documentBottom = {
          columns: [
            {table: tableMoreDetails, margin: [0, 5, 5, 0], layout: layout},
            {table: tableTotals, margin: [0, 5, 0, 0], layout: layout}
          ]
        };

        var documentInformation = {
          headerRows: 0,
          widths: ['100%'],
          body: [
            [ { stack: [
              _(row('R.U.C.: ' + COMPANY_INFORMATION.identification, 8)).extend({alignment: 'center'}),
              _(row('FACTURA', 9)).extend({alignment: 'center'}),
              {text : [{ text: 'No.: ', fontSize: 5, bold: true } , row(customerInvoice.number, 5) ], margin: [0, 5, 0, 0]},
              { text: 'Número de autorización', fontSize: 5, bold: true , margin: [0, 5, 0, 0]},
              row(customerInvoice.accessPasword, 5),
              //{ text: 'Fecha y Hora de Autorización', fontSize: 5, bold: true , margin: [0, 5, 0, 0]},
              //row(customerInvoice.number, 5),
              { text: 'Ambiente', fontSize: 5, bold: true , margin: [0, 5, 0, 0]},
              row($rootScope.FEAMBIENTE, 5),
              { text: 'Emisión', fontSize: 5, bold: true , margin: [0, 5, 0, 0]},
              row($rootScope.FEEMISION, 5),
              { text: 'Clave de Acceso', fontSize: 5, bold: true , margin: [0, 5, 0, 0]},
              { image: barcode, width: 140, margin: [0, 0, 0, 5]}
            ] }]
          ]
        };

        var documentHeader =  {
          columns: [
            [
              {image: COMPANY_INFORMATION.logo.src, width: 100, alignment: 'center'},
              {table: companyInformation, width: '100%', margin: [0, 10, 10, 0], layout: layout}
            ],
            {table: documentInformation, layout: layout}
          ]
        };

        return {
          pageSize: 'A5',
          content: [
            documentHeader,
            documentMiddle,
            documentProduct,
            documentBottom
          ]
        };




      },

      zebra: function(customerInvoice, barcode) {
        function cell(text){
          return {text: text, fontSize: 2};
        }

        function cellCenter(text){
          return {text: text, fontSize: 2, alignment: 'center'};
        }

        function cellRight(text){
          return {text: text, fontSize: 2, alignment: 'right'};
        }

        function cellCurrency(text){
          return {text: $filter('number')(text, 2), fontSize: 2, alignment: 'right', margin: [ 0, 0, 0, 0 ]};
        }

        function cellNumber(text){
          return {text: $filter('number')(text), fontSize: 2, alignment: 'right'};
        }

        function row(text, fontSize){
          return {text: text, fontSize: fontSize};
        }

        var customerName = businessPartner(customerInvoice.customer);


        var products = [[
          cellCenter('Descripción'), cellCenter('Cantidad'), cellCenter('P. Unitario'), cellCenter('Total')]
        ];

        _(customerInvoice.products).each(function(product){
          var newProduct = [
            cell(product.name), cellNumber(product.quantity), cellCurrency(product.price), cellCurrency(product.subtotal)
          ];
          products.push(newProduct);
        });

        var tableProducts = {
          headerRows: 0,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: products
        };

        var layoutWhite = {
          hLineWidth: function(i, node) {
            return 0
          },
          vLineWidth: function(i, node) {
            return 0
          },
          hLineColor: function(i, node) {
            return 'white';
          },
          vLineColor: function(i, node) {
            return 'white';
          },
          paddingLeft: function(i, node) { return 1; },
          paddingRight: function(i, node) { return 1; },
          paddingTop: function(i, node) { return 0; },
          paddingBottom: function(i, node) { return 0; }
        };


        var documentProduct = {
          columns: [
            {table: tableProducts, layout: layoutWhite}
          ],
          margin: [0, 0, 0, 3]
        };


        var tableTotals = {
          headerRows: 0,
          widths: ['*', 'auto'],
          body: [
            [{ text: 'Subtotal : ', fontSize: 2, alignment: 'right'}, cellCurrency(customerInvoice.totals.subtotal)],
            [{ text: 'Descuentos :', fontSize: 2, alignment: 'right'}, cellCurrency(customerInvoice.totals.totalDiscount)],
            [{ text: 'IVA 12% :', fontSize: 2, alignment: 'right'}, cellCurrency(customerInvoice.totals.totalIVA)],
            [{ text: 'Valor Total :', fontSize: 2, alignment: 'right'}, cellCurrency(customerInvoice.totals.total)]
          ]
        };

        var documentBottom = {
          columns: [
            {text: ''},
            {table: tableTotals, layout: layoutWhite}
          ],
          margin: [0, 0, 0, 3]
        };

        return {
          pageSize: { width: 57, height: 100 },
          pageMargins: [ 1, 1, 1, 1 ],
          content: [
            { text: 'FACTURA : ' + customerInvoice.number, fontSize : 2, alignment: 'center', margin: [0, 3, 0, 3]},
            { text: COMPANY_INFORMATION.businessName.toUpperCase(), fontSize : 2, alignment: 'center'},
            { text: 'RUC : ' + COMPANY_INFORMATION.identification, fontSize : 2, alignment: 'center'},
            { text: COMPANY_INFORMATION.address, fontSize : 2, alignment: 'center'},
            { text: COMPANY_INFORMATION.email + " - " + COMPANY_INFORMATION.telephone, fontSize : 2, alignment: 'center', margin: [0, 0, 0, 3]},
            { text: 'CI/RUC : ' + customerInvoice.customer.identification, fontSize : 2},
            { text: 'Nombres : ' + customerName, fontSize : 2},
            { text: 'Dirección : ' + customerInvoice.customer.address, fontSize : 2},
            { text: 'Fecha : ' + customerInvoice.creationDate, fontSize : 2, margin: [0, 0, 0, 3]},
            documentProduct,
            documentBottom,
            { text: '** Documento sin validez tributaria **', fontSize : 2, alignment: 'center'}
          ]
        };




      }

    }
  }
]);
