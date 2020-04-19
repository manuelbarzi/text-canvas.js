/**
 * TextCanvas.js
 * 
 * A canvas for rendering whatever with characters.
 * 
 * @author manuelbarzi
 * @version 0.0.0
 */
var TextCanvas = (function () {
    function create(width, height) {
        var canvas = [];

        for (var j = 0; j < height + 1; j++)
            canvas[j] = new Array(width + 1);

        canvas.clear = function (value) {
            if (!arguments.length) value = ' ';

            clear(this, 0, 0, width, height, value);
        };

        canvas.render = function () {
            return render(this);
        };

        canvas.rect = function (x0, y0, x1, y1, value) {
            if (arguments.length < 5) value = '*';
            
            rect(this, x0, y0, x1, y1, value);
        };

        canvas.set = function (x, y, value) {
            set(this, x, y, value);
        };

        canvas.clear();

        return canvas;
    }

    function clear(canvas, fromX, fromY, toX, toY, value) {
        if (arguments.length < 6) value = ' ';

        for (var j = fromY; j <= toY; j++)
            for (var i = fromX; i <= toX; i++)
                canvas[j][i] = value;
    }

    function render(canvas) {
        var render = '';

        for (var j = 0; j < canvas.length; j++)
            render += canvas[j].join('') + '\n';

        return render;
    }

    function set(canvas, x, y, value) {
        canvas[y][x] = value;
    }

    function rect(canvas, fromX, fromY, toX, toY, value) {
        if (arguments.length < 6) value = '*';

        var from, to;

        if (fromX === toX) {
            from = fromY;
            to = toY;

            if (fromY > toY) {
                from = toY;
                to = fromY;
            }

            for (var j = from; j <= to; j++)
                canvas[j][fromX] = value;
        } else if (fromY === toY) {
            from = fromX;
            to = toX;

            if (fromX > toX) {
                from = toX;
                to = fromX;
            }

            for (var i = from; i <= to; i++)
                canvas[fromY][i] = value;
        } else {
            var m = (toY - fromY) / (toX - fromX);

            var j;

            from = fromX;
            to = toX;

            if (fromX > toX) {
                from = toX;
                to = fromX;
            }

            for (var i = from; i <= to; i++) {
                j = Math.round(m * (i - fromX) + fromY);
                canvas[j][i] = value;
            }
        }

    }

    return create;
})();

if (typeof module === 'object') module.exports = TextCanvas;