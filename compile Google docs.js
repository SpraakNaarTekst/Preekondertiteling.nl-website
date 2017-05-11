var request = require('request');
var fs = require('fs');

// Map URLS to files
var mappings = {
    "eindgebruiker_opstarten" : {
        source : "https://docs.google.com/document/d/1D7QTcXbeewTsrnOXfYNOscQc7ZMgyPDlSexxS06YpNU/pub",
        filters : ["googledocs"],
        target : "./_includes/external/eindgebruiker_opstarten.html"
    },
    "technisch_profiel_aanmaken" : {
        source : "https://docs.google.com/document/d/1jjcx74wxlLCsOotm4ZSRnKA54sVdtaUfAg_kUr0P1Gk/pub",
        filters : ["googledocs"],
        target : "./_includes/external/technisch_profiel_aanmaken.html"
    },
    "technisch_probleemoplossing_app_verbindt_niet" : {
        source : "https://docs.google.com/document/d/1tln_Je_g5_ejFDNRh5sH0CrN-c2o1Y-kANJ-CD8tJKU/pub",
        filters : ["googledocs"],
        target : "./_includes/external/technisch_probleemoplossing_app_verbindt_niet.html"
    }
};

// Define filters 
var filters = {
    "googledocs" : function(input) {
        // Get proper HTML
        var startToken = '<div id="contents">';
        var endToken = '</div><div id="footer">';
        var startIndex = input.indexOf(startToken) + startToken.length;
        var endIndex = input.indexOf(endToken);
        var HTML = input.substring(startIndex, endIndex);
        // Proper H2 tags
        HTML = HTML.replace(/<h2.*?>(.*?)<\/h2>/g, "<h2 class='section-heading'>$1</h2>");
        // Replace H3 with p tag 
        HTML = HTML.replace(/<h3.*?>(.*?)<\/h3>/g, "<p class='lead'>$1</p>");
        // Replace table with nice divs
        HTML = HTML.replace(/<table.*?>(.*?)<\/table>/g, "<div>$1</div>");
        HTML = HTML.replace(/<tr.*?>(.*?)<\/tr>/g, "<div class='content-section-a'><div class='container'><div class='row'>$1</div></div></div>");
        HTML = HTML.replace(/<td.*?>(.*?)<\/td>/g, "<div class='col-lg-6 col-sm-6'>$1</div>");
        var sectionToken = "<div class='content-section-a'>";
        var sectionIndex = HTML.indexOf(sectionToken);
        var counter = 0;
        while(sectionIndex > -1) {
            if (counter % 2 == 1) {
                HTML = HTML.substring(0,sectionIndex) + "<div class='content-section-b'>" + HTML.substring(sectionIndex+sectionToken.length);
            }
            sectionIndex = HTML.indexOf(sectionToken, sectionIndex+1);
            counter++;
        }
        // Create proper link tags
        // Markdown syntax like [Ga hiernaartoe!](nl/documentatie/eindgebruiker/app)
        HTML = HTML.replace(/\[(.+?)\]\((.*?)\)/g, '<a href="{% include link id="$2" %}">$1</a>');
        // Remove style tag
        HTML = HTML.replace(/<style.*?>(.*?)<\/style>/g, "");
        // Add style tag
        var styleHTML = '<style>.filterwrapper table{ width:100%; border: 0px; } .filterwrapper tr, .filterwrapper td { border: 0px; }</style>';
        // Return in wrapper
        return styleHTML + '<div class="filterwrapper">' + HTML + '</div>';
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