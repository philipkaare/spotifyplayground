(function($, _, Config, window, document, undefined) {

  if(!window._isAwesome) {
    window._isAwesome = {};
  }

  window._isAwesome.Template = (function() {

    var config = Config,

        getTemplateContent = function(selector) {
          return $(selector).html();
        };

    return {

      compileTemplates: function() {
        var templates = config.getTemplates(),
            compiledTemplates = {};

        for(templateKey in templates) {
          compiledTemplates[templateKey] = _.template(getTemplateContent(templates[templateKey]));
        }

        return compiledTemplates;
      }
    }

  })();

})(jQuery, _, _isAwesome.Config, window, document);