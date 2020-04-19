/**
 * Text Canvas JS
 * 
 * A canvas for rendering whatever with characters.
 * 
 * @author manuelbarzi
 * @version 0.0.2
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

        canvas.toString = function () {
            return toString(this);
        };

        canvas.rect = function (x0, y0, x1, y1, value) {
            if (arguments.length < 5) value = '*';

            rect(this, x0, y0, x1, y1, value);
        };

        canvas.dot = function (x, y, value) {
            dot(this, x, y, value);
        };

        canvas.clear();

        return canvas;
    }

    function clear(canvas, x0, y0, x1, y1, value) {
        if (arguments.length < 6) value = ' ';

        for (var j = y0; j <= y1; j++)
            for (var i = x0; i <= x1; i++)
                canvas[j][i] = value;
    }

    function toString(canvas) {
        var string = '';

        for (var j = 0; j < canvas.length; j++)
            string += canvas[j].join('') + '\n';

        return string;
    }

    function dot(canvas, x, y, value) {
        canvas[y][x] = value;
    }

    function rect(canvas, x0, y0, x1, y1, value) {
        if (arguments.length < 6) value = '*';

        var xd = x1 - x0,
            yd = y1 - y0,
            m = Math.abs(yd / xd);

        if (isNaN(m))
            canvas[y0][x0] = value;
        else if (m === 0) {
            if (xd > 0)
                for (var i = x0; i <= x1; i++)
                    canvas[y0][i] = value;
            else
                for (var i = x0; i >= x1; i--)
                    canvas[y0][i] = value;
        } else if (m === Infinity) {
            if (yd > 0)
                for (var j = y0; j <= y1; j++)
                    canvas[j][x0] = value;
            else
                for (var j = y0; j >= y1; j--)
                    canvas[j][x0] = value;
        } else {
            if (m <= 1) {
                m = yd / xd;

                var j;

                if (xd > 0)
                    for (var i = x0; i <= x1; i++) {
                        j = Math.round(m * (i - x0) + y0);
                        canvas[j][i] = value;
                    }
                else
                    for (var i = x0; i >= x1; i--) {
                        j = Math.round(m * (i - x0) + y0);
                        canvas[j][i] = value;
                    }
            } else {
                m = xd / yd;

                var i;

                if (yd > 0)
                    for (var j = y0; j <= y1; j++) {
                        i = Math.round(m * (j - y0) + x0);
                        canvas[j][i] = value;
                    }
                else
                    for (var j = y0; j >= y1; j--) {
                        i = Math.round(m * (j - y0) + x0);
                        canvas[j][i] = value;
                    }
            }
        }
    }

    return create;
})();

if (typeof module === 'object') module.exports = TextCanvas;