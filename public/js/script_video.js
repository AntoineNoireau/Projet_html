document.addEventListener("DOMContentLoaded", init);



function init() {

    var iframe = document.querySelector("iframe");
    var videoId = iframe.getAttribute("id");
    var videoUrl = "https://www.youtube.com/embed/" + videoId;
    iframe.setAttribute("src", videoUrl);

    const apiKey = 'AIzaSyAPsKxEFAuXUZ-noDkdfrSQwW4xJ7Y4z-g';
    var images = document.querySelectorAll("img");

    images.forEach(function (image) {
        const videoId = image.id;
        console.log("Id vidéo = "+ videoId)
        const apiUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&part=snippet&key=" + apiKey;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                const miniaurl = data.items[0].snippet.thumbnails.high.url;
                console.log('URL de la miniature :', miniaurl);
                image.setAttribute("src",  miniaurl);
                

            })

    });

}



var images = document.querySelectorAll('.image-droite');
images.forEach(function (image) {
    image.addEventListener('click', imageClicked);
});

function imageClicked(event) {
    var imageId = event.target.id;
    //changement des liens
    var video = document.querySelector("iframe");
    var linktemp = video.id
    video.id = imageId;
    event.target.id = linktemp;
    init();

   



}