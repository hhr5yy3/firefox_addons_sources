import React, { useRef, useImperativeHandle, useCallback, forwardRef } from "react";
import { elementFactory } from "../../index";

export type CardType = "wide" | "narrow";

export interface CustomCardBaseProps extends React.ComponentProps<ReturnType<typeof elementFactory>> {
	updatePosition?: (container: HTMLElement | null) => void;
}

export interface CardBaseRef {
	updatePosition: () => void;
	updateCardType: (cardType: CardType) => void;
}

const LtCompCardBase = elementFactory("comp-card-base");

const CustomCardBase = forwardRef<CardBaseRef, React.PropsWithChildren<CustomCardBaseProps>>(function CardBase(
	{ updatePosition, children, ...containerProps },
	ref
) {
	const cardBaseRef = useRef<HTMLElement>(null);

	const updateCardPosition = useCallback(() => {
		updatePosition?.(cardBaseRef.current);
	}, [updatePosition]);

	useImperativeHandle<object, CardBaseRef>(
		ref,
		() => ({
			updatePosition: updateCardPosition,
			updateCardType: () => undefined,
		}),
		[updateCardPosition]
	);

	return (
		<LtCompCardBase {...containerProps} ref={cardBaseRef}>
			{children}
		</LtCompCardBase>
	);
});

export default CustomCardBase;
