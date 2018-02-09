$(document).ready(function () {

    // Trigger animations on reload
    $(window).scrollTop($(window).scrollTop() - 1);

    // Smooth scrolling to all links in navbar
    $(".navbar a, footer a[href='#top']").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function () {
                window.location.hash = hash;
            });
        }
    });

    // Close navbar after click
    $('.nav a').on('click', function () {
        if ($('.navbar-toggle').css('display') != 'none') {
            $(".navbar-toggle").trigger("click");
        }
    });

    // Trigger images/icons spawn
    $(window).scroll(function () {
        var winHeight = $(window).height();
        var winTop = $(window).scrollTop();

        // Fade in Title
        if ($(window).scrollTop() >= $(window).height()) {
            $('#homeBtn').fadeIn().removeClass('hidden');
        } else {
            $('#homeBtn').fadeOut();
        }

        //Slide in Elements
        $(".slideanim").each(function () {
            var topPos = $(this).offset().top;
            if (topPos < (winTop + winHeight / 1.5)) {
                $(this).addClass("slideUpIn");
            }
        });

    });

    //Contact form
    $('#form').submit(function (event) {
        event.preventDefault();
        var $form = $(this);
        var serializedData = $form.serialize();

        request = $.ajax({
            url: "/contact",
            type: "POST",
            data: serializedData,
            success: function () {
                $('#form').fadeOut(1000, function () {
                    $('#form').css({"visibility": "hidden", display: 'block'}).slideUp(1000);
                    $('#sentMessage').fadeIn(1000);
                });
            },
            error: function () {
                alert('An error occurred');
                $('#email').val('');
            }
        });
    });
});