// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as IC$OptolithClient from "./IC.bs.js";
import * as Erratum$OptolithClient from "../Sources/Erratum.bs.js";
import * as JsonStrict$OptolithClient from "../Misc/JsonStrict.bs.js";
import * as Ley_IntSet$OptolithClient from "../Data/Ley_IntSet.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";
import * as SkillCheck$OptolithClient from "./SkillCheck.bs.js";
import * as Prerequisite$OptolithClient from "../Prerequisites/Prerequisite.bs.js";
import * as CheckModifier$OptolithClient from "./CheckModifier.bs.js";
import * as PublicationRef$OptolithClient from "../Sources/PublicationRef.bs.js";
import * as TranslationMap$OptolithClient from "../Misc/TranslationMap.bs.js";
import * as ActivatableSkill$OptolithClient from "./ActivatableSkill.bs.js";

function decode(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json),
          effect: JsonStrict$OptolithClient.field("effect", JsonStrict$OptolithClient.string, json),
          castingTime: JsonStrict$OptolithClient.field("castingTime", ActivatableSkill$OptolithClient.MainParameter.decode, json),
          aeCost: JsonStrict$OptolithClient.field("aeCost", ActivatableSkill$OptolithClient.MainParameter.decode, json),
          range: JsonStrict$OptolithClient.field("range", ActivatableSkill$OptolithClient.MainParameter.decode, json),
          duration: JsonStrict$OptolithClient.field("duration", ActivatableSkill$OptolithClient.MainParameter.decode, json),
          target: JsonStrict$OptolithClient.field("target", JsonStrict$OptolithClient.string, json),
          errata: JsonStrict$OptolithClient.field("errata", Erratum$OptolithClient.decodeList, json)
        };
}

var Translations = {
  decode: decode
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translations);

function decodeMultilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          check: JsonStrict$OptolithClient.field("check", SkillCheck$OptolithClient.decode, json),
          checkMod: JsonStrict$OptolithClient.optionalField("checkMod", CheckModifier$OptolithClient.decode, json),
          castingTimeNoMod: JsonStrict$OptolithClient.field("castingTimeNoMod", JsonStrict$OptolithClient.bool, json),
          aeCostNoMod: JsonStrict$OptolithClient.field("aeCostNoMod", JsonStrict$OptolithClient.bool, json),
          rangeNoMod: JsonStrict$OptolithClient.field("rangeNoMod", JsonStrict$OptolithClient.bool, json),
          durationNoMod: JsonStrict$OptolithClient.field("durationNoMod", JsonStrict$OptolithClient.bool, json),
          property: JsonStrict$OptolithClient.field("property", JsonStrict$OptolithClient.$$int, json),
          traditions: Curry._1(Ley_IntSet$OptolithClient.fromList, JsonStrict$OptolithClient.field("traditions", (function (param) {
                      return JsonStrict$OptolithClient.list(JsonStrict$OptolithClient.$$int, param);
                    }), json)),
          ic: JsonStrict$OptolithClient.field("ic", IC$OptolithClient.Decode.t, json),
          activatablePrerequisites: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return JsonStrict$OptolithClient.list(Prerequisite$OptolithClient.Decode.activatable, param);
                }), json),
          increasablePrerequisites: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return JsonStrict$OptolithClient.list(Prerequisite$OptolithClient.Decode.increasable, param);
                }), json),
          gr: JsonStrict$OptolithClient.field("gr", JsonStrict$OptolithClient.$$int, json),
          src: JsonStrict$OptolithClient.field("src", PublicationRef$OptolithClient.decodeMultilingualList, json),
          translations: JsonStrict$OptolithClient.field("translations", TranslationMap.decode, json)
        };
}

function decode$1(langs, json) {
  var x = decodeMultilingual(json);
  return Ley_Option$OptolithClient.Functor.$less$amp$great(Curry._2(TranslationMap.getFromLanguageOrder, langs, x.translations), (function (translation) {
                return {
                        id: x.id,
                        name: translation.name,
                        check: x.check,
                        checkMod: x.checkMod,
                        effect: translation.effect,
                        castingTime: ActivatableSkill$OptolithClient.MainParameter.make(x.castingTimeNoMod, translation.castingTime),
                        aeCost: ActivatableSkill$OptolithClient.MainParameter.make(x.castingTimeNoMod, translation.castingTime),
                        range: ActivatableSkill$OptolithClient.MainParameter.make(x.rangeNoMod, translation.range),
                        duration: ActivatableSkill$OptolithClient.MainParameter.make(x.durationNoMod, translation.duration),
                        target: translation.target,
                        property: x.property,
                        traditions: x.traditions,
                        ic: x.ic,
                        activatablePrerequisites: x.activatablePrerequisites,
                        increasablePrerequisites: x.increasablePrerequisites,
                        gr: x.gr,
                        src: PublicationRef$OptolithClient.resolveTranslationsList(langs, x.src),
                        errata: translation.errata
                      };
              }));
}

var Dynamic = ActivatableSkill$OptolithClient.Dynamic;

var Static = {
  decode: decode$1
};

export {
  Dynamic ,
  Static ,
  
}
/* TranslationMap Not a pure module */