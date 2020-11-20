;
/* module-key = 'com.atlassian.plugins.atlassian-plugins-webresource-plugin:bigpipe-js', location = 'js/bigpipe/bigpipe.js' */
define('wrm/bigpipe/element', ['require'], function (require) {
    var $ = require('jquery');
    var skate = require('skate');
    var wrmData = require('wrm/data');

    return skate('big-pipe', {

        attached: function attached (element) {

            function mark(name) {
                performance.mark && performance.mark(markPrefix + name);
            }

            function dataArrived(data) {
                try {
                    var parsedHtml = $(data);
                    var $newDom = $(element).replaceWith(parsedHtml);
                    // APDEX-1370 - temporarily force synchronous initialisation instead of async :(
                    $newDom.each(function() { skate.init(this); });
                    mark("end");
                }
                catch (e) {
                    console.error('Error while parsing html: ' + e);
                    dataError(e);
                }
            }

            function renderError() {
                $(element).html('<div class="error">Unable to render element</div>');
            }

            function dataError() {
                mark("error");
                renderError();
            }

            var pipeId = element.getAttribute('data-id');
            if (!pipeId) {
                console.error('No data-id attribute provided for tag <big-pipe/>.');
                renderError();
                return;
            }

            var markPrefix = "bigPipe." + pipeId + ".";
            mark("start");

            // APDEX-1370 - temporarily force synchronous initialisation instead of async :(
            var data = wrmData.claim(pipeId);
            if (data) {
                dataArrived(data);
            } else {
                console.error('No data arrived while claiming for ' + pipeId);
                dataError();
            }
        },

        detached: function detached (element) {

        },

        type: skate.type.ELEMENT,

        resolvedAttribute: 'resolved',
        unresolvedAttribute: 'unresolved'
    });

});
;