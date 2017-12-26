function Dialog(options) {
    var defaults = {
        background: '#ccc',
        width: 400,
        height: 200,
        btn: ['确定'],
    }
    var data = {};
    for (var key in defaults) {
        data[key] = defaults[key];
    }
    for (var k in options) {
        data[k] = options[k];
    }
    this.width = data.width;
    this.height = data.height;
    this.title = data.title;
    this.background = data.background;
    this.btn = data.btn;
    this.winw = document.body.clientWidth || document.documentElement.clientWidth;
    this.winh = document.body.clientHeight || document.documentElement.clientHeight;
    this.s = data.sure;
    this.c = data.close;
    this.init();
}
Dialog.prototype = {
    constructor: Dialog,
    init: function() {
        var div = document.createElement('div');
        var mark = document.createElement('div');
        mark.className = 'mark';
        div.className = 'dialog';
        div.style = 'width:' + this.width + 'px;' + 'height:' + this.height + 'px;' + 'background:' + this.background + ';left:' + (this.winw - this.width) / 2 + 'px;top:' + (this.winh - this.height) / 2 + 'px';
        document.body.appendChild(mark);
        document.body.appendChild(div);
        var h2 = document.createElement('h2');
        h2.innerHTML = this.title;
        div.appendChild(h2);
        var p = document.createElement('p');
        var pStr = "";
        for (var i = 0; i < this.btn.length; i++) {
            switch (this.btn[i]) {
                case "确定":
                    pStr += '<span class="sure">' + this.btn[i] + '</span>';
                    break;
                case "取消":
                    pStr += '<span class="close">' + this.btn[i] + '</span>';
                    break
            }
        }
        p.innerHTML = pStr;
        div.appendChild(p);
        this.addEvent();
    },
    addEvent: function() {
        var sureBtn = document.querySelector('.sure');
        var close = document.querySelector('.close') ? document.querySelector('.close') : false;
        sureBtn.onclick = this.s;
        close.onclick = this.c;
    }
}

function DialogAuto(obj) {
    Dialog.call(this, obj);
    this.timer = null;
    this.autoHide();
}
DialogAuto.prototype = Object.create(Dialog.prototype);
DialogAuto.prototype.constructor = DialogAuto;
DialogAuto.prototype.autoHide = function() {
    var that = this;
    this.timer = setTimeout(function() {
        var dialog = document.querySelector('.dialog');
        document.body.removeChild(dialog);
        document.body.removeChild(document.querySelector('.mark'));
    }, 3000)
}

function DialogDrap(obj) {
    Dialog.call(this, obj);
    this.drap();
}
DialogDrap.prototype = Object.create(Dialog.prototype);
DialogDrap.prototype.constructor = DialogDrap;
DialogDrap.prototype.drap = function() {
    var dialog = document.querySelector('.dialog');
    var that = this;
    var x, y;
    dialog.addEventListener('mousedown', function(e) {
        var ev = e || window.event;
        x = ev.clientX - this.offsetLeft;
        y = ev.clientY - this.offsetTop;
        document.addEventListener('mousemove', move, false);
    }, false);

    function move(e) {
        var ev = e || window.event;
        var x1 = ev.clientX - x;
        var y1 = ev.clientY - y;
        if (x1 <= 0) {
            x1 = 0;
        } else if (x1 > that.winw - dialog.offsetWidth) {
            x1 = that.winw - dialog.offsetWidth;
        }
        if (y1 <= 0) {
            y1 = 0
        } else if (y1 > that.winh - dialog.offsetHeight) {
            y1 = that.winh - dialog.offsetHeight;
        }
        dialog.style.top = y1 + 'px';
        dialog.style.left = x1 + 'px';
    };

    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', move, false);
    }, false)
}