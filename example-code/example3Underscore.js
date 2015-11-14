var artists = ['Led Zeppelin', 'ACDC', 'Rolling Stones'],
    artistTemplate = _.template(
        '<% _.each(artists, function(artist, index, artists) { %>' +
          '<div><%= index %>. <%= artist %></div>' +
        '<% }); %>'
      ),
    content = '<h1>Listing some artists</h1>' + 
              artistTemplate({
                artists: _.filter(artists, function(artist, index, artists) {
                  return artist === 'ACDC';
                })
              });

var container = document.createElement('div');
container.innerHTML = content;
document.body.appendChild(container);