const ContentType = {
    VIDEO: 'video',
    NOTE: 'note',
    UNKNOWN: 'unknown'
};

function determineContentType() {
    var videoElement = document.querySelector('video');
    if(videoElement) {
        console.log("VIDEO detected");
        return ContentType.VIDEO;
    }

    var noteElement = document.querySelector('.lecture-view--container--mrZ5m');
    if(noteElement) {
        console.log("NOTE detected");
        return ContentType.NOTE;
    } else {
        return ContentType.UNKNOWN;
    }
}

function delay(ms) { return new Promise(resolve => { console.log('gonna wait ' + (ms/1000) + ' seconds'); setTimeout(resolve, ms); }); }

async function pauseForXMilliseconds(milliseconds) { await delay(milliseconds); }

async function skipVideos(quant) {
    var i = 0;
    while(i < quant) {
        console.log("This is the content #" + (i+1));
        await pauseForXMilliseconds(7000); // Wait for the content to load, so we don't get a null video element
        var contentType = determineContentType(); // Determine the content type of the current content
        switch(contentType) {
            case ContentType.VIDEO:
                console.log("Video procedure");
                var video = document.querySelector('video');
                var duration = video.duration;
                video.currentTime = video.duration - 1;
                await pauseForXMilliseconds(1500);  // Wait for the video to really finish
                break;
            case ContentType.NOTE:
                console.log("Note procedure");
                await pauseForXMilliseconds(8000);  // Pause for a while to simulate read the note and marks it as checked
                console.log("Finished await time for the note, skipping");
                break;
            case ContentType.UNKNOWN:
                console.log("Unknown content type");
                break;
        }
        document.querySelector("#go-to-next-item").click();
        i++;
    }
}

skipVideos(100);
