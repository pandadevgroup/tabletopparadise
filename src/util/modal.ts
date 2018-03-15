import "../styles/modal.scss";


(function ($) {

    $.fn.extend({
        modal: function (option?: string) {
            if (option == "show") {

                $(this).css("display", "block");
                $(this).focus();
                var parent = this;
                // When the user clicks the button, open the modal 
                $(".close").click(function () {
                    $(parent).css("display", "none");
                });
                $(window).keyup(function (e) {
                    if (e.keyCode == 27)
                        $(".close").click();
                });
                




            } else if (option == "hide") {
                $(this).css("display", "none");

            } else {

            }
            return this;
        }
    })
}(jQuery));