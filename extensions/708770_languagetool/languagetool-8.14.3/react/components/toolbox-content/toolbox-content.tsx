import React, { useEffect, useState, useRef } from "react";
import { AdvancedToolbox } from "@advanced-toolbox/toolbox";

import type {
	ToolboxApplyEvent,
	ToolboxConfig,
	ToolboxFocusMode,
	ToolboxTextContext,
	ToolboxTextSelectionType,
	ToolboxKeyboardEventDetail,
	ToolboxCompositionEventDetail,
	ToolboxMouseEventDetail,
} from "@advanced-toolbox/types";
import { shouldPreventKeyboardEventDefault, bindCompositionFlow } from "@advanced-toolbox/utils";
import { elementFactory, useStorageContext } from "../../index";
import { classes } from "../../../common/utils";
import { AdvancedToolboxAdapter } from "../../../common/advancedToolboxAdapter";
import ToolboxOnboardingContent, { OnboardingThemeSettings } from "./toolbox-onboarding";
import { ConfigKey, ExtnConfig } from "../../../init/config";

const extnPrefix = ExtnConfig.getInstance().get(ConfigKey.EXTN_PREFIX);

/**
 * Names of fired events.
 */
export const ToolboxEventNames = {
	turnOffLollipop: `${extnPrefix}-message.lollipop-turn-off`,
};

export interface Props {
	config: ToolboxConfig;
	textContext: ToolboxTextContext;
	showRuleId: boolean;
	textfieldElement: HTMLElement;
	isIdle: boolean;
	hasDarkBackground: boolean;
	focusMode: ToolboxFocusMode | undefined;
	close: () => void;
	onApply: (event: ToolboxApplyEvent) => void;
	setTextHighlight: (type: ToolboxTextSelectionType, range: [number, number]) => void;
	removeTextHighlight: () => void;
}

const LTCompToolboxContent = elementFactory("comp-toolbox-content");

const usePropagateKeyboardEvents = (toolbox: AdvancedToolbox | null, textField: HTMLElement) => {
	useEffect(() => {
		if (!toolbox) {
			return;
		}

		let timeoutId: number | undefined;
		const handleKeyUpOnce = (e: KeyboardEvent) => {
			e.stopImmediatePropagation();
			clearTimeout(timeoutId);
			timeoutId = undefined;
		};
		const unbindKeyUpOnceListener = () => {
			textField.ownerDocument.removeEventListener("keyup", handleKeyUp, { capture: true });
			timeoutId = undefined;
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			// https://bugzil.la/354358
			if (e.isComposing || e.keyCode === 229) {
				return;
			}

			e.stopImmediatePropagation();
			if (shouldPreventKeyboardEventDefault(e)) {
				e.preventDefault();
			}

			const detail: ToolboxKeyboardEventDetail = {
				isTrusted: e.isTrusted,
				key: e.key,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				ctrlKey: e.ctrlKey,
				view: e.view,
			};
			toolbox.emitKeyboardEvent(detail);

			if (e.key === "Escape") {
				textField.ownerDocument.addEventListener("keyup", handleKeyUpOnce, { once: true, capture: true });
				timeoutId = self.setTimeout(() => unbindKeyUpOnceListener());
			}
		};
		const handleKeyUp = (e: KeyboardEvent) => {
			e.stopImmediatePropagation();
			e.preventDefault();
		};
		const unbindCompositionFlow = bindCompositionFlow(textField, (partialChar) => {
			const detail: ToolboxCompositionEventDetail = { partialChar };

			toolbox.emitCompositionEvent(detail);
		});
		textField.ownerDocument.addEventListener("keydown", handleKeyDown, true);
		textField.ownerDocument.addEventListener("keyup", handleKeyUp, true);

		return () => {
			unbindCompositionFlow();
			textField.ownerDocument.removeEventListener("keydown", handleKeyDown, true);
			textField.ownerDocument.removeEventListener("keyup", handleKeyUp, true);
		};
	}, [toolbox, textField]);
};

const collectMouseEventDetail = (e: MouseEvent, target: Element) => {
	const detail: ToolboxMouseEventDetail = {
		button: e.button,
		target: target,
		x: e.x,
		y: e.y,
	};
	return detail;
};

const useFencePropagateAndMouseEventsForOnboarding = (onboardingContent: React.RefObject<HTMLElement>) => {
	useEffect(() => {
		if (!onboardingContent.current) {
			return;
		}
		const mount = onboardingContent.current;
		const doc = mount.ownerDocument;

		const fenceEvent = (e: Event) => AdvancedToolboxAdapter.doFenceMouseEvent(e, mount);

		doc.addEventListener("mousedown", fenceEvent, true);
		doc.addEventListener("click", fenceEvent, true);
		return () => {
			doc.removeEventListener("mousedown", fenceEvent, true);
			doc.removeEventListener("click", fenceEvent, true);
		};
	}, [onboardingContent]);
};

const useFencePropagateAndMouseEvents = (
	toolbox: AdvancedToolbox | null,
	toolboxContent: React.RefObject<HTMLElement>
) => {
	useEffect(() => {
		if (!toolbox || !toolboxContent.current) {
			return;
		}

		const mount = toolboxContent.current;
		const doc = mount.ownerDocument;
		const fenceEvent = (e: Event) => AdvancedToolboxAdapter.doFenceMouseEvent(e, mount);
		const handleMouseDown = (e: MouseEvent) => {
			const target = fenceEvent(e);
			if (target) {
				toolbox.emitMouseEvent("mousedown", collectMouseEventDetail(e, target));
			}
		};
		const handleMouseMove = (e: MouseEvent) => {
			const target = fenceEvent(e);
			if (target) {
				toolbox.emitMouseEvent("mousemove", collectMouseEventDetail(e, target));
			}
		};
		const handleMouseUp = (e: MouseEvent) => {
			const target = fenceEvent(e);
			if (target) {
				toolbox.emitMouseEvent("mouseup", collectMouseEventDetail(e, target));
			}
		};

		doc.addEventListener("mousedown", handleMouseDown, true);
		doc.addEventListener("mousemove", handleMouseMove, true);
		doc.addEventListener("mouseup", handleMouseUp, true);
		doc.addEventListener("click", fenceEvent, true);

		return () => {
			doc.removeEventListener("mousedown", handleMouseDown, true);
			doc.removeEventListener("mousemove", handleMouseMove, true);
			doc.removeEventListener("mouseup", handleMouseUp, true);
			doc.removeEventListener("click", fenceEvent, true);
		};
	}, [toolbox, toolboxContent]);
};

const ToolboxContent: React.FC<Props> = ({
	config,
	textContext,
	textfieldElement,
	hasDarkBackground,
	focusMode,
	isIdle,
	close,
	onApply,
	setTextHighlight,
	removeTextHighlight,
}) => {
	const storageController = useStorageContext();
	const [showOnboarding, setShowOnboarding] = useState(!storageController.getUIState().hasSeenLollipopOnboarding);
	const toolboxContent = useRef<HTMLElement>(null);
	const onboardingRef = React.createRef<HTMLDivElement>();
	const [toolbox, setToolbox] = useState<AdvancedToolbox | null>(null);
	const [view, setView] = useState<React.FunctionComponentElement<unknown> | null>(null);

	useEffect(() => {
		const instance = AdvancedToolbox.instantiate({
			...config,
		});
		const toolboxView = instance.createView({
			context: textContext,
			colorScheme: hasDarkBackground ? "dark" : "light",
			focusMode,
			close,
			onApply,
			setTextHighlight,
			removeTextHighlight,
		});
		setView(toolboxView);
		setToolbox(instance);

		return () => {
			removeTextHighlight();
			setToolbox(null);
			setView(null);
		};
	}, [
		config,
		close,
		onApply,
		setTextHighlight,
		removeTextHighlight,
		textfieldElement,
		hasDarkBackground,
		textContext,
		focusMode,
	]);

	usePropagateKeyboardEvents(toolbox, textfieldElement);
	useFencePropagateAndMouseEvents(toolbox, toolboxContent);
	useFencePropagateAndMouseEventsForOnboarding(onboardingRef);

	const finaliseOnboarding = () => {
		storageController.updateUIState({ hasSeenLollipopOnboarding: true });
		setShowOnboarding(false);
	};

	if (showOnboarding) {
		const extnConfig = ExtnConfig.getInstance().get(ConfigKey.LOLLIPOP_CONFIG);

		const theme: OnboardingThemeSettings = {
			color: hasDarkBackground ? config.theme.dark.accentColorMedium : config.theme.light.accentColorMedium,
			ctaBorderSize: extnConfig.ONBOARDING_BORDER_RADIUS,
		};
		return (
			<ToolboxOnboardingContent
				themeSettings={theme}
				containerRef={onboardingRef}
				onCloseToolboxClick={close}
				onFinishOnboardingClick={finaliseOnboarding}
			/>
		);
	}

	return (
		<LTCompToolboxContent className={classes(isIdle && "lt-toolbox-content--is-idle")} ref={toolboxContent}>
			{view}
		</LTCompToolboxContent>
	);
};

export default ToolboxContent;
