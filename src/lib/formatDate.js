// PARAMETER : "YYYY-MM-DD" INTO "DD MMMM YYYY" 
// "2024-09-25" -> "25 September 2024"

export default function formatDate(dateStr) {
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const date = new Date(dateStr);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}