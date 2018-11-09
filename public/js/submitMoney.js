(function() {

    function submitMoneyToSimcha() {
        let participentId;
        let simchaId;
        let amount;
        $('.participentGiving').click(() => {
            //get participent id
            participentId = $(event.target).closest('.participentGiving').attr('id'); //event.target.id;
            console.log(participentId);
        });
        $('.simchaGiving').click(() => {
            //get simcha id
            simchaId = $(event.target).closest('.simchaGiving').attr('id'); //event.target.id;
            console.log(simchaId);
        });
        $('.amount').change(() => {
            //get simcha
            amount = $('.amount').val();
            console.log(amount);
        });
        $('#submitMoneyToSimcha').click(() => {
            let id = event.target.id;
            console.log(id + ' ' + participentId + ' ' + simchaId + ' ' + amount);
            $.post('/submitMoneyToSimcha', { id: id, participentId: participentId, simchaId: simchaId, amount: amount }, function(data) {
                window.location.replace("/");
            }).fail(function(jqxhr) {
                console.error("function ('#submitMoneyToSimcha') failed");
            });
        });
    };
    submitMoneyToSimcha();

    // add random image as avator
    $('.participentImage').each(function() {
        var num = Math.floor(Math.random() * 2 + 1);
        img = $(this);
        img.attr('src', '/images/avator' + num + '.png');
    });

    // add image to kind image as avator
    $('.simchaImage').each(function(key ,value){
        img = $(this);
        if(value.id == "bris"){
            img.attr('src', '/images/bris.png')
        }else if(value.id == "kiddush"){
            img.attr('src', '/images/kiddush.png')
        }else if(value.id == "bar mitzvah"){
             img.attr('src', '/images/bar_mitzvah.png')
        }else if(value.id == "wedding"){
            img.attr('src', '/images/wedding.png')
        }else{
            img.attr('src', '/images/default.png')
        }
    });

    // participent css effects
    $('.participentGiving').click(() => {
        $('.participentGiving').removeClass('active');
        $(event.target).closest('.participentGiving').addClass('active'); // .css("background-color", "#b2b2b2"); 
         let e = $(event.target).closest('.participentGiving').find('.name').text();
         $('.displayParticipent').html('<span>from: ' + e + '</span>').css({'padding': '5px 10px', 'color': '#8a8a8a'});

    });

    // simcha css effects
    $('.simchaGiving').click(() => {
        $('.simchaGiving').removeClass('active');
        $(event.target).closest('.simchaGiving').addClass('active'); // .css("background-color", "#b2b2b2");  
         let e = $(event.target).closest('.simchaGiving').find('.name').text();
         $('.displaySimcha').html('<span>to: ' + e + '\'s simcha</span>').css({'padding': '5px 10px', 'color': '#8a8a8a'});
    });

    // participent display form to add money
    $('.editParticipentTrigger').click(() => {
         $(".editParticipent").css({'display': "none"});
         $(event.target).closest("td").find(".editParticipent").css({'display': "inline-block"});
    });

    // simcha display form to add money
    $('.editSimchasTrigger').click(() => {
         $(".editSimcha").css({'display': "none"});
         $(event.target).closest("td").find(".editSimcha").css({'display': "inline-block"});
    });

    //tooltip
    //$('[data-toggle="tooltip"]').tooltip();
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

}());