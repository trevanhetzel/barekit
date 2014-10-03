module('Barekit');

test('core', function() {
    ok(window.Barekit);
});

module('Accordion');

test('should be a jquery plugin', function() {
    ok($.fn.bkAccordion);
});