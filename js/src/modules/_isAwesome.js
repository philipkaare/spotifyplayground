(function($, _, Config, Template, Filter, window, document, undefined) {

  window._isAwesome = (function() {

    var results = [],
        filteredResults = [],
        filters = [],

        templates = Template.compileTemplates(),

        artistsContainer = $('.artists'),
        filterContainer = $('.filters'),

        ACTIVE_CLASS = 'active',
        ACTIVE_SELECTOR = '.' + ACTIVE_CLASS,

        setContent = function(items, itemTpl) {
          return templates.list({
            items: items,
            itemTpl: itemTpl
          });
        },

        renderList = function(container, items, itemTpl) {
          container = container ? container : artistsContainer;
          container.html(setContent(items, itemTpl));
        },

        renderFilters = function(filters) {
          filterContainer.html(
              templates.filterList({
                filters: filters,
                filterValuesListTpl: templates.filterValuesList,
                filterTpl: templates.filter
              })
            );
        },

        filter = function(filter) {
          filteredResults = _.filter(results, function(item) {
            return _.indexOf(item[filter.filterField], filter.filterValue) !== -1;
          });

          return filteredResults;
        },

        updateFilters = function(clicked, isActive) {
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
                active = isActive(clicked),
                items = results;

            if(!active) {
              items = filter(clicked.data());
            }

            renderList(artistsContainer, items, templates.artist);
            updateFilters(clicked, active);
          });

          getArtistDetails = function(data) {
            return $.ajax({
              url: Config.getDetailsURL(data.id),
              method: 'GET',
              type: 'post',
              contentType: 'applications/json'
            });
          },

          $('[data-action="get-details"]').on('click', function(e) {
            e.preventDefault();
            
            var clicked = $(e.target);

            getArtistDetails(clicked.data()).then(function(details) {
              console.log('detail: ', details);
            });
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
          filters = Filter.getFilters(results);

          renderList(artistsContainer, results, templates.artist);
          renderFilters(filters);
          bindEvents();

        });
      }
    }

  })();

})(jQuery, _, _isAwesome.Config, _isAwesome.Template, _isAwesome.Filter, window, document);