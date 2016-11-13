const fs = require('fs');

function JsonReplacerPlugin(options) {
    this.inputFile = options.inputFile;
    this.outputFile = options.outputFile || this.inputFile;
    this.replacer = options.replacer || null;
    this.replacers = options.replacers || [ this.replacer ];
    this.spacer = options.spacer || "    ";
}

JsonReplacerPlugin.prototype.apply = function(compiler) {
    var file = fs.readFileSync(this.inputFile);
    fs.writeFileSync(
        this.outputFile,
        JSON.stringify(JSON.parse(file), replacersArray(this.replacers), this.spacer)
    );
};

const replacersArray = function (replacers) {
    return function (key, value) {
        for (var replacer of replacers) {
            var result = replacer(key, value);
            if (result) return result;
        }
    };
};

module.exports = JsonReplacerPlugin;