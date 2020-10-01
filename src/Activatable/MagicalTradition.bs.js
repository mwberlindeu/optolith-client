// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Ley_Int$OptolithClient from "../Data/Ley_Int.bs.js";
import * as Yaml_Zip$OptolithClient from "../Misc/Yaml_Zip.bs.js";
import * as JsonStrict$OptolithClient from "../Misc/JsonStrict.bs.js";
import * as Ley_IntMap$OptolithClient from "../Data/Ley_IntMap.bs.js";

function tL10n(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json)
        };
}

function tUniv(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          numId: JsonStrict$OptolithClient.optionalField("numId", JsonStrict$OptolithClient.$$int, json),
          primary: JsonStrict$OptolithClient.optionalField("primary", JsonStrict$OptolithClient.$$int, json),
          aeMod: JsonStrict$OptolithClient.optionalField("aeMod", Json_decode.$$float, json),
          canLearnCantrips: JsonStrict$OptolithClient.field("canLearnCantrips", JsonStrict$OptolithClient.bool, json),
          canLearnSpells: JsonStrict$OptolithClient.field("canLearnSpells", JsonStrict$OptolithClient.bool, json),
          canLearnRituals: JsonStrict$OptolithClient.field("canLearnRituals", JsonStrict$OptolithClient.bool, json),
          allowMultipleTraditions: JsonStrict$OptolithClient.field("allowMultipleTraditions", JsonStrict$OptolithClient.bool, json),
          isDisAdvAPMaxHalved: JsonStrict$OptolithClient.field("isDisAdvAPMaxHalved", JsonStrict$OptolithClient.bool, json),
          areDisAdvRequiredApplyToMagActionsOrApps: JsonStrict$OptolithClient.field("areDisAdvRequiredApplyToMagActionsOrApps", JsonStrict$OptolithClient.bool, json)
        };
}

function t(univ, l10n) {
  return [
          univ.id,
          {
            id: univ.id,
            numId: univ.numId,
            name: l10n.name,
            primary: univ.primary,
            aeMod: univ.aeMod,
            canLearnCantrips: univ.canLearnCantrips,
            canLearnSpells: univ.canLearnSpells,
            canLearnRituals: univ.canLearnRituals,
            allowMultipleTraditions: univ.allowMultipleTraditions,
            isDisAdvAPMaxHalved: univ.isDisAdvAPMaxHalved,
            areDisAdvRequiredApplyToMagActionsOrApps: univ.areDisAdvRequiredApplyToMagActionsOrApps
          }
        ];
}

function all(yamlData) {
  return Curry._1(Ley_IntMap$OptolithClient.fromList, Yaml_Zip$OptolithClient.zipBy(Ley_Int$OptolithClient.show, t, (function (x) {
                    return x.id;
                  }), (function (x) {
                    return x.id;
                  }), JsonStrict$OptolithClient.list(tUniv, yamlData.magicalTraditionsUniv), JsonStrict$OptolithClient.list(tL10n, yamlData.magicalTraditionsL10n)));
}

var Decode = {
  tL10n: tL10n,
  tUniv: tUniv,
  t: t,
  all: all
};

export {
  Decode ,
  
}
/* Ley_IntMap-OptolithClient Not a pure module */