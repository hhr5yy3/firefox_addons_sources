async function getToursForPopup(checkAvailability = false) {
    const modal = $1('.TVTourCardWindow .TVTourCardWindowInfo, .TVTourCardWindow .TVTourCardInfoRightBlock, .TVMobilePanel .TVTourCardContent');
    if ( modal ) {
        const modalOption = await createModalOption(modal)
        optionPostProcessing(modal, modalOption)
        if ( modalOption ) {
            return modalOption;
        }
    }
}

function isTourForPopupAvailable() {
    const modal = $1('.TVTourCardWindow .TVTourCardWindowInfo, .TVTourCardWindow .TVTourCardInfoRightBlock, .TVMobilePanel .TVTourCardContent')
    return modal && modal.clientHeight > 0;
}
