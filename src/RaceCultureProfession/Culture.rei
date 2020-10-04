module Dynamic: {type t = int;};

module Static: {
  type frequencyException =
    | Single(int)
    | Group(int);

  type t = {
    id: int,
    name: string,
    language: list(int),
    script: option(list(int)),
    areaKnowledge: string,
    areaKnowledgeShort: string,
    socialStatus: list(int),
    commonMundaneProfessionsAll: bool,
    commonMundaneProfessionsExceptions: option(list(frequencyException)),
    commonMundaneProfessionsText: option(string),
    commonMagicProfessionsAll: bool,
    commonMagicProfessionsExceptions: option(list(frequencyException)),
    commonMagicProfessionsText: option(string),
    commonBlessedProfessionsAll: bool,
    commonBlessedProfessionsExceptions: option(list(frequencyException)),
    commonBlessedProfessionsText: option(string),
    commonAdvantages: list(int),
    commonAdvantagesText: option(string),
    commonDisadvantages: list(int),
    commonDisadvantagesText: option(string),
    uncommonAdvantages: list(int),
    uncommonAdvantagesText: option(string),
    uncommonDisadvantages: list(int),
    uncommonDisadvantagesText: option(string),
    commonSkills: list(int),
    uncommonSkills: list(int),
    commonNames: string,
    culturalPackageApValue: int,
    culturalPackageSkills: Ley_IntMap.t(int),
    src: list(PublicationRef.t),
    errata: list(Erratum.t),
  };

  let decode: list(string) => Json.Decode.decoder(option((int, t)));
};