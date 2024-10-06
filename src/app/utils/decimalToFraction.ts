const gcd = (a: number, b: number): number => {
    return b ? gcd(b, a % b) : a;
}

export const decimalToFraction = (decimal: number): string => {
    const tolerance = 1.0E-6;

    let wholePart = Math.floor(decimal);
    let decimalPart = decimal - wholePart;

    if (Math.abs(decimalPart) < tolerance) {
        return wholePart.toString();
    }

    let numerator = 1;
    let denominator = 1;

    while (Math.abs(decimalPart - Math.round(decimalPart)) > tolerance) {
        decimalPart *= 10;
        denominator *= 10;
    }

    numerator = Math.round(decimalPart);

    const divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;

    if (wholePart === 0) {
        return `${numerator}/${denominator}`;
    } else {
        return `${wholePart} ${numerator}/${denominator}`;
    }
}