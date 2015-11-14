(function($, _, Config, window, document, undefined) {

  if(!window._isAwesome) {
    window._isAwesome = {};
  }

  window._isAwesome.Filter = (function() {

    var filtersConfig = Config.getFilters(),
        filters = [],

        getFilterValues = function(items, filterConfig) {
          return _.chain(items)
                  .pluck(filterConfig.field)
                  .flatten()
                  .compact()
                  .value();
        };

    return {
      
      getFilters: function(items) {
        _.each(filtersConfig, function(filterConfig) {
          filters.push(_.extend(filterConfig, {
            values: getFilterValues(items, filterConfig)
          }))
        });

        return filters;
      }
    }

  })();

})(jQuery, _, _isAwesome.Config, window, document);