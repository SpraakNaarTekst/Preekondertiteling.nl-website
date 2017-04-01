var request = require('request');
var fs = require('fs');

// Map URLS to files
var mappings = {
    "technisch_profiel_aanmaken" : {
        source : "https://docs.google.com/document/d/1jjcx74wxlLCsOotm4ZSRnKA54sVdtaUfAg_kUr0P1Gk/pub",
        filters : ["googledocs"],
        target : "./_includes/external/technisch_profiel_aanmaken.html"
    }
};

// Define filters 
var filters = {
    "googledocs" : function(input) {
        var startToken = '<div id="contents">';
        var endToken = '</div><div id="footer">';
        var startIndex = input.indexOf(startToken) + startToken.length;
        var endIndex = input.indexOf(endToken);
        var extraHTML = '<style>.filterwrapper table{ width:100%; border: 0px; } .filterwrapper tr, .filterwrapper td { border: 0px; }</style>';
        return extraHTML + '<div class="filterwrapper">' + input.substring(startIndex, endIndex) + '</div>';
    }
}

// Loop
Object.keys(mappings).map(function(mappingName, index) {
    var mapping = mappings[mappingName];
    // Fetch URLs
    var sourceURL = mapping.source;
    request(sourceURL, function (error, response, body) {
        if (error) {
            console.log('error:', error);
            return;
        }
        console.log('statusCode:', response && response.statusCode);
        // Apply filters
        var filteredBody = body;
        for(var filterIndex in mapping.filters) {
            var filterName = mapping.filters[filterIndex];
            var filter = filters[filterName];
            filteredBody = filter(filteredBody);
        }
        // Store files 
        fs.writeFile(mapping.target, filteredBody);
    });
});

// Done