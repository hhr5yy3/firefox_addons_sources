import React, { createRef, forwardRef } from "react";
import EditorCard, { type Props as EditorCardProps } from "../../components/editor-card/editor-card";
import LTReact, { type ReactComponentResult } from "../../index";
import type { UsePropsByModeFn } from "../../components/editor-card/editor-card";
import type { CardBaseRef } from "../../components/card-base/card-base";
import CustomEditorCard from "../../components/editor-card/custom-editor-card";

// Simply re-exporting under a different name doesn't work somehow...
export type UpdateContentFn = UsePropsByModeFn;

export type { ChangeLanguageAction, ChangeLanguageLabelId, ErrorFix } from "../../components/error-content/types";

const EditorCardView = forwardRef<CardBaseRef, EditorCardProps>(function EditorCardView(props, cardBaseRef) {
	if (props.customEditorCard) {
		return <CustomEditorCard {...props} ref={cardBaseRef} />;
	} else {
		return <EditorCard {...props} ref={cardBaseRef} />;
	}
});

EditorCardView.displayName = "EditorCard";

export default async function createEditorCard(
	root: HTMLElement,
	props: EditorCardProps,
	cardBaseRef = createRef<CardBaseRef>()
): ReactComponentResult {
	return await LTReact.createView(root, EditorCardView, Object.assign(props, { ref: cardBaseRef, root }));
}
