module IM = Ley_IntMap;

let decodeUI = Messages.Decode.t;

let idName = json =>
  Json.Decode.(json |> field("id", int), json |> field("name", string));

let idNames = json =>
  Json.Decode.(json |> list(idName)) |> Ley_IntMap.fromList;

let decodeFilesOfEntryType = (decoder, fileContents: list(Js.Json.t)) =>
  Ley_List.foldl(
    (mp, fileContent) =>
      decoder(fileContent)
      |> Ley_Option.option(mp, ((parsedKey, parsedValue)) =>
           Ley_IntMap.insert(parsedKey, parsedValue, mp)
         ),
    Ley_IntMap.empty,
    fileContents,
  );

let decodeFiles = (langs, messages, parsedData: Yaml_Parse.t): Static.t => {
  let animalShapes =
    decodeFilesOfEntryType(
      AnimalShape.Decode.assoc(langs),
      parsedData.animalShapes,
    );

  let animalShapePaths =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.animalShapePaths,
    );

  let animalShapeSizes =
    decodeFilesOfEntryType(
      AnimalShape.Size.Decode.assoc(langs),
      parsedData.animalShapeSizes,
    );

  let animistForces =
    decodeFilesOfEntryType(
      AnimistForce.Static.Decode.assoc(langs),
      parsedData.animistForces,
    );

  let arcaneBardTraditions =
    decodeFilesOfEntryType(
      ArcaneTradition.Decode.assoc(langs),
      parsedData.arcaneBardTraditions,
    );

  let arcaneDancerTraditions =
    decodeFilesOfEntryType(
      ArcaneTradition.Decode.assoc(langs),
      parsedData.arcaneDancerTraditions,
    );

  let armorTypes =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.armorTypes,
    );

  let aspects =
    decodeFilesOfEntryType(IdName.Decode.assoc(langs), parsedData.aspects);

  let attributes =
    decodeFilesOfEntryType(
      Attribute.Static.Decode.assoc(langs),
      parsedData.attributes,
    );

  let blessedTraditions =
    decodeFilesOfEntryType(
      BlessedTradition.Decode.assoc(langs),
      parsedData.blessedTraditions,
    );

  let blessings =
    decodeFilesOfEntryType(
      Blessing.Static.Decode.assoc(langs),
      parsedData.blessings,
    );

  let brews =
    decodeFilesOfEntryType(IdName.Decode.assoc(langs), parsedData.brews);

  let cantrips =
    decodeFilesOfEntryType(
      Cantrip.Static.Decode.assoc(langs),
      parsedData.cantrips,
    );

  let combatSpecialAbilityGroups =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.combatSpecialAbilityGroups,
    );

  let combatTechniqueGroups =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.combatTechniqueGroups,
    );

  let combatTechniques =
    decodeFilesOfEntryType(
      CombatTechnique.Static.Decode.assoc(langs),
      parsedData.combatTechniques,
    );

  let conditions =
    decodeFilesOfEntryType(
      Condition.Static.Decode.assoc(langs),
      parsedData.conditions,
    );

  let coreRules =
    decodeFilesOfEntryType(
      CoreRule.Decode.assoc(langs),
      parsedData.coreRules,
    );

  let cultures =
    decodeFilesOfEntryType(
      Culture.Static.Decode.assoc(langs),
      parsedData.cultures,
    );

  let curricula =
    decodeFilesOfEntryType(
      Curriculum.Static.Decode.assoc(langs),
      parsedData.curricula,
    );

  let curses =
    decodeFilesOfEntryType(
      Curse.Static.Decode.assoc(langs),
      parsedData.curses,
    );

  let derivedCharacteristics =
    decodeFilesOfEntryType(
      DerivedCharacteristic.Static.Decode.assoc(langs),
      parsedData.derivedCharacteristics,
    );

  let dominationRituals =
    decodeFilesOfEntryType(
      DominationRitual.Static.Decode.assoc(langs),
      parsedData.dominationRituals,
    );

  let elvenMagicalSongs =
    decodeFilesOfEntryType(
      ElvenMagicalSong.Static.Decode.assoc(langs),
      parsedData.elvenMagicalSongs,
    );

  let items =
    decodeFilesOfEntryType(Item.Decode.assoc(langs), parsedData.items);

  let equipmentGroups =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.equipmentGroups,
    );

  let equipmentPackages =
    decodeFilesOfEntryType(
      EquipmentPackage.Decode.assoc(langs),
      parsedData.equipmentPackages,
    );

  let experienceLevels =
    decodeFilesOfEntryType(
      ExperienceLevel.Decode.assoc(langs),
      parsedData.experienceLevels,
    );

  let eyeColors =
    decodeFilesOfEntryType(IdName.Decode.assoc(langs), parsedData.eyeColors);

  let focusRules =
    decodeFilesOfEntryType(
      FocusRule.Static.Decode.assoc(langs),
      parsedData.focusRules,
    );

  let geodeRituals =
    decodeFilesOfEntryType(
      GeodeRitual.Static.Decode.assoc(langs),
      parsedData.geodeRituals,
    );

  let hairColors =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.hairColors,
    );

  let languages =
    decodeFilesOfEntryType(
      Language.Decode.assoc(langs),
      parsedData.languages,
    );

  let liturgicalChantGroups =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.liturgicalChantGroups,
    );

  let liturgicalChants =
    decodeFilesOfEntryType(
      LiturgicalChant.Static.Decode.assoc(langs),
      parsedData.liturgicalChants,
    );

  let liturgicalChantEnhancements =
    EnhancementsSpecialAbility.liturgicalChantsToSpecialAbilityOptions(
      liturgicalChants,
    );

  let magicalDances =
    decodeFilesOfEntryType(
      MagicalDance.Static.Decode.assoc(langs),
      parsedData.magicalDances,
    );

  let magicalMelodies =
    decodeFilesOfEntryType(
      MagicalMelody.Static.Decode.assoc(langs),
      parsedData.magicalMelodies,
    );

  let magicalTraditions =
    decodeFilesOfEntryType(
      MagicalTradition.Decode.assoc(langs),
      parsedData.magicalTraditions,
    );

  let optionalRules =
    decodeFilesOfEntryType(
      OptionalRule.Static.Decode.assoc(langs),
      parsedData.optionalRules,
    );

  let pacts =
    decodeFilesOfEntryType(
      Pact.Static.Decode.assoc(langs),
      parsedData.pacts,
    );

  let professions =
    decodeFilesOfEntryType(
      Profession.Static.Decode.assoc(langs),
      parsedData.professions,
    );

  let properties =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.properties,
    );

  let publications =
    decodeFilesOfEntryType(
      Publication.Decode.assoc(langs),
      parsedData.publications,
    );

  let races =
    decodeFilesOfEntryType(
      Race.Static.Decode.assoc(langs),
      parsedData.races,
    );

  let reaches =
    decodeFilesOfEntryType(IdName.Decode.assoc(langs), parsedData.reaches);

  let rogueSpells =
    decodeFilesOfEntryType(
      RogueSpell.Static.Decode.assoc(langs),
      parsedData.rogueSpells,
    );

  let scripts =
    decodeFilesOfEntryType(Script.Decode.assoc(langs), parsedData.scripts);

  let skillGroups =
    decodeFilesOfEntryType(
      SkillGroup.Decode.assoc(langs),
      parsedData.skillGroups,
    );

  let skills =
    decodeFilesOfEntryType(
      Skill.Static.Decode.assoc(langs),
      parsedData.skills,
    );

  let socialStatuses =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.socialStatuses,
    );

  let specialAbilityGroups =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.specialAbilityGroups,
    );

  let spellGroups =
    decodeFilesOfEntryType(
      IdName.Decode.assoc(langs),
      parsedData.spellGroups,
    );

  let spells =
    decodeFilesOfEntryType(
      Spell.Static.Decode.assoc(langs),
      parsedData.spells,
    );

  let spellEnhancements =
    EnhancementsSpecialAbility.spellsToSpecialAbilityOptions(spells);

  let states =
    decodeFilesOfEntryType(
      State.Static.Decode.assoc(langs),
      parsedData.states,
    );

  let subjects =
    decodeFilesOfEntryType(IdName.Decode.assoc(langs), parsedData.subjects);

  let tradeSecrets =
    decodeFilesOfEntryType(
      TradeSecret.Decode.assoc(langs),
      parsedData.tradeSecrets,
    );

  let tribes =
    decodeFilesOfEntryType(IdName.Decode.assoc(langs), parsedData.tribes);

  let zibiljaRituals =
    decodeFilesOfEntryType(
      ZibiljaRitual.Static.Decode.assoc(langs),
      parsedData.zibiljaRituals,
    );

  let advantages =
    decodeFilesOfEntryType(
      Advantage.Static.Decode.assoc(
        ~blessings,
        ~cantrips,
        ~combatTechniques,
        ~liturgicalChants,
        ~skills,
        ~spells,
        ~tradeSecrets,
        ~languages,
        ~scripts,
        ~animalShapes,
        ~spellEnhancements,
        ~liturgicalChantEnhancements,
        langs,
      ),
      parsedData.advantages,
    );

  let disadvantages =
    decodeFilesOfEntryType(
      Disadvantage.Static.Decode.assoc(
        ~blessings,
        ~cantrips,
        ~combatTechniques,
        ~liturgicalChants,
        ~skills,
        ~spells,
        ~tradeSecrets,
        ~languages,
        ~scripts,
        ~animalShapes,
        ~spellEnhancements,
        ~liturgicalChantEnhancements,
        langs,
      ),
      parsedData.disadvantages,
    );

  let baseSpecialAbilities =
    decodeFilesOfEntryType(
      SpecialAbility.Static.Decode.assoc(
        ~blessings,
        ~cantrips,
        ~combatTechniques,
        ~liturgicalChants,
        ~skills,
        ~spells,
        ~tradeSecrets,
        ~languages,
        ~scripts,
        ~animalShapes,
        ~spellEnhancements,
        ~liturgicalChantEnhancements,
        langs,
      ),
      parsedData.specialAbilities,
    );

  let specialAbilities =
    SpecialAbility.Static.Decode.modifyParsed(baseSpecialAbilities);

  {
    advantages,
    animalShapes,
    animalShapePaths,
    animalShapeSizes,
    animistForces,
    arcaneBardTraditions,
    arcaneDancerTraditions,
    armorTypes,
    aspects,
    attributes,
    blessedTraditions,
    blessings,
    brews,
    cantrips,
    combatSpecialAbilityGroups,
    combatTechniqueGroups,
    combatTechniques,
    conditions,
    coreRules,
    cultures,
    curricula,
    curses,
    derivedCharacteristics,
    disadvantages,
    dominationRituals,
    elvenMagicalSongs,
    items,
    equipmentGroups,
    equipmentPackages,
    experienceLevels,
    eyeColors,
    focusRules,
    geodeRituals,
    hairColors,
    languages,
    liturgicalChantEnhancements,
    liturgicalChantGroups,
    liturgicalChants,
    magicalDances,
    magicalMelodies,
    magicalTraditions,
    messages,
    optionalRules,
    pacts,
    professions,
    properties,
    publications,
    races,
    reaches,
    rogueSpells,
    scripts,
    skillGroups,
    skills,
    socialStatuses,
    specialAbilities,
    specialAbilityGroups,
    spellEnhancements,
    spellGroups,
    spells,
    states,
    subjects,
    tradeSecrets,
    tribes,
    zibiljaRituals,
  };
};
