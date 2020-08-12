export class Metric {
    delta: {
        confirmed: number;
        deceased: number;
        migrated: number;
    };
    meta : {
        last_updated: string;
        population: number;
        tested : {
            last_updated: string;
            source: string;
        }
    };
    total : {
        confirmed: number;
        deceased: number;
        migrated: number;
        recovered: number;
        tested: number;
    }
}