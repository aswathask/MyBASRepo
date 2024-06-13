sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("com.sample.odatasample.controller.View1", {
            onInit: function () {
                var odataModel = new sap.ui.model.odata.v2.ODataModel("Northwind/V2/(S(4vf4rgp15um53zin3oxy2awy))/OData/OData.svc/");
                odataModel.read("/Categories",{
                    success:function(oData,oResponse){
                        MessageBox.success("Success");
                        
                    },
                    error: function(oError){
                        MessageBox.error("Error");
                    }
                });
                this.getView().setModel(odataModel);
            },

            onBeforeRendering: function () {
                var that = this;
               // var sServiceURL = "/V2/Northwind/Northwind.svc/";

                // var oModel = new sap.ui.model.odata.v2.ODataModel({
                //     serviceURL: sServiceURL
                // });
                // var oModel = this.getOwnerComponent().getModel("productModel");
                // oModel.read("/Categories",
                //     {
                //         success: function (oData, oResponse) {
                //             var oProduct1 = oModel.getData("/Categories");
                //             //var oProduct1Name = oModel.getProperty("/Products(1)/ProductName");
                //             var model = new sap.ui.model.json.JSONModel(oProduct1);
                //             that.getView().setModel(model);

                //         },
                //         error: function (oError) { console.log("Error", oError); }
                //     });
                //sap.ui.getCore().setModel(oModel);
            },
            updateData: function(){
                var list = this.getView().byId("list");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var description = selItem.getDescription();
                var Name = this.getView().byId("nameinput").getValue();
                var payload = {
                    ID: parseInt(title),
                    Name: Name
                };

                var path = "/Categories(" + title + ")";
                var odataModel = this.getOwnerComponent().getModel("productModel");
                // @ts-ignore
                odataModel.update(path,payload,{
                    success: function(data,response){
                        MessageBox.success("Successfully Updated");
                    },
                    error: function(error){
                        MessageBox.error("Error while updating the data");
                    }
                });
            },
            createData: function(){
                var ID = this.getView().byId("idinput").getValue();
                var Name = this.getView().byId("nameinput").getValue();
                var data = {
                    ID: parseInt(ID),
                    Name: Name
                };
                var odataModel = this.getOwnerComponent().getModel("productModel");
               // var odataModel = this.getView().getModel();
               // var odataModel = new sap.ui.model.odata.v2.ODataModel("Northwind/V2/(S(4vf4rgp15um53zin3oxy2awy))/OData/OData.svc/");
                odataModel.create("/Categories", data, {
                    success: function(data, response){
                        MessageBox.success("Data successfully created");
                    },
                    error: function(error){
                        MessageBox.error("Error while creating the data");
                    }
                });
            },

            deleteData: function(){
                var list = this.getView().byId("list");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var path = "/Categories(" + title + ")"; ///Categories(3);
                //var odataModel = this.getView().getModel();
                var odataModel = this.getOwnerComponent().getModel("productModel");
                odataModel.remove(path,{
                    success: function(data,response){
                        MessageBox.success("Deleted data");
                    },
                    error: function(error){
                        MessageBox.error("Deletion failed");
                    }
                })
            }

        });
    });
