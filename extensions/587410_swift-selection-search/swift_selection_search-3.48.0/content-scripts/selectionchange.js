var selectionchange;
(function (selectionchange) {
    const MAC = /^Mac/.test(navigator.platform);
    const MAC_MOVE_KEYS = new Set([65, 66, 69, 70, 78, 80]);
    selectionchange.modifierKey = MAC ? "metaKey" : "ctrlKey";
    let ranges = null;
    function start() {
        ranges = getSelectedRanges();
        document.addEventListener("input", onInput, true);
        document.addEventListener("keydown", onKeyDown, true);
        document.addEventListener("mouseup", onMouseUp, true);
    }
    selectionchange.start = start;
    function stop() {
        ranges = null;
        document.removeEventListener("input", onInput, true);
        document.removeEventListener("keydown", onKeyDown, true);
        document.removeEventListener("mouseup", onMouseUp, true);
    }
    selectionchange.stop = stop;
    class CustomSelectionChangeEvent extends CustomEvent {
    }
    selectionchange.CustomSelectionChangeEvent = CustomSelectionChangeEvent;
    function getSelectedRanges() {
        const selection = document.getSelection();
        const newRanges = [];
        if (selection !== null) {
            for (let i = 0; i < selection.rangeCount; i++) {
                newRanges.push(selection.getRangeAt(i));
            }
        }
        return newRanges;
    }
    function onInput(ev) {
        if (!isInputField(ev.target)) {
            dispatchEventIfSelectionChanged(true, ev, false);
        }
    }
    function onKeyDown(ev) {
        const code = ev.keyCode;
        if ((code === 65 && ev[selectionchange.modifierKey] && !ev.shiftKey && !ev.altKey)
            || (code >= 35 && code <= 40 && ev.shiftKey)
            || (ev.ctrlKey && MAC && MAC_MOVE_KEYS.has(code))) {
            if (!isInputField(ev.target)) {
                setTimeout(() => dispatchEventIfSelectionChanged(true, ev, false), 0);
            }
        }
    }
    function onMouseUp(ev) {
        if (ev.button === 0) {
            setTimeout(() => dispatchEventIfSelectionChanged(isInputField(ev.target), ev, true), 0);
        }
    }
    function dispatchEventIfSelectionChanged(force, ev, isMouse) {
        const newRanges = getSelectedRanges();
        if (force || !areAllRangesEqual(newRanges, ranges)) {
            ranges = newRanges;
            const event = new CustomSelectionChangeEvent("customselectionchange");
            event.altKey = ev.altKey;
            event.isMouse = isMouse;
            event.event = ev;
            setTimeout(() => document.dispatchEvent(event), 0);
        }
    }
    function isInputField(elem) {
        return elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    }
    function areAllRangesEqual(rs1, rs2) {
        if (rs1.length !== rs2.length) {
            return false;
        }
        for (let i = 0; i < rs1.length; i++) {
            const r1 = rs1[i];
            const r2 = rs2[i];
            const areEqual = r1.startContainer === r2.startContainer
                && r1.startOffset === r2.startOffset
                && r1.endContainer === r2.endContainer
                && r1.endOffset === r2.endOffset;
            if (!areEqual) {
                return false;
            }
        }
        return true;
    }
})(selectionchange || (selectionchange = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0aW9uY2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLElBQVUsZUFBZSxDQWtIeEI7QUFsSEQsV0FBVSxlQUFlO0lBRXhCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLDJCQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUV2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFFbEIsU0FBZ0IsS0FBSztRQUNwQixNQUFNLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztRQUM3QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBTGUscUJBQUssUUFLcEIsQ0FBQTtJQUVELFNBQWdCLElBQUk7UUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVB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