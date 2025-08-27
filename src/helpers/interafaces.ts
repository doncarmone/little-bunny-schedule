export interface Years {
    [year: string]: Schedule[];
}

export interface Schedule {
    id: string;
    shift: string;
    activity: Activity;
    colleagues: Colleague[];
    start: string;
    finish: string;
}

export enum Activity {
    MaterialDeEmpaque = "Material de Empaque",
    Prepraración = "Prepraración",
    Siembra = "Siembra",
}

export interface Colleague {
    name: Name;
    activity: Activity;
}

export enum Name {
    AraceliA = "Araceli A.",
    AraceliV = "Araceli V.",
    Johana = "Johana",
    Liz = "Liz",
    Rafael = "Rafael",
}
