$(document).ready(function() {
    $(document).on("keydown", ".wc-number .wc-form", function(e) {
        if (this.value.length > 1) {
            this.value = String.fromCharCode(e.keyCode);
        }
    });
    $(document).on("keyup", ".wc-number .wc-form", function(e) {
        if (this.value.length > 1) {
            this.value = String.fromCharCode(e.keyCode);
        }
    });
});