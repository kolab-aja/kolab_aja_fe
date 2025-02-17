export default function formatRupiah(amount) {
	const formatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	});
	return formatter.format(amount).replace(",00", ",-");
}
