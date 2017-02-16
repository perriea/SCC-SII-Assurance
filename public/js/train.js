$(document).ready(function (e) {
    $("#addTrain").click(function (ev) {
        ev.preventDefault();
        if ($("#trainId").val() == '' || $('#hour').val() == '') {
            $("#show_error").show();
        } else {
            $("#spinner").show();
            var trainId = $("#trainId").val();
            var trainDepartureHour = $('#hour').val().replace(':', '') + '00';
        }
        var rq = $.ajax({
            url: '/addTrain',
            method: 'POST',
            data: {num: trainId, time: trainDepartureHour}
        });
        rq.success(function (result) {
            console.log(result);
            location.href = 'profile.html';
        });
        rq.error(function (jqXHR) {
            location.href = '/';
        });
    });

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

});
