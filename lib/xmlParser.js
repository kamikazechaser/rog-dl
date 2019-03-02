const fs = require("fs");
const xmlParser = require("fast-xml-parser");

function parseTrackerDetails(trackerName, callback) {
    const xmlOptions = {
        attributeNamePrefix : "",
        ignoreAttributes : false,
        parseAttributeValue : true
    }

    const trackerFile = fs.readFileSync(`../autodl-trackers/trackers/${trackerName}.tracker`, "utf8");
    const jsonObj = xmlParser.parse(trackerFile, xmlOptions);

    return fs.writeFile(`../enabledTracksers/${trackerName}.json`, JSON.stringify(jsonObj, null, 2), (error) => {
        if (error) {
            return callback(null, { error: true, message: "Error writing tracker spec file" });
        };

        return callback({ error: false, message: `Successfully written tracker spec file`});
    });
}