import React, { useEffect, useRef } from "react";
import { elementFactory } from "../../index";
import { Div, Span } from "@advanced-toolbox/elements";
import { classes } from "../../../common/utils";
import { EnvironmentAdapter } from "../../../common/environmentAdapter";
import { ConfigKey, ExtnConfig } from "../../../init/config";
import { ToolboxCapturedEvent } from "@advanced-toolbox/types";
import { i18nManager } from "../../../common/i18nManager";

const LTCompToolboxOnboarding = elementFactory("comp-toolbox-onboarding");
const LTCompToolboxOnboardingContentWrapper = elementFactory("comp-toolbox-onboarding-content-wrapper");
const LTCompToolboxOnboardingContent = elementFactory("comp-toolbox-onboarding-content");
const LTCompToolboxOnboardingContentFooter = elementFactory("comp-toolbox-onboarding-content-footer");

export type OnboardingThemeSettings = {
	color: string;
	ctaBorderSize: string; // css border size
};

interface Props {
	containerRef: React.RefObject<HTMLDivElement>;
	onFinishOnboardingClick: (e: ToolboxCapturedEvent<Event>) => void;
	onCloseToolboxClick: () => void;
	themeSettings: OnboardingThemeSettings;
}

const ToolboxOnboardingContent: React.FC<Props> = ({
	containerRef,
	onFinishOnboardingClick,
	onCloseToolboxClick,
	themeSettings,
}) => {
	const { current: i18n } = useRef<
		Record<"toolboxOnboardingBody" | "toolboxOnboardingCta" | "toolboxOnboardingHeading", string>
	>({
		toolboxOnboardingBody: i18nManager.getMessage("toolboxOnboardingMessage"),
		toolboxOnboardingCta: i18nManager.getMessage("toolboxOnboardingCtaLabel"),
		toolboxOnboardingHeading: i18nManager.getMessage("toolboxOnboardingHeading"),
	});

	useEffect(() => {
		if (!containerRef) {
			return;
		}
		containerRef.current?.style.setProperty("--lt-toolbox-onboarding-color", themeSettings.color);
		containerRef.current?.style.setProperty("--lt-toolbox-onboarding-border-radius", themeSettings.ctaBorderSize);
		const config = ExtnConfig.getInstance().get(ConfigKey.LOLLIPOP_CONFIG);
		const onboardingImagePath = EnvironmentAdapter.getURL(config.ONBOARDING_IMAGE_PATH);
		fetch(onboardingImagePath)
			.then((response) => response.text())
			.then((svgContent) => {
				const svgDataUri = `data:image/svg+xml;base64,${btoa(svgContent)}`;
				containerRef.current?.style.setProperty("--lt-toolbox-onboarding-image", `url(${svgDataUri})`);
			});
	}, [containerRef]);

	return (
		<LTCompToolboxOnboarding ref={containerRef}>
			<LTCompToolboxOnboardingContentWrapper>
				<Div className="lt-toolbox-onboarding__logo" />
				<LTCompToolboxOnboardingContent>
					<Div className={classes("lt-toolbox-onboarding__heading")}>{i18n.toolboxOnboardingHeading}</Div>
					<Div className={classes("lt-toolbox-onboarding__text")}>{i18n.toolboxOnboardingBody}</Div>
					<Span className={classes("lt-toolbox-onboarding__cta")} onClick={onFinishOnboardingClick}>
						{i18n.toolboxOnboardingCta}
					</Span>
				</LTCompToolboxOnboardingContent>
			</LTCompToolboxOnboardingContentWrapper>
			<LTCompToolboxOnboardingContentFooter>
				<Div className="lt-toolbox-onboarding__footer__cta">Learn more</Div>
				<Div onClick={onCloseToolboxClick}>
					<Span className="lt-toolbox-onboarding__esc__text">Exit </Span>
					<Span className="lt-toolbox-onboarding__esc">ESC</Span>
				</Div>
			</LTCompToolboxOnboardingContentFooter>
		</LTCompToolboxOnboarding>
	);
};

export default ToolboxOnboardingContent;
