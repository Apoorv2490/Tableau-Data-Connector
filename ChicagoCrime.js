(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "case_number",
        alias: "case_number",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "primary_type",
        dataType: tableau.dataTypeEnum.string
    }
    , {
        id: "location_description",
        dataType: tableau.dataTypeEnum.string
    }
    , {
        id: "arrest",
        dataType: tableau.dataTypeEnum.string
    }

    ];

    var tableSchema = {
        id: "ChicagoCrimeFeed",
        alias: "Chicago Crime Data",
        columns: cols
    };

    schemaCallback([tableSchema]);


    };

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://data.cityofchicago.org/resource/ijzp-q8t2.json", function(resp) {
        var feat = resp,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
              "id": feat[i].id,
               "case_number": feat[i].case_number,
               "date": feat[i].date,
               "primary_type": feat[i].primary_type,
               "location_description": feat[i].location_description,
               "arrest": feat[i].arrest

            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);



    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "ChicagoCrimeFeed";
        tableau.submit();
    });
});

})();