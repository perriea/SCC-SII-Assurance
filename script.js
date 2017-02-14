$(document).ready(function (e) {
  $("#getInfo").click(function (ev) {
    $("#spinner").show();
    getPage();

    function getPage(url) {
      if (url == undefined)
        url = 'https://api.sncf.com/v1/coverage/sncf/disruptions';
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        headers: {
          Authorization: 'Basic ' + btoa('3e2e5c62-2fca-408c-8b2c-f3b70cc54ed3')
        },
        success: function(result) {
          displayJourney(result);
          $("#raw-result").html(pretty.json.prettyPrint(result));
          $("#spinner").hide();
          for (var i = result.links.length - 1; i >= 0; i--) {
            if (result.links[i].type == 'next') {
              getPage(result.links[i].href);
              break;
            }
          }
        },
        error: function(xhr, textStatus, errorThrown) {
          $("#raw-result").html('Error: ' + textStatus + ' ' + errorThrown);
          $("#spinner").hide();
        }
      });
    }
    function displayJourney(journey) {
      var $tbody = $('tbody');

      $.each(journey.sections, function(index, section) {
        var $tr = $('<tr>');

        $tr.append($('<td>').html(index));
        $tr.append($('<td>').html(formatHour(section.departure_date_time)));
        $tr.append($('<td>').html(formatHour(section.arrival_date_time)));
        $tr.append($('<td>').html(section.from && section.from.name));
        $tr.append($('<td>').html(section.to && section.to.name));
        $tr.append($('<td>').html(section.mode));
        $tr.append($('<td>').html(section.type));
        $tr.append($('<td>').html(section.display_informations && section.display_informations.physical_mode));
        $tr.append($('<td>').html(section.display_informations && section.display_informations.code));

        $tbody.append($tr);
      });
    }

    function formatHour(navitiaDate) {
      return navitiaDate.substr(9).match(/.{2}/g).join(':');
    }

    if (!pretty)
      var pretty = {};

    pretty.json = {
      replacer: function(match, pIndent, pKey, pVal, pEnd) {
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
      prettyPrint: function(obj) {
        var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
          return JSON.stringify(obj, null, 3)
          .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
          .replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(jsonLine, pretty.json.replacer);
        }
      };
    });
});
