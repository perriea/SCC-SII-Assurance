/**
 * Created by loquet_j on 15/02/2017.
 */
$(document).ready(function (e) {
    $('form#registerForm').submit(function (e) {
        $('#error').hide();
        e.preventDefault();
        var regName = new RegExp(/^[a-zA-Z]*$/);
        var regMail = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/);
        var checkName = $('form#registerForm #nom');
        var checkPrenom = $('form#registerForm #prenom');
        var checkMail = $('form#registerForm #mail');
        var checkPasswd = $('form#registerForm #passwd');
        var checkIdeth = $('form#registerForm #ideth');
        if (checkName.val() != '' && checkPrenom.val() != '' && checkMail.val() != '' && checkPasswd.val() != '' && checkIdeth.val() != '') {
            if (regName.test(checkName.val()) && regName.test(checkPrenom.val()) && regMail.test(checkMail.val()) && regName.test(checkPasswd.val()) && regName.test(checkIdeth.val())) {
                // this.submit();
                var rq = $.ajax({
                    url: '/api/auth/signup',
                    method: 'POST',
                    data: {nom: checkName.val(), prenom: checkPrenom.val(), mail: checkMail.val(), passwd: checkPasswd.val(), ideth: checkIdeth.val()},
                    beforeSend: function () {
                        checkName.val('');
                        checkPrenom.val('');
                        checkMail.val('');
                        checkPasswd.val('');
                        checkIdeth.val('');
                    }
                });
                rq.success(function (result) {
                    console.log(result);
                });
                rq.error(function (jqXHR) {

                });
            } else {
                $('#error').slideDown();
                setTimeout(function () {
                    $('#error').slideUp();
                }, 3000);
            }
        }
    });
});