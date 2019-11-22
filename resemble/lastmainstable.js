$(function() {
    var $target = $("#drop-zone");
    function dropZone($target, onDrop) {
        $target
            .bind("drop", function(event) {
                var file = event.originalEvent.dataTransfer.files[0];

                event.stopPropagation();
                event.preventDefault();

                $target.removeClass("drag-over");

                var droppedImage = new Image();
                var fileReader = new FileReader();

                fileReader.onload = function(event) {
                    droppedImage.src = event.target.result;
                    $target.html(droppedImage);
                };

                fileReader.readAsDataURL(file);

                onDrop(file);
            });
    }
    function onComplete(data) {
        var time = Date.now();
        var diffImage = new Image();
        diffImage.src = data.getImageDataUrl();

        $("#image-diff").html(diffImage);

        $(diffImage).click(function() {
            var w = window.open("about:blank", "_blank");
            var html = w.document.documentElement;
            var body = w.document.body;

            html.style.margin = 0;
            html.style.padding = 0;
            body.style.margin = 0;
            body.style.padding = 0;

            var img = w.document.createElement("img");
            img.src = diffImage.src;
            img.alt = "image diff";
            img.style.maxWidth = "100%";
            img.addEventListener("click", function() {
                this.style.maxWidth =
                    this.style.maxWidth === "100%" ? "" : "100%";
            });
            body.appendChild(img);
        });

        $(".buttons").show();

        if (data.misMatchPercentage == 0) {
            $("#thesame").show();
            $("#diff-results").hide();
        } else {
            $("#mismatch").text(data.misMatchPercentage);
            if (!data.isSameDimensions) {
                $("#differentdimensions").show();
            } else {
                $("#differentdimensions").hide();
            }
            $("#diff-results").show();
            $("#thesame").hide();
        }
    }
    (function() {
        //la parte que jala las img?
        var xhr = new XMLHttpRequest();
        var xhr2 = new XMLHttpRequest();
        var done = $.Deferred();
        var dtwo = $.Deferred();

        xhr.open("GET", "snapshots/People.png", true);
        xhr.responseType = "blob";
        xhr.onload = function(e) {
            done.resolve(this.response);
        };
        xhr.send();

        xhr2.open("GET", "snapshots/People2.png", true);
        xhr2.responseType = "blob";
        xhr2.onload = function(e) {
            dtwo.resolve(this.response);
        };
        xhr2.send();

        $("#example-images").click(function() {
            $.when(done, dtwo).done(function(file, file1) {
                    resembleControl = resemble("snapshots/People.png")
                        .compareTo("snapshots/People2.png")
                        .onComplete(onComplete);
            });
            return false;
        });
    })();
});
