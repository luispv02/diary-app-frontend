export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        timeZone: 'UTC', 
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};