var cube = (function () {
    // define a matrix where to locate the vertices of a cube
    var cube = [
        [],
        []
    ];

    // define the length of the sides
    var side = 15;

    // define the vertices from one side
    cube[0].push(M.p(0, 0, 0));
    cube[0].push(M.p(0, side, 0));
    cube[0].push(M.p(side, side, 0));
    cube[0].push(M.p(side, 0, 0));

    // define the vertices from the opposite side
    cube[1].push(M.p(0, 0, side));
    cube[1].push(M.p(0, side, side));
    cube[1].push(M.p(side, side, side));
    cube[1].push(M.p(side, 0, side));

    for (var i in cube) {
        // translate the cube to locate its reference point (0, 0, 0) to its center
        M.t(cube[i], -side / 2, -side / 2, -side / 2);

        // rotate the cube a bit in z and x axis
        M.rzd(cube[i], 55);
        M.rxd(cube[i], 65);
    }

    // next render the geometry ..

    var round = Math.round;

    var width = 100, height = 30;
    var canvas = TextCanvas(width, height);

    var offset = {
        x: round(width / 2),
        y: round(height / 2)
    };

    return {
        fps: 3,
        render: function () {
            var pts;
            
            for (var i in cube) {
                pts = cube[i];
                // M.rxd(pts, 10);
                M.ryd(pts, 10);
                // M.rzd(pts, 10);
            }

            canvas.clear('.');

            for (var j in cube) {
                var pts = cube[j];
                var pti, pt;

                for (var i = 1; i < pts.length; i++) {
                    pti = pts[i - 1];
                    pt = pts[i];
                    canvas.rect(round(offset.x + pti.x), round(offset.y + pti.y), round(offset.x + pt.x), round(offset.y + pt.y));
                    pti = pt;
                }

                pti = pts[0];
                canvas.rect(round(offset.x + pti.x), round(offset.y + pti.y), round(offset.x + pt.x), round(offset.y + pt.y));
            }

            var pts0 = cube[0],
                pts1 = cube[1];
            for (var k = 0; k < pts0.length; k++) {
                var pt0 = pts0[k];
                var pt1 = pts1[k];
                canvas.rect(round(offset.x + pt0.x), round(offset.y + pt0.y), round(offset.x + pt1.x), round(offset.y + pt1.y));
            }

            return canvas.toString();
        }
    }
})();

project(cube);

function project(animation) {
    var projector = setInterval(function () {
        var view = animation.render();

        console.clear();
        console.log(view);
    }, 1000 / animation.fps);

    document.addEventListener('click', function () {
        clearInterval(projector);
    });
}