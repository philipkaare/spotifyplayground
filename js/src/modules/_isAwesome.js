(function($, _, Config, Template, window, document, undefined) {

  window._isAwesome = (function() {

    var results = [],
        filteredResults = [],

        templates = Template.compileTemplates(),
        itemContainer = $('#item-container'),

        setContent = function(results) {
          return templates.itemList({
            items: results,
            itemTpl: templates.item
          });
        },

        render = function(results) {
          itemContainer.html(setContent(results));
        },

        filter = function(filter) {
          filteredResults = _.filter(results, function(item) {
            return _.indexOf(item[filter.filterField], filter.filterValue) !== -1;
          });

          return filteredResults;
        },

        updateView = function(clicked) {
          clicked
            .closest('ul')
              .find('.active')
                .removeClass('active')
                .end()
              .end()
            .addClass('active');
        },

        bindEvents = function() {
          $('[data-action="filter"]').on('click', function(e) {
            var clicked = $(e.target);

            updateView(clicked);
            filter(clicked.data());
            render(filteredResults);
          });
        },

        getArtists = function() {
          return $.ajax({
              url: Config.getSearchURL(),
              method: 'GET',
              type: 'post',
              contentType: 'applications/json'
            });
        };

    return {

      init: function() {
        getArtists().then(function(data) {
          results = data.artists;

          render(results);
          bindEvents();

        });
      }
    }

  })();

})(jQuery, _, _isAwesome.Config, _isAwesome.Template, window, document);