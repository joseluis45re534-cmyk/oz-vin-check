
export interface VehicleData {
    vin: string;
    make: string;
    model: string;
    year: number;
    colour: string;
    body_type: string;
    engine_number: string;
    registration: {
        plate: string;
        state: string;
        expiry: string;
    };
    stolen_status: 'Clear' | 'Stolen';
    written_off_status: 'Clear' | 'Written-Off' | 'Repairable Write-Off';
    finance_status: 'Clear' | 'Encumbered';
}

export async function fetchVehicleData(identifier: string): Promise<VehicleData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const cleanId = identifier.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const lastChar = cleanId.slice(-1);

    const baseVehicle = {
        vin: cleanId.length === 17 ? cleanId : `6T9P0...${cleanId.slice(0, 5)}`,
        make: 'TOYOTA',
        model: 'COROLLA',
        year: 2021,
        colour: 'WHITE',
        body_type: 'SEDAN',
        engine_number: '2ZR' + Math.floor(Math.random() * 100000),
        registration: {
            plate: cleanId.length < 10 ? cleanId : 'ABC-123',
            state: 'NSW',
            expiry: '2025-12-31',
        },
        stolen_status: 'Clear' as const,
        written_off_status: 'Clear' as const,
        finance_status: 'Clear' as const,
    };

    // Deterministic Mock Logic based on last character
    if (lastChar === 'S') return { ...baseVehicle, stolen_status: 'Stolen', make: 'SUBARU', model: 'WRX', year: 2019 };
    if (lastChar === 'W') return { ...baseVehicle, written_off_status: 'Written-Off', make: 'HOLDEN', model: 'COMMODORE', year: 2015 };
    if (lastChar === 'F') return { ...baseVehicle, finance_status: 'Encumbered', make: 'FORD', model: 'RANGER', year: 2023 };

    return baseVehicle;
}
