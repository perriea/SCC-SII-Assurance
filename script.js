$(document).ready(function (e) {
  $("#getInfo").click(function (ev) {
    ev.preventDefault();
    $("#spinner").show();
    var sandboxToken = '163c6aea-a547-434e-96fe-d93d54681237';
    var userTrainId = $("#trainId").val();
    getPage();

    function getPage(url) {
      if (url == undefined)
        url = 'https://api.sncf.com/v1/coverage/sncf/disruptions';
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        headers: {
          Authorization: 'Basic ' + btoa(sandboxToken)
        },
        success: function(result) {
          var findTrip = true;
          console.log(result);
          console.log(result.disruptions[0]);
          console.log("BOUCLE");
          for (var i = 0; i < result.disruptions.length; i++) {
            console.log(result.disruptions[i].impacted_objects[0].pt_object.trip.name);
            console.log(userTrainId);
            if (result.disruptions[i].impacted_objects[0].pt_object.trip.name == userTrainId) {
              // console.log(result.disruptions[i]);
              displayInTable(result.disruptions[i], userTrainId);
              findTrip = false;
            }
          }
          if (findTrip) {
            for (var i = result.links.length - 1; i >= 0; i--) {
              if (result.links[i].type == 'next') {
                getPage(result.links[i].href);
                break;
              }
            }
          }
          $("#raw-result").html(pretty.json.prettyPrint(result));
          $("#spinner").hide();
        },
        error: function(xhr, textStatus, errorThrown) {
          $("#raw-result").html('Error: ' + textStatus + ' ' + errorThrown);
          $("#spinner").hide();
        }
      });
    }

    function displayInTable(disruptions, userTrainId) {
      var $tbody = $('#tableResult > tbody');
      var tr = $('#tableResult > tbody > tr');
      tr.remove();
      var stopTable = disruptions.impacted_objects[0].impacted_stops;
      /*console.log(stopTable);*/
      $.each(stopTable, function(index, section) {
        /*console.log(index);
        console.log(section);
        console.log(stopTable.length);*/
        var $tr = $('<tr>');
        var real_arrival_heure = section.amended_arrival_time.substr(0, 2);
        var real_arrival_minute = section.amended_arrival_time.substr(2, 2);
        var real_arrival_sec = section.amended_arrival_time.substr(4, 2);
        var base_arrival_heure = section.base_arrival_time.substr(0, 2);
        var base_arrival_minute = section.base_arrival_time.substr(2, 2);
        var base_arrival_sec = section.base_arrival_time.substr(4, 2);

        var differenceHeure = real_arrival_heure - base_arrival_heure;
        if (differenceHeure < 0) {
          differenceHeure = differenceHeure + 60;
        }
        var differenceMinute = real_arrival_minute - base_arrival_minute;
        if (differenceMinute < 0) {
          differenceMinute = 60 + differenceMinute;
        }
        var differenceSec = real_arrival_sec - base_arrival_sec;

        var remboursement = 0;
        if (differenceMinute == 30) {
          remboursement = 20;
        }
        if (differenceMinute == 60 || differenceHeure == 1) {
          remboursement = 40;
        }
        if (differenceHeure == 2) {
          remboursement = 60;
        }
        if (differenceMinute == 30 && differenceHeure == 2) {
          remboursement = 100;
        }

        $tr.append($('<td>').html(userTrainId));
        $tr.append($('<td>').html(stopTable[0].stop_point.label));
        $tr.append($('<td>').html(section.stop_point.label));
        $tr.append($('<td>').html(stopTable[stopTable.length - 1].stop_point.label));
        $tr.append($('<td>').html(differenceHeure + 'H ' + differenceMinute + 'm ' + differenceSec + 's '));
        $tr.append($('<td>').html(remboursement + ' %'));
        $tr.append($('<td>').html('<button class="btn btn-primary"><i class="fa fa-map-marker"></i> Ici</button>'));
        $tbody.append($tr);
      });
    }
  });

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
