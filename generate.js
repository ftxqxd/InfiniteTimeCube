// Markov chain code taken from
// http://www.bitsofpancake.com/programming/markov-chain-text-generator/

// Adds a new paragraph
function add(v) {
    var out = document.getElementById('out');
    var p = document.createElement('p');
    var text = document.createTextNode(v);
    p.appendChild(text);
    out.appendChild(p);
    p.style.margin = "0px auto";
    p.style.fontSize = Math.round(Math.random()*12 + 24) + "pt";
    p.style.width = Math.round(Math.random()*200 + 600) + "px";
    var col = Math.random();
    if (col >= 0.6 && col < 0.8) {
        p.style.color = "#000075";
    } else if (col >= 0.8) {
        p.style.color = "red";
    }
    if (Math.random() > 0.3) {
        p.style.fontWeight = "bold";
    }
    if (Math.random() > 0.8) {
        p.style.fontStyle = "italic";
    }
}

function readTextFile(file, callback) {
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function () {
        if (f.readyState === 4 && (f.status === 200 || f.status === 0)) {
            var text = f.responseText;
            callback(text);
        }
    };
    f.send(null);
}

// Holds the state information
var cache = {
    '_START': []
};

(function() {
    var text = rawText.split(/\s+/g);

    if (!text.length)
        return;

    // Add it to the start node's list of possibility
    cache['_START'].push(text[0]);

    // Now go through each word and add it to the previous word's node
    for (var i = 0; i < text.length - 1; i++) {
        if (!cache[text[i]])
            cache[text[i]] = [];
        cache[text[i]].push(text[i + 1]);

        // If it's the beginning of a sentence, add the next word to the start node too
        if (text[i].match(/\.$/))
            cache['_START'].push(text[i + 1]);
    }
})();

function whichScroll() {
    if (document.documentElement.scrollTop) { return document.documentElement; }
    return document.body;
}

window.onscroll = function() {
    var dist = whichScroll().scrollHeight - whichScroll().scrollTop;
    while (dist < 2000) {
        generate();
        dist = whichScroll().scrollHeight - whichScroll().scrollTop;
    }
};

function generate() {
    // Start with the root node
    var currentWord = '_START';
    var str = '';

    // Generate 85 words of text
    var nwords = Math.round(Math.random()*50 + 60);
    for (var i = 0; i < nwords; i++) {

        // Follow a random node, append it to the string, and move to that node
        var rand = Math.floor(Math.random() * cache[currentWord].length);
        str += cache[currentWord][rand];

        // No more nodes to follow? Start again. (Add a period to make things look better.)
        if (!cache[cache[currentWord][rand]]) {
            currentWord = '_START';
            if (!cache[currentWord][rand].match(/\.$/))
                str += '. ';
            else
                str += ' ';
        } else {
            currentWord = cache[currentWord][rand];
            str += ' ';
        }
    }
    add(str);
}
generate();
generate();
generate();
