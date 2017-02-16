/**
 * Created by loquet_j on 15/02/2017.
 */
$(document).ready(function (e) {
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
                    console.log(result);
                });
                rq.error(function (jqXHR) {

                });
            }
        }
    });
});