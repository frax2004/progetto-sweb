
export namespace models {
  export interface ApiReference {
    index: string;
    name: string;
    url: string;
    note?: string;
  }

  export enum SuccessType {
    none,
    half,
    other,
  }

  export interface DifficultyClass {
    dc_type: string;
    dc_value?: number;
    success_type?: SuccessType;
  }

  export interface Damage {
    damage_type: string;
    damace_dice: string;
    dc?: string;
  }

  export enum AreaOfEffectType {
    sphere,
    cube,
    cylinder,
    line,
    cone,
  }
  
  export interface AreaOfEffect {
    size: number;
    type: AreaOfEffectType;
  }

  export interface Choice {
    desc?: string;
    choose: number;
    type?: string;
    opt_id: number;
  }

  export interface String {
    string: string;
  }

  export interface DamageArray {
    
  }

  export interface MagicSchool {
    index: string;
    name: string;
    description: string;
    url: string;
  }

}