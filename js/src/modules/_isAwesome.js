(function($, _, Config, Template, window, document, undefined) {

  window._isAwesome = (function() {

    var results = [],
        filteredResults = [],

        templates = Template.compileTemplates(),
        itemContainer = $('#item-container'),

        ACTIVE_CLASS = 'active',
        ACTIVE_SELECTOR = '.' + ACTIVE_CLASS,

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

        updateView = function(clicked, isActive) {
          if(isActive) {
            clicked.removeClass(ACTIVE_CLASS);
          } else {
            clicked
            .closest('ul')
              .find(ACTIVE_SELECTOR)
                .removeClass(ACTIVE_CLASS)
                .end()
              .end()
            .addClass(ACTIVE_CLASS);
          }
        },

        isActive = function(clicked) {
          return clicked.hasClass(ACTIVE_CLASS);
        },

        bindEvents = function() {
          $('[data-action="filter"]').on('click', function(e) {
            var clicked = $(e.target),
                active = isActive(clicked);

            if(!active) {
              filter(clicked.data());
              render(filteredResults);
            } else {
              render(results);
            }

            updateView(clicked, active);
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