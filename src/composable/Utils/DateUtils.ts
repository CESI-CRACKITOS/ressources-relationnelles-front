function formatDate(dateString : string) {
    const date = new Date(dateString);
        // Then specify how you want your dates to be formatted
    return new Intl.DateTimeFormat('fr-FR', {dateStyle: 'long'}).format(date);
}

export default formatDate