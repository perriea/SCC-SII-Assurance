$(document).ready(function (e) {

    var getProfile = $.ajax({
        url: '/getProfile',
        method: 'GET'
    });
    getProfile.success(function (result) {
        displayInTable(result);
    });
    getProfile.error(function (jqXHR) {
        location.href = '/';
    });


    function displayInTable(data) {
        var $tbody = $('#tableResult > tbody');
        var tr = $('#tableResult > tbody > tr');
        tr.remove();
        console.log(data);
        $.each(data.result, function (index, row) {
            var $tr = $('<tr>');
            $tr.append($('<td>').html(row.num));
            $tr.append($('<td>').html(row.time));
            $tr.append($('<td ' + (row.refund ? 'title="' + row.timeRefund + '"' : '') + '>').html(row.refund));
            $tbody.append($tr);
        });
    }

    var rq = $.ajax({
        url: '/isLog',
        method: 'GET'
    });
    rq.success(function (result) {
        console.log(result.error);
        if (!result.error) {
            $("li#in").hide();
            $("li#registration").hide();
            $("li#out").show();
            $("li#train ").show();
        } else {
            $("li#in").show();
            $("li#registration").show();
            $("li#out").hide();
            $("li#train").hide();
        }
    });
    rq.error(function (jqXHR) {
        location.href = '/';
    });

    if (!pretty)
        var pretty = {};

    pretty.json = {
        replacer: function (match, pIndent, pKey, pVal, pEnd) {
            var key = '<span class=json-key>';
            var val = '<span class=json-value>';
            var str = '<span class=json-string>';
            var r = pIndent || '';
            if (pKey)
                r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
            if (pVal)
                r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
            return r + (pEnd || '');
        },
        prettyPrint: function (obj) {
            var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
            return JSON.stringify(obj, null, 3)
                .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(jsonLine, pretty.json.replacer);
        }
    };
});
