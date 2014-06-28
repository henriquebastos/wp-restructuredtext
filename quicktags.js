/*
* Overwrite quicktag configurations for restructuredtext.
*/
var CallbackButton = function(id, display, callback, access, title, instance) {
        var t = this;
        QTags.Button.call(t, id, display, access, title, instance);
        t.the_callback = callback;
    };
    CallbackButton.prototype = new QTags.Button();
    CallbackButton.prototype.callback = function(element, canvas, ed) {
        var t = this, startPos, endPos, cursorPos, scrollTop, v = canvas.value, l, r, i, sel;

        if ( document.selection ) { // IE
            canvas.focus();
            sel = document.selection.createRange();
            sel.text = t.the_callback(sel.text, element, canvas, ed);

            canvas.focus();
        } else if ( canvas.selectionStart || canvas.selectionStart === 0 ) { // FF, WebKit, Opera
            startPos = canvas.selectionStart;
            endPos = canvas.selectionEnd;
            cursorPos = endPos;
            scrollTop = canvas.scrollTop;
            l = v.substring(0, startPos); // left of the selection
            r = v.substring(endPos, v.length); // right of the selection
            i = v.substring(startPos, endPos); // inside the selection

            j = t.the_callback(i, element, canvas, ed);

            canvas.value = l + j + r;
            cursorPos += j.length - i.length;

            canvas.focus();
            canvas.selectionStart = cursorPos;
            canvas.selectionEnd = cursorPos;
            canvas.scrollTop = scrollTop;
        } else { // other browsers?
            canvas.value += t.the_callback('');
            canvas.focus();
        }
    };

    QTags.tabWidth = 4;
    QTags.makeChars = function(ch, repeat) {
        var i = repeat;
        var r = '';
        while (i--) {
            r += ch;
        }
        return r;
    }

    function qt_link(selection) {
        var url = prompt(quicktagsL10n.enterURL, 'http://');
        if(!url)
            return selection;

        selection = selection || 'Title';

        return '`' + selection + ' <'+ URL + '>`_';
    };

    function qt_indent(selection) {
        if (!selection) {
            return  QTags.makeChars(' ', QTags.tabWidth);
        } else {
            var lines = selection.split('\n');
            var len = lines.length;
            for (var i = 0; i < len; i++) {
                lines[i] = QTags.makeChars(' ', QTags.tabWidth) + lines[i];
            }
            return lines.join('\n');
        }
    }

    function qt_dedent(selection) {
        if(!selection)
            return selection;

        var lines = selection.split('\n');
        var len = lines.length;

        for(var i = 0; i < len; i++) {
            var line = lines[i];
            var offs = 0;
            for(var j = 0; j < QTags.tabWidth; j++) {
                if(line.charAt(j) == ' ' || line.charAt(j) == '\t') {
                    offs += 1;
                } else {
                    break;
                }
            }
            lines[i] = line.substr(offs);
        }
        return lines.join('\n');
    }

    function qt_list(selection, bullet) {
        if(!selection)
            return bullet;

        var lines = selection.split('\n');
        var len = lines.length;

        for(var i = 0; i < len; i++) {
            lines[i] = bullet + lines[i];
        }
        return lines.join('\n');
    }

    function qt_ol(selection) {
        return qt_list(selection, '#. ');
    }

    function qt_ul(selection) {
        return qt_list(selection, '- ');
    }

    function qt_bquote(selection) {
        return '..\n\n' + qt_indent(selection);
    }

    function qt_code(selection) {
        return '.. code-block::\n\n' + qt_indent(selection);
    }

    function qt_image(selection) {
        return
    }

    function qt_image(selection) {
        var content = '';
        var defaultValue = selection || 'http://';
        var alt;
        var src = prompt(quicktagsL10n.enterImageURL, selection);

        if ( src ) {
            content = '.. image:: ' + src + '\n';

            alt = prompt(quicktagsL10n.enterImageDescription, '');
            if(alt)
                content += QTags.makeChars(' ', QTags.tabWidth) + ':alt: ' + alt + '\n';
        }
        return content;
    };

    edButtons[10] = new QTags.TagButton('strong', 'b', '**', '**', 'b');
    edButtons[20] = new QTags.TagButton('em', 'i', '*', '*', 'i');
    edButtons[25] = new QTags.TagButton('mono', 'mono', '``', '``', 'c');
    edButtons[30] = new CallbackButton('link', 'link', qt_link, 'a');
    edButtons[40] = new CallbackButton('block', 'b-quote', qt_bquote, 'q');
    edButtons[50] = undefined;
    edButtons[60] = undefined;
    edButtons[70] = new CallbackButton('img', 'img', qt_image, 'm');
    edButtons[80] = new CallbackButton('ul', 'ul', qt_ul, 'u');
    edButtons[90] = new CallbackButton('ol', 'ol', qt_ol, 'o');
    edButtons[100] = new CallbackButton('code', 'code', qt_code, 'c');
    edButtons[110] = new QTags.TagButton('more','more','<!--more-->\n\n','','t');
    edButtons[120] = new CallbackButton('dedent', '<<', qt_dedent, '<');
    edButtons[140] = new CallbackButton('indent', '>>', qt_indent, '>');