var artists = ['Led Zeppelin', 'ACDC', 'Rolling Stones'],
    artistTemplate = _.template(
        '<% _.each(artists, function(artist, index, artists) { %>' +
          '<div><%= index %>. <%= artist %></div>' +
        '<% }); %>'
      ),
    filteredArtists = [];

for(var i = 0; i < artists.length; i++) {
  if(artists[i] == 'ACDC') {
    filteredArtists.push(artists[i]);
  }
}
    content = '<h1>Listing some artists</h1>' + 
              artistTemplate({
                artists: filteredArtists
              });

var container = document.createElement('div');
container.innerHTML = content;
document.body.appendChild(container);