/**
 * Created by hasesanches on 14.07.2017.
 */
(function () {
    if (window.__nscContentScriptVideoEditor) return;
    window.__nscContentScriptVideoEditor = true;

    // console.log('start video editor');

    var editor = {
        canvas: {
            common: {},
            background: {},
            animate: {},
            current: {}
        },
        isDraw: false,
        requestAnimationId: null,
        colorTools: {
            pen: '#00FF00',
            arrow: '#FF0000',
            square: '#0000FF',
            blur: '#FFFFFF'
        },
        notif: {
            red: 'data:image/png;base64,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',
            blue: 'data:image/png;base64,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',
            green: 'data:image/png;base64,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'
        },
        currentTools: 'cursorRing',
        history: {
            memory: [],
            save: function () {
                editor.history.memory.push(Object.assign({}, {
                    date: Date.now(),
                    data: editor.canvas.current.ctx.getImageData(0, 0, editor.canvas.common.width, editor.canvas.common.height),
                    tools: editor.currentTools
                }));
            },
            remove: function (index) {
                if (editor.history.memory[index].tools !== 'blur') editor.history.memory.splice(index, 1);
            },
            removeAll: function () {
                editor.history.memory.splice(0, editor.history.memory.length);
            },
            draw: function () {
                editor.canvas.background.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                for (let i = 0, len = editor.history.memory.length; i < len; i++) {
                    let item_history = editor.history.memory[i];
                    editor.canvas.current.ctx.putImageData(item_history.data, 0, 0);
                    editor.canvas.background.ctx.drawImage(editor.canvas.current.canvas[0], 0, 0);
                    editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                }
            }
        },
        preloader: function () {
            // function check() {
            //     for (let key in editor.notif) {
            //         let notif = editor.notif[key];
            //         if (!notif) {
            //             load(key);
            //             return;
            //         }
            //     }
            // }
            //
            // function load(name) {
            //     let image = new Image();
            //     let canvas = document.createElement('canvas');
            //     let ctx = canvas.getContext('2d');
            //
            //     image.src = chrome.runtime.getURL('images/video/notif_' + name + '.svg');
            //     image.crossOrigin = "Anonymous";
            //     image.onload = function () {
            //         canvas.width = image.width;
            //         canvas.height = image.height;
            //         ctx.clearRect(0, 0, image.width, image.height);
            //         ctx.drawImage(image, 0, 0, image.width, image.height);
            //         try {
            //             editor.notif[name] = canvas.toDataURL();
            //             check && check();
            //         } catch (e) {
            //             console.error('not load notif', e);
            //             // window.location.reload(false);
            //         }
            //     };
            // }
            //
            // check();
        },
        init: function (container) {
            !editor.canvas.common.container && (editor.canvas.common.container = $(container));
            editor.canvas.common.width = $(container).width();
            editor.canvas.common.height = $(container).height();

            editor.canvas.background.canvas = $(document.createElement('canvas'))
                .attr('width', editor.canvas.common.width)
                .attr('height', editor.canvas.common.height)
                .css({width: editor.canvas.common.width, height: editor.canvas.common.height, position: 'absolute', top: '0', left: '0', zIndex: '0'});

            editor.canvas.animate.canvas = $(document.createElement('canvas'))
                .attr('width', editor.canvas.common.width)
                .attr('height', editor.canvas.common.height)
                .css({width: editor.canvas.common.width, height: editor.canvas.common.height, position: 'absolute', top: '0', left: '0', zIndex: '1'});

            editor.canvas.current.canvas = $(document.createElement('canvas'))
                .attr('width', editor.canvas.common.width)
                .attr('height', editor.canvas.common.height)
                .css({width: editor.canvas.common.width, height: editor.canvas.common.height, position: 'absolute', top: '0', left: '0', zIndex: '2'});

            editor.canvas.background.ctx = editor.canvas.background.canvas[0].getContext('2d');
            editor.canvas.animate.ctx = editor.canvas.animate.canvas[0].getContext('2d');
            editor.canvas.current.ctx = editor.canvas.current.canvas[0].getContext('2d');

            editor.canvas.common.container.append(editor.canvas.background.canvas);
            editor.canvas.common.container.append(editor.canvas.animate.canvas);
            editor.canvas.common.container.append(editor.canvas.current.canvas);
            editor.canvas.common.container.addClass('events');

            editor.event.on();
            // editor.preloader();
            return container;
        },
        clear: function (container) {
            if (!editor.canvas.common.container) return container;
            editor.event.off();

            editor.canvas.common.container.removeClass('events').empty();
            editor.canvas.background = {};
            editor.canvas.animate = {};
            editor.canvas.current = {};
            editor.history.memory = [];

            return container;
        },
        event: {
            on: function () {
                if (!$('.nimbus-is-editor').length) {
                    $('body')
                        .on("mousedown", editor.draw.start)
                        .on("mousemove", editor.draw.move)
                        .on("mouseup", editor.draw.end)
                        .addClass('nimbus-is-editor');
                }

                editor.canvas.common.container.on('nimbus-editor-active-tools', function (e, tool) {
                    if (editor.requestAnimationId) {
                        window.cancelAnimationFrame(editor.requestAnimationId);
                        editor.requestAnimationId = null;
                    }

                    if (editor.draw[tool] !== undefined && tool !== 'clearAll') {
                        if (tool === 'cursorDefault' || tool === 'cursorShadow' || tool === 'cursorRing') {
                            $('body').css({'user-select': 'auto'});
                            editor.canvas.common.container.addClass('events')
                        } else {
                            $('body').css({'user-select': 'none'});
                            editor.canvas.common.container.removeClass('events')
                        }
                        if (tool === 'cursorNone') {
                            $('body').css({cursor: 'none'});
                        } else if (tool === 'cursorShadow') {
                            $('body').css({cursor: 'none'});
                            editor.draw.cursorShadow(editor.draw.startPoint, editor.getPosition(e));
                        } else {
                            $('body').css({cursor: 'auto'});
                        }

                        editor.currentTools = tool;
                        editor.canvas.common.container.trigger('nimbus-editor-change', [editor.currentTools, editor.colorTools[editor.currentTools]]);
                        editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                    } else if (tool === 'clearAll') {
                        editor.draw.clearAll();
                    } else if (!tool) {
                        editor.currentTools = false;
                        console.error('Tool clear!')
                    } else {
                        console.error('Tool not found!')
                    }

                });

                editor.canvas.common.container.on('nimbus-editor-active-color', function (e, color) {
                    if (editor.colorTools[editor.currentTools]) {
                        editor.colorTools[editor.currentTools] = color;
                        editor.canvas.common.container.trigger('nimbus-editor-change', [editor.currentTools, editor.colorTools[editor.currentTools]]);
                    } else {
                        console.error('Can not set color!')
                    }
                });

                editor.canvas.common.container.on('nimbus-editor-remove-old', function (e) {
                    if (editor.history.memory.length) {
                        editor.history.remove(0);
                        editor.history.draw();
                    }
                });
            },
            off: function () {
                // $(document)
                //     .off("mousedown", '.nimbus-is-editor', editor.draw.start)
                //     .off("mousemove", '.nimbus-is-editor', editor.draw.move)
                //     .off("mouseup", '.nimbus-is-editor', editor.draw.end);

                $('body').css({cursor: 'auto'});

                editor.canvas.common.container.off('nimbus-editor-active-tools');
                editor.canvas.common.container.off('nimbus-editor-active-color');
                editor.canvas.common.container.off('nimbus-editor-remove-old');

                console.log(editor.requestAnimationId)
                if (editor.requestAnimationId) {
                    window.cancelAnimationFrame(editor.requestAnimationId);
                    editor.requestAnimationId = null;
                }
            }
        },
        getPosition: function (e) {
            const a = editor.canvas.current.canvas[0].getBoundingClientRect();
            return {
                x: e.clientX - a.left,
                y: e.clientY - a.top
            };
        },
        draw: {
            startPoint: {},
            is_dom: function (e) {
                if (!$('.nsc-video-editor').is(':visible')) return true;
                return $(e.target).closest('.nsc-panel-compact').length && $(e.target).hasClass('nsc-panel-compact').length && $(e.target).closest('.nsc-content-camera').length && $(e.target).hasClass('nsc-content-camera')
            },
            start: function (e) {
                if (!editor.draw.is_dom(e)) {
                    editor.isDraw = true;
                    editor.draw.startPoint = editor.getPosition(e);

                    switch (editor.currentTools) {
                        case 'cursorRing':
                        case 'notifGreen':
                        case 'notifRed':
                        case 'notifBlue':
                            editor.draw[editor.currentTools](editor.draw.startPoint, editor.getPosition(e));
                            break;
                    }
                }
            },
            move: function (e) {
                if (!editor.draw.is_dom(e)) {
                    if (editor.isDraw && editor.currentTools) {
                        editor.draw[editor.currentTools](editor.draw.startPoint, editor.getPosition(e));
                    }

                    switch (editor.currentTools) {
                        case 'cursorShadow':
                            editor.draw[editor.currentTools](editor.draw.startPoint, editor.getPosition(e));
                            break;
                    }
                }
            },
            end: function (e) {
                if (!editor.draw.is_dom(e)) {
                    editor.isDraw = false;
                    editor.draw.startPoint = {};
                    switch (editor.currentTools) {
                        case 'pen':
                        case 'square':
                        case 'arrow':
                        case 'notifGreen':
                        case 'notifRed':
                        case 'notifBlue':
                        case 'blur':
                            editor.history.save();
                            editor.canvas.background.ctx.drawImage(editor.canvas.current.canvas[0], 0, 0);
                            editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                            break;
                    }
                }
            },
            cursorDefault: function (start, end) {
                // var image = new Image();
                // image.src = "./images/video/ic-cursor.svg";
                // image.onload = function () {
                //     editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                //     editor.canvas.current.ctx.drawImage(image, end.x, end.y);
                // };
            },
            cursorNone: function (start, end) {

            },
            cursorRing: function (start, end) {
                let ringCounter = 0, ringRadius;

                function easeInCubic(now, startValue, deltaValue, duration) {
                    return deltaValue * (now /= duration) * now * now + startValue;
                }

                function easeOutCubic(now, startValue, deltaValue, duration) {
                    return deltaValue * ((now = now / duration - 1) * now * now + 1) + startValue;
                }

                function animate() {
                    if (ringCounter > 200) {
                        return;
                    }

                    editor.requestAnimationId = window.requestAnimationFrame(animate);

                    if (ringCounter < 100) {
                        ringRadius = easeInCubic(ringCounter, 0, 20, 100);
                    } else {
                        ringRadius = easeOutCubic(ringCounter - 100, 20, -20, 100);
                    }

                    editor.canvas.animate.ctx.lineWidth = 1;
                    editor.canvas.animate.ctx.strokeStyle = 'red';
                    editor.canvas.animate.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                    editor.canvas.animate.ctx.beginPath();
                    editor.canvas.animate.ctx.arc(end.x, end.y, ringRadius, 0, Math.PI * 2);
                    editor.canvas.animate.ctx.stroke();
                    ringCounter += 5;
                }

                editor.requestAnimationId = window.requestAnimationFrame(animate);
            },
            cursorShadow: function (start, end) {
                editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                editor.canvas.current.ctx.globalAlpha = 0.6;
                editor.canvas.current.ctx.fillStyle = '#000';
                editor.canvas.current.ctx.fillRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                editor.canvas.current.ctx.globalAlpha = 1;
                editor.canvas.current.ctx.beginPath();
                editor.canvas.current.ctx.globalCompositeOperation = 'destination-out';
                editor.canvas.current.ctx.filter = "blur(10px)";
                editor.canvas.current.ctx.arc(end.x, end.y, 75, 0, 2 * Math.PI, true);
                editor.canvas.current.ctx.fill();
                editor.canvas.current.ctx.globalCompositeOperation = 'source-over';
                editor.canvas.current.ctx.filter = "none";
            },
            clear: function (start, end) {
                editor.canvas.background.ctx.beginPath();
                editor.canvas.background.ctx.globalCompositeOperation = 'destination-out';
                editor.canvas.background.ctx.arc(end.x, end.y, 20, 0, Math.PI * 2, true);
                editor.canvas.background.ctx.fill();
                editor.canvas.background.ctx.globalCompositeOperation = 'source-over';
            },
            clearAll: function (start, end) {
                editor.history.removeAll();
                editor.canvas.background.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
            },
            notif: function (start, end, name) {
                let image = new Image();
                const ratio = 2;
                image.src = editor.notif[name];
                image.onload = function () {
                    editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                    editor.canvas.current.ctx.drawImage(
                        image, 0, 0, image.width, image.height,
                        Math.round(end.x - image.width / ratio / 2),
                        Math.round(end.y - image.height / ratio / 2),
                        Math.round(image.width / ratio),
                        Math.round(image.height / ratio)
                    );
                };
            },
            notifGreen: function (start, end) {
                editor.draw.notif(start, end, 'green');
            },
            notifRed: function (start, end) {
                editor.draw.notif(start, end, 'red');
            },
            notifBlue: function (start, end) {
                editor.draw.notif(start, end, 'blue');
            },
            pen: function (start, end) {
                editor.canvas.current.ctx.lineWidth = 3;
                editor.canvas.current.ctx.strokeStyle = editor.colorTools.pen;
                editor.canvas.current.ctx.beginPath();
                editor.canvas.current.ctx.moveTo(start.x, start.y);
                editor.canvas.current.ctx.lineTo(end.x, end.y);
                editor.canvas.current.ctx.stroke();
                editor.draw.startPoint = {x: end.x, y: end.y};
            },
            arrow: function (start, end) {
                let dx = start.x - end.x;
                let dy = start.y - end.y;
                let angle = Math.atan2(dy, dx) + Math.PI;
                let head_length = 15;
                editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                editor.canvas.current.ctx.lineWidth = 3;
                editor.canvas.current.ctx.strokeStyle = editor.colorTools.arrow;
                editor.canvas.current.ctx.fillStyle = editor.colorTools.arrow;
                editor.canvas.current.ctx.beginPath();
                editor.canvas.current.ctx.moveTo(start.x, start.y);
                editor.canvas.current.ctx.lineTo(end.x, end.y);
                editor.canvas.current.ctx.stroke();
                editor.canvas.current.ctx.moveTo(end.x, end.y);
                editor.canvas.current.ctx.lineTo(end.x - head_length * Math.cos(angle - Math.PI / 7), end.y - head_length * Math.sin(angle - Math.PI / 7));
                editor.canvas.current.ctx.lineTo(end.x - head_length * Math.cos(angle + Math.PI / 7), end.y - head_length * Math.sin(angle + Math.PI / 7));
                editor.canvas.current.ctx.lineTo(end.x, end.y);
                editor.canvas.current.ctx.lineTo(end.x - head_length * Math.cos(angle - Math.PI / 7), end.y - head_length * Math.sin(angle - Math.PI / 7));
                editor.canvas.current.ctx.fill();
            },
            square: function (start, end) {
                editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                editor.canvas.current.ctx.beginPath();
                editor.canvas.current.ctx.lineWidth = 3;
                editor.canvas.current.ctx.strokeStyle = editor.colorTools.square;
                editor.canvas.current.ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
            },
            blur: function (start, end) {
                editor.canvas.current.ctx.clearRect(0, 0, editor.canvas.common.width, editor.canvas.common.height);
                editor.canvas.current.ctx.globalAlpha = 0.95;
                editor.canvas.current.ctx.filter = "blur(15px)";
                editor.canvas.current.ctx.fillStyle = editor.colorTools.blur;
                editor.canvas.current.ctx.fillRect(start.x, start.y, end.x - start.x, end.y - start.y);
                editor.canvas.current.ctx.globalAlpha = 1;
                editor.canvas.current.ctx.filter = "none";


            }
        }
    };

    $.fn.videoEditor = function (method) {
        if (editor[method]) {
            return editor[method](this);
        } else if (!method) {
            return editor.init(this);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.videoEditor');
        }
    };

})();