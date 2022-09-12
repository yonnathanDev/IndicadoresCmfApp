
export interface Indicador {
    Indicador: IndicadorDetalle[];
}

export interface IndicadorDetalle {
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

export interface option {
    name: string;
    category: number;
    type: string;
    year: string;
    month: string;
    day: string;
    unidadMedida: string;
  }