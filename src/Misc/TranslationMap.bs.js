// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Locale$OptolithClient from "./Locale.bs.js";
import * as Ley_List$OptolithClient from "../Data/Ley_List.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";

function Make(Decodable) {
  var t = function (param) {
    return Json_decode.dict(Json_decode.id, param);
  };
  var getFromLanguageOrder = function (langs, x) {
    return Curry._3(Ley_List$OptolithClient.foldl, (function (acc, lang) {
                  return Curry._2(Ley_Option$OptolithClient.Infix.$less$pipe$great, acc, Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Js_dict.get(x, lang), Decodable.t));
                }), undefined, Locale$OptolithClient.toList(langs));
  };
  var Decode = {
    t: t,
    getFromLanguageOrder: getFromLanguageOrder
  };
  return {
          Decode: Decode
        };
}

export {
  Make ,
  
}
/* Ley_List-OptolithClient Not a pure module */
