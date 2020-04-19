/**
 * M JS
 * 
 * 3D operations in JavaScript.
 * 
 * @author manuelbarzi
 * @version 0.2.1
 */
var M = (function () {
    function p(x, y, z) {
        return {
            x: x || 0,
            y: y || 0,
            z: z || 0
        };
    }

    var _s = Math.sin,
        _c = Math.cos,
        pi = Math.PI;

    function rx(p, a) {
        var s = _s(a), c = _c(a), y, z;

        if (p.length) {
            var _p;

            for (var i = 0; i < p.length; i++) {
                _p = p[i];
                y = _p.y; z = _p.z;
                _p.y = y * c - z * s;
                _p.z = y * s + z * c;
            }
        } else {
            y = p.y; z = p.z;
            p.y = y * c - z * s;
            p.z = y * s + z * c;
        }
    }

    function ry(p, a) {
        var s = _s(a), c = _c(a), x, z;

        if (p.length) {
            var _p;

            for (var i = 0; i < p.length; i++) {
                _p = p[i];
                x = _p.x; z = _p.z;
                _p.x = x * c + z * s;
                _p.z = -x * s + z * c;
            }
        } else {
            x = p.x; z = p.z;
            p.x = x * c + z * s;
            p.z = -x * s + z * c;
        }
    }

    function rz(p, a) {
        var s = _s(a), c = _c(a), x, y;

        if (p.length) {
            var _p;

            for (var i = 0; i < p.length; i++) {
                _p = p[i];
                x = _p.x; y = _p.y;
                _p.x = x * c - y * s;
                _p.y = x * s + y * c;
            }
        } else {
            x = p.x; y = p.y;
            p.x = x * c - y * s;
            p.y = x * s + y * c;
        }
    }

    function rxd(p, a) {
        return rx(p, a * pi / 180);
    }

    function ryd(p, a) {
        return ry(p, a * pi / 180);
    }

    function rzd(p, a) {
        return rz(p, a * pi / 180);
    }

    function tx(p, d) {
        if (p.length) {
            var _p;

            for (var i = 0; i < p.length; i++) {
                _p = p[i];

                _p.x += d;
            }
        } else
            p.x += d;
    }

    function ty(p, d) {
        if (p.length) {
            var _p;

            for (var i = 0; i < p.length; i++) {
                _p = p[i];

                _p.y += d;
            }
        } else
            p.y += d;
    }

    function tz(p, d) {
        if (p.length) {
            var _p;

            for (var i = 0; i < p.length; i++) {
                _p = p[i];

                _p.z += d;
            }
        } else
            p.z += d;
    }

    function t(p, x, y, z) {
        if (p.length) {
            var _p;

            for (var i = 0; i < p.length; i++) {
                _p = p[i];

                _p.x += x;
                _p.y += y;
                _p.z += z;
            }
        } else {
            p.x += x;
            p.y += y;
            p.z += z;
        }
    }

    return {
        p: p,
        rx: rx,
        ry: ry,
        rz: rz,
        rxd: rxd,
        ryd: ryd,
        rzd: rzd,
        tx: tx,
        ty: ty,
        tz: tz,
        t: t
    };
})();

if (typeof module === 'object') module.exports = M;