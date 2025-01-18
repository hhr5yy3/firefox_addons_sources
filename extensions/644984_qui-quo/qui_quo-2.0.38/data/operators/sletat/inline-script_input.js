{
    const date = JSON.parse(sessionStorage.getItem('date_q'));
    const name = sessionStorage.getItem('name_q');
    ASPx.GetControlCollection().Get(name).SetValue(new Date(parseInt(date[3], 10),
        parseInt(date[2], 10) - 1,
        parseInt(date[1], 10)))
}
