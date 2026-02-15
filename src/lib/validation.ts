
/**
 * Validates an Australian VIN.
 * - Must be exactly 17 characters.
 * - Must not contain I, O, or Q.
 */
export function validateVIN(vin: string): { isValid: boolean; error?: string } {
    const cleanVin = vin.toUpperCase().trim();

    if (cleanVin.length !== 17) {
        return { isValid: false, error: 'VIN must be exactly 17 characters.' };
    }

    if (/[IOQ]/.test(cleanVin)) {
        return { isValid: false, error: 'VIN cannot contain characters I, O, or Q.' };
    }

    // Basic alphanumeric check
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVin)) {
        return { isValid: false, error: 'VIN contains invalid characters.' };
    }

    return { isValid: true };
}

export function validatePlate(plate: string): { isValid: boolean; error?: string } {
    const cleanPlate = plate.toUpperCase().trim();
    if (cleanPlate.length < 2 || cleanPlate.length > 8) {
        return { isValid: false, error: 'Plate must be between 2 and 8 characters.' };
    }
    if (!/^[A-Z0-9]+$/.test(cleanPlate)) {
        return { isValid: false, error: 'Plate must be alphanumeric.' };
    }
    return { isValid: true };
}
