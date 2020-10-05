module Dynamic: ActivatableSkill.Dynamic;

module Static: {
  type t = {
    id: int,
    name: string,
    nameByTradition: Ley_IntMap.t(string),
    check: SkillCheck.t,
    effect: string,
    duration: ActivatableSkill.MainParameter.t,
    cost: ActivatableSkill.MainParameter.t,
    skill: option(int),
    musicTraditions: Ley_IntSet.t,
    property: int,
    ic: IC.t,
    src: list(PublicationRef.t),
    errata: list(Erratum.t),
  };

  module Decode: {let assoc: Decoder.assocDecoder(t);};
};
