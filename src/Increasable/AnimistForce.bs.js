// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as IC$OptolithClient from "./IC.bs.js";
import * as Decoder$OptolithClient from "../Utilities/Decoder.bs.js";
import * as Erratum$OptolithClient from "../Sources/Erratum.bs.js";
import * as JsonStrict$OptolithClient from "../Misc/JsonStrict.bs.js";
import * as Ley_IntSet$OptolithClient from "../Data/Ley_IntSet.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";
import * as SkillCheck$OptolithClient from "./SkillCheck.bs.js";
import * as PublicationRef$OptolithClient from "../Sources/PublicationRef.bs.js";
import * as TranslationMap$OptolithClient from "../Misc/TranslationMap.bs.js";
import * as ActivatableSkill$OptolithClient from "./ActivatableSkill.bs.js";

function t(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json),
          effect: JsonStrict$OptolithClient.field("effect", JsonStrict$OptolithClient.string, json),
          cost: JsonStrict$OptolithClient.field("cost", ActivatableSkill$OptolithClient.MainParameter.decode, json),
          duration: JsonStrict$OptolithClient.field("duration", ActivatableSkill$OptolithClient.MainParameter.decode, json),
          errata: JsonStrict$OptolithClient.field("errata", Erratum$OptolithClient.Decode.list, json)
        };
}

var Translation = {
  t: t
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translation);

function multilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          check: JsonStrict$OptolithClient.field("check", SkillCheck$OptolithClient.decode, json),
          costNoMod: JsonStrict$OptolithClient.field("costNoMod", JsonStrict$OptolithClient.bool, json),
          durationNoMod: JsonStrict$OptolithClient.field("durationNoMod", JsonStrict$OptolithClient.bool, json),
          tribes: Curry._1(Ley_IntSet$OptolithClient.fromList, JsonStrict$OptolithClient.field("tribes", (function (param) {
                      return JsonStrict$OptolithClient.list(JsonStrict$OptolithClient.$$int, param);
                    }), json)),
          property: JsonStrict$OptolithClient.field("property", JsonStrict$OptolithClient.$$int, json),
          ic: JsonStrict$OptolithClient.field("ic", IC$OptolithClient.Decode.t, json),
          src: JsonStrict$OptolithClient.field("src", PublicationRef$OptolithClient.Decode.multilingualList, json),
          translations: JsonStrict$OptolithClient.field("translations", TranslationMap.Decode.t, json)
        };
}

function t$1(langs, json) {
  var x = multilingual(json);
  return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._2(TranslationMap.Decode.getFromLanguageOrder, langs, x.translations), (function (translation) {
                return {
                        id: x.id,
                        name: translation.name,
                        check: x.check,
                        effect: translation.effect,
                        cost: ActivatableSkill$OptolithClient.MainParameter.make(x.costNoMod, translation.cost),
                        duration: ActivatableSkill$OptolithClient.MainParameter.make(x.durationNoMod, translation.duration),
                        tribes: x.tribes,
                        property: x.property,
                        ic: x.ic,
                        src: PublicationRef$OptolithClient.Decode.resolveTranslationsList(langs, x.src),
                        errata: translation.errata
                      };
              }));
}

function toAssoc(x) {
  return [
          x.id,
          x
        ];
}

function assoc(param, param$1) {
  return Decoder$OptolithClient.decodeAssoc(t$1, toAssoc, param, param$1);
}

var Dynamic = ActivatableSkill$OptolithClient.Dynamic;

var Static = {
  Decode: {
    assoc: assoc
  }
};

export {
  Dynamic ,
  Static ,
  
}
/* TranslationMap Not a pure module */
