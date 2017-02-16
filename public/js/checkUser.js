/**
 * Created by loquet_j on 16/02/2017.
 */
$(document).ready(function () {
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
            $("li#train").show();
            $("li#profile").show();
        } else {
            $("li#in").show();
            $("li#registration").show();
            $("li#out").hide();
            $("li#train").hide();
            $("li#profile").hide();
        }
    });
    rq.error(function (jqXHR) {
        $("li#in").show();
        $("li#registration").show();
        $("li#out").hide();
        $("li#train").hide();
        $("li#profile").hide();
    });

    $('#outLink').on('click', function () {
        console.log('#outLink');
        var rq = $.ajax({
            url: '/api/auth/logout',
            method: 'GET'
        });
        rq.success(function () {
            location.href = '/';
        });
        rq.error(function (jqXHR) {
            console.log(jqXHR);
        });
    });

});