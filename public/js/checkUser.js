/**
 * Created by loquet_j on 15/02/2017.
 */
$(document).ready(function (e) {
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
});