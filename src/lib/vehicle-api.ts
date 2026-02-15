
export interface VehicleData {
    make: string;
    model: string;
    year: number;
    stolen_status: string; // 'Stolen' | 'Clear'
    finance_status: string; // 'Encumbered' | 'Clear'
    written_off_status: string; // 'Written-off' | 'Clear'
    registration_expiry: string; // ISO date or 'Expired'
}

/**
 * Mocks a call to a vehicle data provider (PPSR/NEVDIS).
 * Deterministic based on the last char of VIN/Plate.
 */
export async function fetchVehicleData(identifier: string): Promise<VehicleData> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const cleanId = identifier.toUpperCase().trim();
    const lastChar = cleanId.slice(-1);

    // Default clean vehicle
    const baseVehicle: VehicleData = {
        make: 'TOYOTA',
        model: 'COROLLA',
        year: 2022,
        stolen_status: 'Clear',
        finance_status: 'Clear',
        written_off_status: 'Clear',
        registration_expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString().split('T')[0], // +6 months
    };

    // Mock scenarios based on input
    if (lastChar === 'S') {
        return { ...baseVehicle, stolen_status: 'Stolen', make: 'SUBARU', model: 'WRX', year: 2019 };
    }
    if (lastChar === 'F') {
        return { ...baseVehicle, finance_status: 'Encumbered', make: 'FORD', model: 'RANGER', year: 2023 };
    }
    if (lastChar === 'W') {
        return { ...baseVehicle, written_off_status: 'Written-off', make: 'HOLDEN', model: 'COMMODORE', year: 2015 };
    }
    if (lastChar === 'X') {
        return {
            ...baseVehicle,
            stolen_status: 'Stolen',
            finance_status: 'Encumbered',
            written_off_status: 'Written-off',
            make: 'TESLA',
            model: 'MODEL 3',
            year: 2024
        };
    }

    return baseVehicle;
}
