
function copyText(elemId)
{
    const copyText = document.getElementById(elemId);

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");
}