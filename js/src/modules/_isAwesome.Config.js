(function($, _, window, document, undefined) {

  if(!window._isAwesome) {
    window._isAwesome = {};
  }

  window._isAwesome.Config = (function() {

    var apiUrl = 'https://api.spotify.com/v1/artists?ids=',
        detailsUrl = 'https://api.spotify.com/v1/artists/{{id}}/albums',
        artistsIds = [
          /**
           * The ones that I love (I know, I'm getting old)
           */
          '36QJpDe2go2KgaRleHCDTp', // Led Zeppelin id
          '711MCceyCBcFnzjGY4Q7Un', // ACDC id
          '22bE4uQ6baNwSHPVcDxLCe', // Rolling Stones id

          /**
           * The ones that are only for this application purposes
           */
          '2RdwBSPQiwcmiDo9kixcl8', // Pharrel Williams id ('cause he's funny)
          '4dpARuHxo51G3z768sgnrY', // Adele ('cause it rhymes with Pharrel)
          '4ZDoy7AWNgQVmX7T0u0B1j', // No te va gustar ('cause they are from my country)
          '0yNSzH5nZmHzeE2xn6Xshb', // Calle 13 ('cause they are also latinos)
          '1Cs0zKBU1kc0i8ypK3B9ai'  // David Guetta (just to have a one more genre)
        ],

        templates = {
          list: '#list-tpl',
          filterList: '#filter-list-tpl',
          filterValuesList: '#filter-values-list',

          artist: '#artist-tpl',
          filter: '#filter-tpl'
        },

        filters = [{
          label: 'Genre',
          field: 'genres'
        }];

    return {
      
      getSearchURL: function() {
        return apiUrl + artistsIds.join(',');
      },

      getDetailsURL: function(artist) {
        return detailsUrl.replace('{{id}}', artist);
      },

      getTemplates: function() {
        return templates;
      },

      getFilters: function() {
        return filters;
      }
    }

  })();

})(jQuery, _, window, document);