{
    if ( sessionStorage.getItem('select_set_q') === 'true' ) {
        ASPx.ETextChanged('CitizenshipCountryId')
        sessionStorage.removeItem('select_set_q')
    } else {
        const index = sessionStorage.getItem('index_q');
        const name = sessionStorage.getItem('name_q');
        ASPx.GetControlCollection().Get(name).SelectIndex(index)

        sessionStorage.removeItem('index_q')
        sessionStorage.removeItem('name_q')
    }
}
