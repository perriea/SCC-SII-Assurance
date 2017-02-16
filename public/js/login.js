/**
 * Created by loquet_j on 15/02/2017.
 */
$(document).ready(function (e) {
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

    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var regPasswd = new RegExp(/^[a-zA-Z]{6,30}$/);
        var regMail = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/);
        var checkMail = $('form#loginForm #mail');
        var checkPasswd = $('form#loginForm #passwd');
        if (checkMail.val() != '' && checkPasswd.val() != '') {
            if (regMail.test(checkMail.val()) && regPasswd.test(checkPasswd.val())) {
                var rq = $.ajax({
                    url: '/api/auth/login',
                    method: 'POST',
                    data: {mail: checkMail.val(), passwd: checkPasswd.val()},
                    beforeSend: function () {
                        checkMail.val('');
                        checkPasswd.val('');
                    }
                });
                rq.success(function (result) {
                    if (result.message) {
                        location.href = '/';
                    }
                });
                rq.error(function (jqXHR) {

                });
            }
        }
    });

    var rq = $.ajax({
        url: '/isLog',
        method: 'GET'
    });
    rq.success(function (result) {
        console.log(result.error);
        location.href = '/';
    });
    rq.error(function (jqXHR) {
        if (!result.error) {
            $("li#in").hide();
            $("li#registration").hide();
            $("li#out").show();
            $("li#listTrain").show();
        } else {
            $("li#in").show();
            $("li#registration").show();
            $("li#out").hide();
            $("li#listTrain").hide();
        }
    });

});