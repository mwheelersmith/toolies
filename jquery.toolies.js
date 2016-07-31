(function( $ ) {

    var delay;

    $.fn.toolies = function( options ) {
        // Allow options to be set for different requirements
        var settings = $.extend({
            delay: 1000
        }, options );

        // Add the hidden tooltip to the body
        $( "<div />" ).addClass('tooltip').appendTo( "body" );

        // Show the tooltip on mouse enter
        $( this ).mouseenter(function() {
            var tip = $( this ).attr("data-tip");

            if(typeof tip !== typeof undefined && tip !== false) {
                $('.tooltip').text(tip);

                var position = calculatePosition( $( this ) );

                delay = setTimeout(function() {
                    $( ".tooltip" ).addClass( "toolie_visible" ).css({'top' : position.top, 'left' : position.left});;
                }, settings.delay);
            }
        });

        // Remove the tooltip on mouse leave
        $( this ).mouseleave(function() {
            hideToolie();
        });

        // Remove the tooltip on mousedown if the toolie is clickable
        $( this ).mousedown(function() {
            if($( this ).hasClass( "toolie_clickable" )) {
                hideToolie();
            }
        });

        function hideToolie() {
            clearTimeout(delay);
            $( ".tooltip" ).removeClass( "toolie_visible" ).removeAttr( "style" );
        }

        function calculatePosition(toolie) {
            // Get the position of the toolie element
            var tooliePosition = toolie.offset();

            // Calculate the top position of the tooltip to 10px below the toolie element
            tooliePosition.top = tooliePosition.top + (toolie.outerHeight() + 10);

            // Calculate the left position for the tooltip based on it’s width in comparison to the toolie element
            if(toolie.outerWidth() > $('.tooltip').outerWidth()) {
                toolie.left = pos.left + ((toolie.outerWidth() - $('.tooltip').outerWidth()) / 2);
            } else {
                tooliePosition.left = tooliePosition.left - (($('.tooltip').outerWidth() - toolie.outerWidth()) / 2);

                // Keep the tooltip within the confines of the window
                if(tooliePosition.left < 10) {
                    tooliePosition.left = 10;
                } else if((tooliePosition.left + $('.tooltip').outerWidth()) > $(document).width()) {
                    tooliePosition.left = $(document).width() - ($('.tooltip').outerWidth() + 10);
                }
            }

            return tooliePosition;
        }

        return this;
    };

})( jQuery );
