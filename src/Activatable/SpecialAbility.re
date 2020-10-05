module Static = {
  type combatTechniques =
    | List(list(int))
    | All
    | Melee
    | Ranged
    | MeleeWithParry
    | OneHandedMelee;

  type t = {
    id: int,
    name: string,
    nameInWiki: option(string),
    levels: option(int),
    max: option(int),
    rules: option(string),
    effect: option(string),
    selectOptions: SelectOption.map,
    input: option(string),
    penalty: option(string),
    combatTechniques: option(combatTechniques),
    combatTechniquesText: option(string),
    aeCost: option(string),
    protectiveCircle: option(string),
    wardingCircle: option(string),
    volume: option(string),
    bindingCost: option(string),
    property: option(int),
    propertyText: option(string),
    aspect: option(int),
    brew: option(int),
    extended: option(list(OneOrMany.t(int))),
    prerequisites: Prerequisite.Collection.General.t,
    prerequisitesText: option(string),
    prerequisitesTextStart: option(string),
    prerequisitesTextEnd: option(string),
    apValue: option(Advantage.Static.apValue),
    apValueText: option(string),
    apValueTextAppend: option(string),
    gr: int,
    subgr: option(int),
    src: list(PublicationRef.t),
    errata: list(Erratum.t),
  };

  module Decode = {
    module Translation = {
      type t = {
        name: string,
        nameInWiki: option(string),
        rules: option(string),
        effect: option(string),
        input: option(string),
        penalty: option(string),
        combatTechniques: option(string),
        aeCost: option(string),
        protectiveCircle: option(string),
        wardingCircle: option(string),
        volume: option(string),
        bindingCost: option(string),
        property: option(string),
        prerequisites: option(string),
        prerequisitesStart: option(string),
        prerequisitesEnd: option(string),
        apValue: option(string),
        apValueAppend: option(string),
        errata: list(Erratum.t),
      };

      let t = json =>
        JsonStrict.{
          name: json |> field("name", string),
          nameInWiki: json |> optionalField("nameInWiki", string),
          rules: json |> optionalField("rules", string),
          effect: json |> optionalField("effect", string),
          input: json |> optionalField("input", string),
          penalty: json |> optionalField("penalty", string),
          combatTechniques: json |> optionalField("combatTechniques", string),
          aeCost: json |> optionalField("aeCost", string),
          protectiveCircle: json |> optionalField("protectiveCircle", string),
          wardingCircle: json |> optionalField("wardingCircle", string),
          volume: json |> optionalField("volume", string),
          bindingCost: json |> optionalField("bindingCost", string),
          property: json |> optionalField("property", string),
          prerequisites: json |> optionalField("prerequisites", string),
          prerequisitesStart:
            json |> optionalField("prerequisitesStart", string),
          prerequisitesEnd: json |> optionalField("prerequisitesEnd", string),
          apValue: json |> optionalField("apValue", string),
          apValueAppend: json |> optionalField("apValueAppend", string),
          errata: json |> field("errata", Erratum.Decode.list),
        };
    };

    module TranslationMap = TranslationMap.Make(Translation);

    type multilingual = {
      id: int,
      levels: option(int),
      max: option(int),
      selectOptionCategories:
        option(list(SelectOption.Decode.Category.WithGroups.t)),
      selectOptions: SelectOption.Map.t(SelectOption.Decode.multilingual),
      extended: option(list(OneOrMany.t(int))),
      combatTechniques: option(combatTechniques),
      property: option(int),
      aspect: option(int),
      brew: option(int),
      prerequisites: Prerequisite.Collection.General.multilingual,
      apValue: option(Advantage.Static.apValue),
      gr: int,
      subgr: option(int),
      src: list(PublicationRef.Decode.multilingual),
      translations: TranslationMap.t,
    };

    let combatTechniques =
      Json.Decode.(
        oneOf([
          json => json |> list(int) |> (x => List(x)),
          json =>
            json
            |> int
            |> (
              x =>
                switch (x) {
                | 1 => All
                | 2 => Melee
                | 3 => Ranged
                | 4 => MeleeWithParry
                | 5 => OneHandedMelee
                | _ =>
                  raise(
                    DecodeError(
                      "Unknown combat technique category: " ++ Ley_Int.show(x),
                    ),
                  )
                }
            ),
        ])
      );

    let multilingual = json =>
      JsonStrict.{
        id: json |> field("id", int),
        levels: json |> optionalField("levels", int),
        max: json |> optionalField("max", int),
        selectOptionCategories:
          json
          |> optionalField(
               "selectOptionCategories",
               list(SelectOption.Decode.Category.WithGroups.t),
             ),
        selectOptions:
          json
          |> optionalField(
               "selectOptions",
               list(SelectOption.Decode.multilingualAssoc),
             )
          |> Ley_Option.option(
               SelectOption.Map.empty,
               SelectOption.Map.fromList,
             ),
        extended:
          json |> optionalField("extended", list(OneOrMany.Decode.t(int))),
        combatTechniques:
          json |> optionalField("combatTechniques", combatTechniques),
        property: json |> optionalField("property", int),
        aspect: json |> optionalField("aspect", int),
        brew: json |> optionalField("brew", int),
        prerequisites:
          json
          |> field(
               "prerequisites",
               Prerequisite.Collection.General.decodeMultilingual,
             ),
        apValue:
          json |> optionalField("apValue", Advantage.Static.Decode.apValue),
        gr: json |> field("gr", int),
        subgr: json |> optionalField("subgr", int),
        src: json |> field("src", PublicationRef.Decode.multilingualList),
        translations: json |> field("translations", TranslationMap.Decode.t),
      };

    let resolveTranslations =
        (
          langs,
          blessings,
          cantrips,
          combatTechniques,
          liturgicalChants,
          skills,
          spells,
          x,
        ) =>
      Ley_Option.Infix.(
        x.translations
        |> TranslationMap.Decode.getFromLanguageOrder(langs)
        <&> (
          translation => {
            id: x.id,
            name: translation.name,
            nameInWiki: translation.nameInWiki,
            levels: x.levels,
            max: x.max,
            rules: translation.rules,
            effect: translation.effect,
            selectOptions:
              x.selectOptionCategories
              |> SelectOption.Decode.ResolveCategories.resolveCategories(
                   blessings,
                   cantrips,
                   combatTechniques,
                   liturgicalChants,
                   skills,
                   spells,
                 )
              |> SelectOption.Decode.ResolveCategories.mergeSelectOptions(
                   SelectOption.Map.mapMaybe(
                     SelectOption.Decode.resolveTranslations(langs),
                     x.selectOptions,
                   ),
                 ),
            input: translation.input,
            penalty: translation.penalty,
            combatTechniques: x.combatTechniques,
            combatTechniquesText: translation.combatTechniques,
            aeCost: translation.aeCost,
            protectiveCircle: translation.protectiveCircle,
            wardingCircle: translation.wardingCircle,
            volume: translation.volume,
            bindingCost: translation.bindingCost,
            property: x.property,
            propertyText: translation.property,
            aspect: x.aspect,
            brew: x.brew,
            extended: x.extended,
            prerequisites:
              Prerequisite.Collection.General.resolveTranslations(
                langs,
                x.prerequisites,
              ),
            prerequisitesText: translation.prerequisites,
            prerequisitesTextStart: translation.prerequisitesStart,
            prerequisitesTextEnd: translation.prerequisitesEnd,
            apValue: x.apValue,
            apValueText: translation.apValue,
            apValueTextAppend: translation.apValueAppend,
            gr: x.gr,
            subgr: x.subgr,
            src: PublicationRef.Decode.resolveTranslationsList(langs, x.src),
            errata: translation.errata,
          }
        )
      );

    let t =
        (
          blessings,
          cantrips,
          combatTechniques,
          liturgicalChants,
          skills,
          spells,
          langs,
          json,
        ) =>
      json
      |> multilingual
      |> resolveTranslations(
           langs,
           blessings,
           cantrips,
           combatTechniques,
           liturgicalChants,
           skills,
           spells,
         );

    let toAssoc = (x: t) => (x.id, x);

    let assoc =
        (
          blessings,
          cantrips,
          combatTechniques,
          liturgicalChants,
          skills,
          spells,
        ) =>
      Decoder.decodeAssoc(
        t(
          blessings,
          cantrips,
          combatTechniques,
          liturgicalChants,
          skills,
          spells,
        ),
        toAssoc,
      );

    let modifyParsed = specialAbilities =>
      specialAbilities
      |> Ley_IntMap.adjust(
           (specialAbility: t) =>
             Ley_IntMap.lookup(
               Id.SpecialAbility.toInt(Language),
               specialAbilities,
             )
             |> Ley_Option.option(specialAbility, (language: t) =>
                  {...specialAbility, selectOptions: language.selectOptions}
                ),
           Id.SpecialAbility.toInt(LanguageSpecializations),
         );
  };
};
