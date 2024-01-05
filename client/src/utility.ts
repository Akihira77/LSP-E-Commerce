export function formatCurrency(value: unknown) {
    const formattedBalance = new Intl.NumberFormat("id-ID").format(Number(value));

    return `Rp ${formattedBalance}`;
}