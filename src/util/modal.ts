import "../styles/modal.scss";


(function ($) {

    $.fn.extend({
        modal: function (option: string) {
            if (option == "show") {
                $("#id").css("display", "block");

            } else {
                $("#id").css("display", "none");

            }
            return this;
        }
    })
}(jQuery));