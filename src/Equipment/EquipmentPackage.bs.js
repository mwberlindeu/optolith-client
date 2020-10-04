// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Erratum$OptolithClient from "../Sources/Erratum.bs.js";
import * as JsonStrict$OptolithClient from "../Misc/JsonStrict.bs.js";
import * as Ley_IntMap$OptolithClient from "../Data/Ley_IntMap.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";
import * as PublicationRef$OptolithClient from "../Sources/PublicationRef.bs.js";
import * as TranslationMap$OptolithClient from "../Misc/TranslationMap.bs.js";

function decode(json) {
  return {
          name: Json_decode.field("name", Json_decode.string, json),
          errata: Json_decode.field("errata", Erratum$OptolithClient.decodeList, json)
        };
}

var Translations = {
  decode: decode
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translations);

function decodeItem(json) {
  return [
          JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          JsonStrict$OptolithClient.optionalField("amount", JsonStrict$OptolithClient.$$int, json)
        ];
}

function decodeMultilingual(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          items: Curry._2(Ley_IntMap$OptolithClient.map, (function (param) {
                  return Ley_Option$OptolithClient.fromOption(1, param);
                }), Curry._1(Ley_IntMap$OptolithClient.fromList, Json_decode.field("items", (function (param) {
                          return Json_decode.list(decodeItem, param);
                        }), json))),
          src: Json_decode.field("src", PublicationRef$OptolithClient.decodeMultilingualList, json),
          translations: Json_decode.field("translations", TranslationMap.decode, json)
        };
}

function resolveTranslations(langs, x) {
  return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._2(TranslationMap.getFromLanguageOrder, langs, x.translations), (function (translation) {
                return [
                        x.id,
                        {
                          id: x.id,
                          name: translation.name,
                          items: x.items,
                          src: PublicationRef$OptolithClient.resolveTranslationsList(langs, x.src),
                          errata: translation.errata
                        }
                      ];
              }));
}

function decode$1(langs, json) {
  return resolveTranslations(langs, decodeMultilingual(json));
}

export {
  Translations ,
  TranslationMap ,
  decodeItem ,
  decodeMultilingual ,
  resolveTranslations ,
  decode$1 as decode,
  
}
/* TranslationMap Not a pure module */