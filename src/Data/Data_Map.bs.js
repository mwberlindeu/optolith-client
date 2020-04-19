// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Map = require("bs-platform/lib/js/map.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_int = require("bs-platform/lib/js/js_int.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Maybe$OptolithClient = require("./Maybe.bs.js");
var Either$OptolithClient = require("./Either.bs.js");
var Function$OptolithClient = require("./Function.bs.js");

function Make(funarg) {
  var TypedMap = $$Map.Make(funarg);
  var foldr = function (f, initial, mp) {
    return Curry._3(TypedMap.fold, (function (param, v, acc) {
                  return Curry._2(f, v, acc);
                }), mp, initial);
  };
  var foldl = function (f, initial, mp) {
    return Curry._3(TypedMap.fold, (function (param, v, acc) {
                  return Curry._2(f, acc, v);
                }), mp, initial);
  };
  var toList = TypedMap.bindings;
  var $$null = function (mp) {
    return Curry._1(TypedMap.is_empty, mp);
  };
  var elem = function (e, mp) {
    return Curry._2(TypedMap.exists, (function (param, x) {
                  return Caml_obj.caml_equal(e, x);
                }), mp);
  };
  var sum = function (mp) {
    return foldr((function (prim, prim$1) {
                  return prim + prim$1 | 0;
                }), 0, mp);
  };
  var product = function (mp) {
    return foldr(Caml_int32.imul, 1, mp);
  };
  var maximum = function (mp) {
    return foldr((function (prim, prim$1) {
                  return Math.max(prim, prim$1);
                }), Js_int.min, mp);
  };
  var minimum = function (mp) {
    return foldr((function (prim, prim$1) {
                  return Math.min(prim, prim$1);
                }), Js_int.max, mp);
  };
  var concat = function (mp) {
    return foldl(List.append, /* [] */0, mp);
  };
  var concatMap = function (f, mp) {
    return Curry._3(TypedMap.fold, (function (param, v, acc) {
                  return Curry._3(TypedMap.union, (function (param, x, param$1) {
                                return Caml_option.some(x);
                              }), acc, Curry._1(f, v));
                }), mp, TypedMap.empty);
  };
  var con = function (mp) {
    return Curry._2(TypedMap.for_all, (function (param) {
                  return Function$OptolithClient.$$const(Function$OptolithClient.id, param);
                }), mp);
  };
  var dis = function (mp) {
    return !Curry._2(TypedMap.for_all, (function (param) {
                  return Function$OptolithClient.$$const((function (prim) {
                                return !prim;
                              }), param);
                }), mp);
  };
  var any = function (pred, mp) {
    return !Curry._2(TypedMap.for_all, (function (param, x) {
                  return !Curry._1(pred, x);
                }), mp);
  };
  var all = function (pred, mp) {
    return Curry._2(TypedMap.for_all, (function (param, x) {
                  return Curry._1(pred, x);
                }), mp);
  };
  var notElem = function (e, mp) {
    return !elem(e, mp);
  };
  var find = function (pred, mp) {
    return Maybe$OptolithClient.Functor.$less$$great((function (prim) {
                  return prim[1];
                }), Maybe$OptolithClient.optionToMaybe(Curry._2(TypedMap.find_first_opt, (function (key) {
                          return Curry._1(pred, Function$OptolithClient.flip(TypedMap.find, mp, key));
                        }), mp)));
  };
  var Foldable_length = TypedMap.cardinal;
  var Foldable = {
    foldr: foldr,
    foldl: foldl,
    toList: toList,
    $$null: $$null,
    length: Foldable_length,
    elem: elem,
    sum: sum,
    product: product,
    maximum: maximum,
    minimum: minimum,
    concat: concat,
    concatMap: concatMap,
    con: con,
    dis: dis,
    any: any,
    all: all,
    notElem: notElem,
    find: find
  };
  var $$null$1 = function (mp) {
    return Curry._1(TypedMap.is_empty, mp);
  };
  var member = TypedMap.mem;
  var notMember = function (key, mp) {
    return !Curry._2(member, key, mp);
  };
  var lookup = function (key, mp) {
    return Maybe$OptolithClient.Functor.$less$$great((function (prim) {
                  return prim[1];
                }), Maybe$OptolithClient.optionToMaybe(Curry._2(TypedMap.find_first_opt, (function (k) {
                          return Curry._2(funarg.compare, k, key) === 0;
                        }), mp)));
  };
  var findWithDefault = function (def, key, mp) {
    return Maybe$OptolithClient.fromMaybe(def, lookup(key, mp));
  };
  var empty = TypedMap.empty;
  var insert = TypedMap.add;
  var insertWith = function (f, key, value, mp) {
    return Curry._3(insert, key, Maybe$OptolithClient.maybe(value, Curry._1(f, value), lookup(key, mp)), mp);
  };
  var insertWithKey = function (f, key, value, mp) {
    return Curry._3(insert, key, Maybe$OptolithClient.maybe(value, Curry._2(f, key, value), lookup(key, mp)), mp);
  };
  var insertLookupWithKey = function (f, key, value, mp) {
    var old = lookup(key, mp);
    return /* tuple */[
            old,
            Curry._3(insert, key, Maybe$OptolithClient.maybe(value, Curry._2(f, key, value), old), mp)
          ];
  };
  var adjust = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  if (mx !== undefined) {
                    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(mx)));
                  }
                  
                }), mp);
  };
  var adjustWithKey = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  if (mx !== undefined) {
                    return Caml_option.some(Curry._2(f, key, Caml_option.valFromOption(mx)));
                  }
                  
                }), mp);
  };
  var update = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  if (mx !== undefined) {
                    return Maybe$OptolithClient.maybeToOption(Curry._1(f, Caml_option.valFromOption(mx)));
                  }
                  
                }), mp);
  };
  var updateWithKey = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  if (mx !== undefined) {
                    return Maybe$OptolithClient.maybeToOption(Curry._2(f, key, Caml_option.valFromOption(mx)));
                  }
                  
                }), mp);
  };
  var updateLookupWithKey = function (f, key, mp) {
    var old = lookup(key, mp);
    return /* tuple */[
            old,
            Curry._3(TypedMap.update, key, (function (mx) {
                    if (mx !== undefined) {
                      return Maybe$OptolithClient.maybeToOption(Curry._2(f, key, Caml_option.valFromOption(mx)));
                    }
                    
                  }), mp)
          ];
  };
  var alter = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  return Maybe$OptolithClient.maybeToOption(Curry._1(f, Maybe$OptolithClient.optionToMaybe(mx)));
                }), mp);
  };
  var union = function (mp1, mp2) {
    return Curry._3(TypedMap.union, (function (param, x, param$1) {
                  return Caml_option.some(x);
                }), mp1, mp2);
  };
  var foldrWithKey = function (f, initial, mp) {
    return Curry._3(TypedMap.fold, Curry.__3(f), mp, initial);
  };
  var foldlWithKey = function (f, initial, mp) {
    return Curry._3(TypedMap.fold, (function (key, v, acc) {
                  return Curry._3(f, acc, key, v);
                }), mp, initial);
  };
  var elems = function (mp) {
    return List.map((function (prim) {
                  return prim[1];
                }), Curry._1(TypedMap.bindings, mp));
  };
  var keys = function (mp) {
    return List.map((function (prim) {
                  return prim[0];
                }), Curry._1(TypedMap.bindings, mp));
  };
  var fromList = function (ps) {
    return List.fold_right((function (param) {
                  return Curry._2(insert, param[0], param[1]);
                }), ps, empty);
  };
  var fromArray = function (ps) {
    return $$Array.fold_right((function (param) {
                  return Curry._2(insert, param[0], param[1]);
                }), ps, empty);
  };
  var filter = function (pred, mp) {
    return Curry._2(TypedMap.filter, (function (param, x) {
                  return Curry._1(pred, x);
                }), mp);
  };
  var mapMaybe = function (f, mp) {
    return Curry._3(TypedMap.fold, (function (k, x, acc) {
                  var match = Curry._1(f, x);
                  if (match) {
                    return Curry._3(insert, k, match[0], acc);
                  } else {
                    return acc;
                  }
                }), mp, empty);
  };
  var mapMaybeWithKey = function (f, mp) {
    return Curry._3(TypedMap.fold, (function (k, x, acc) {
                  var match = Curry._2(f, k, x);
                  if (match) {
                    return Curry._3(insert, k, match[0], acc);
                  } else {
                    return acc;
                  }
                }), mp, empty);
  };
  var mapMEitherHelper = function (f, xs) {
    if (xs) {
      var match = xs[0];
      var new_value = Curry._1(f, match[1]);
      if (new_value.tag) {
        var match$1 = mapMEitherHelper(f, xs[1]);
        if (match$1.tag) {
          return /* Right */Block.__(1, [/* :: */[
                      /* tuple */[
                        match[0],
                        new_value[0]
                      ],
                      match$1[0]
                    ]]);
        } else {
          return /* Left */Block.__(0, [match$1[0]]);
        }
      } else {
        return /* Left */Block.__(0, [new_value[0]]);
      }
    } else {
      return /* Right */Block.__(1, [/* [] */0]);
    }
  };
  var mapMEither = function (f, mp) {
    return Either$OptolithClient.Functor.$less$$great(fromList, mapMEitherHelper(f, Curry._1(toList, mp)));
  };
  var Traversable = {
    mapMEither: mapMEither
  };
  return {
          Foldable: Foldable,
          Traversable: Traversable,
          $$null: $$null$1,
          size: TypedMap.cardinal,
          member: member,
          notMember: notMember,
          lookup: lookup,
          findWithDefault: findWithDefault,
          empty: empty,
          singleton: TypedMap.singleton,
          insert: insert,
          insertWith: insertWith,
          insertWithKey: insertWithKey,
          insertLookupWithKey: insertLookupWithKey,
          $$delete: TypedMap.remove,
          adjust: adjust,
          adjustWithKey: adjustWithKey,
          update: update,
          updateWithKey: updateWithKey,
          updateLookupWithKey: updateLookupWithKey,
          alter: alter,
          union: union,
          map: TypedMap.map,
          mapWithKey: TypedMap.mapi,
          foldrWithKey: foldrWithKey,
          foldlWithKey: foldlWithKey,
          elems: elems,
          keys: keys,
          assocs: TypedMap.bindings,
          fromList: fromList,
          fromArray: fromArray,
          filter: filter,
          filterWithKey: TypedMap.filter,
          mapMaybe: mapMaybe,
          mapMaybeWithKey: mapMaybeWithKey
        };
}

exports.Make = Make;
/* No side effect */
