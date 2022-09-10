export interface Dolar {
    Dolares: Dolare[];
}

export interface Dolare {
    Valor: string;
    Fecha: Date;
}


export interface Uf {
    UFs: UFElement[];
}

export interface UFElement {
    Valor: string;
    Fecha: Date;
}

export interface Indicador {
    Indicador: IndicadorDetalle[];
}

export interface IndicadorDetalle {
    Valor: string;
    Fecha: Date;
}

export interface IPC {
    IPCs: IPCElement[];
}

export interface IPCElement {
    Valor: string;
    Fecha: Date;
}

export interface Indicadores {
    name: string;
    categoria: number
}

export interface intIndicadores {
    name: string;
    category: number;
    type: string;
    measureUnit: string;
    icon: string;
}