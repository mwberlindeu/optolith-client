// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as IC$OptolithClient from "./IC.bs.js";
import * as Id$OptolithClient from "../Constants/Id.bs.js";
import * as Ley_Int$OptolithClient from "../../Data/Ley_Int.bs.js";
import * as Ley_List$OptolithClient from "../../Data/Ley_List.bs.js";
import * as Ley_IntMap$OptolithClient from "../../Data/Ley_IntMap.bs.js";
import * as Ley_Option$OptolithClient from "../../Data/Ley_Option.bs.js";
import * as Ley_Function$OptolithClient from "../../Data/Ley_Function.bs.js";
import * as Activatable_Convert$OptolithClient from "./Activatable_Convert.bs.js";
import * as Activatable_Accessors$OptolithClient from "./Activatable_Accessors.bs.js";
import * as Activatable_SelectOptions$OptolithClient from "./Activatable_SelectOptions.bs.js";

function ensureFlat(x) {
  if (x.TAG) {
    return ;
  } else {
    return x._0;
  }
}

function ensurePerLevel(x) {
  if (x.TAG) {
    return x._0;
  }
  
}

function getDefaultEntryCost(staticEntry, singleHeroEntry) {
  var sid1 = Activatable_SelectOptions$OptolithClient.getOption1(singleHeroEntry);
  var level = Ley_Option$OptolithClient.fromOption(1, singleHeroEntry.level);
  var apValue = Ley_Option$OptolithClient.fromOption({
        TAG: /* Flat */0,
        _0: 0
      }, Activatable_Accessors$OptolithClient.apValue(staticEntry));
  var optionApValue = Ley_Option$OptolithClient.Monad.$great$great$eq(sid1, (function (param) {
          return Activatable_SelectOptions$OptolithClient.getSelectOptionCost(staticEntry, param);
        }));
  if (optionApValue !== undefined) {
    return optionApValue;
  }
  if (!apValue.TAG) {
    return Math.imul(apValue._0, level);
  }
  var xs = apValue._0;
  switch (staticEntry.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return Ley_List$OptolithClient.Safe.atMay(xs, level - 1 | 0);
    case /* SpecialAbility */2 :
        return Ley_List$OptolithClient.Foldable.sum(Ley_List$OptolithClient.take(Ley_Int$OptolithClient.max(1, level), xs));
    
  }
}

function getEntrySpecificCost(isEntryToAdd, staticData, hero, staticEntry, heroEntry, singleHeroEntry) {
  var sid1 = Activatable_SelectOptions$OptolithClient.getOption1(singleHeroEntry);
  var level = singleHeroEntry.level;
  var apValue = Ley_Option$OptolithClient.fromOption({
        TAG: /* Flat */0,
        _0: 0
      }, Activatable_Accessors$OptolithClient.apValue(staticEntry));
  switch (staticEntry.TAG | 0) {
    case /* Advantage */0 :
        var match = Id$OptolithClient.advantageFromInt(staticEntry._0.id);
        var exit = 0;
        if (typeof match !== "number") {
          return getDefaultEntryCost(staticEntry, singleHeroEntry);
        }
        if (match !== 17) {
          if (match >= 6) {
            return getDefaultEntryCost(staticEntry, singleHeroEntry);
          }
          switch (match) {
            case /* Nimble */1 :
            case /* Blessed */2 :
            case /* Luck */3 :
                return getDefaultEntryCost(staticEntry, singleHeroEntry);
            case /* Aptitude */0 :
            case /* ExceptionalSkill */4 :
                exit = 1;
                break;
            case /* ExceptionalCombatTechnique */5 :
                exit = 2;
                break;
            
          }
        } else {
          exit = 2;
        }
        switch (exit) {
          case 1 :
              return Ley_Option$OptolithClient.Monad.$great$great$eq(Activatable_SelectOptions$OptolithClient.getOption1(singleHeroEntry), (function (sid) {
                            if (typeof sid === "number") {
                              return ;
                            }
                            var variant = sid.HASH;
                            if (variant !== -384382742) {
                              if (variant !== 290194801) {
                                if (variant !== 345443720) {
                                  return ;
                                }
                                if (!apValue.TAG) {
                                  return ;
                                }
                                var apValues = apValue._0;
                                return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, sid.VAL, staticData.spells), (function ($$static) {
                                              return Ley_List$OptolithClient.Safe.atMay(apValues, IC$OptolithClient.icToIx($$static.ic));
                                            }));
                              }
                              if (!apValue.TAG) {
                                return ;
                              }
                              var apValues$1 = apValue._0;
                              return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, sid.VAL, staticData.skills), (function ($$static) {
                                            return Ley_List$OptolithClient.Safe.atMay(apValues$1, IC$OptolithClient.icToIx($$static.ic));
                                          }));
                            }
                            if (!apValue.TAG) {
                              return ;
                            }
                            var apValues$2 = apValue._0;
                            return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, sid.VAL, staticData.liturgicalChants), (function ($$static) {
                                          return Ley_List$OptolithClient.Safe.atMay(apValues$2, IC$OptolithClient.icToIx($$static.ic));
                                        }));
                          }));
          case 2 :
              return Ley_Option$OptolithClient.Monad.$great$great$eq(Activatable_SelectOptions$OptolithClient.getOption1(singleHeroEntry), (function (sid) {
                            if (typeof sid === "number") {
                              return ;
                            }
                            if (sid.HASH !== -920806756) {
                              return ;
                            }
                            if (!apValue.TAG) {
                              return ;
                            }
                            var apValues = apValue._0;
                            return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, sid.VAL, staticData.combatTechniques), (function ($$static) {
                                          return Ley_List$OptolithClient.Safe.atMay(apValues, IC$OptolithClient.icToIx($$static.ic));
                                        }));
                          }));
          
        }
        break;
    case /* Disadvantage */1 :
        var match$1 = Id$OptolithClient.disadvantageFromInt(staticEntry._0.id);
        if (typeof match$1 !== "number") {
          return getDefaultEntryCost(staticEntry, singleHeroEntry);
        }
        if (match$1 < 12) {
          return getDefaultEntryCost(staticEntry, singleHeroEntry);
        }
        switch (match$1 - 12 | 0) {
          case /* AfraidOf */0 :
              if (sid1 === undefined) {
                return ;
              }
              if (typeof sid1 === "number") {
                return ;
              }
              if (sid1.HASH !== 61643255) {
                return ;
              }
              var selected_option = sid1.VAL;
              var matchOption = function (target_option, current) {
                if (current !== undefined && !(typeof current === "number" || current.HASH !== 61643255)) {
                  return current.VAL === target_option;
                } else {
                  return false;
                }
              };
              var isPersonalityFlawNotPaid = function (target_option, paid_entries_max) {
                if (target_option === selected_option) {
                  return Ley_List$OptolithClient.countBy((function (e) {
                                if (matchOption(target_option, Ley_Option$OptolithClient.listToOption(e.options))) {
                                  return Ley_Option$OptolithClient.isNone(e.customCost);
                                } else {
                                  return false;
                                }
                              }), heroEntry.active) > (
                          isEntryToAdd ? paid_entries_max - 1 | 0 : paid_entries_max
                        );
                } else {
                  return false;
                }
              };
              if (isPersonalityFlawNotPaid(7, 1) || isPersonalityFlawNotPaid(8, 2)) {
                return 0;
              } else {
                return Activatable_SelectOptions$OptolithClient.getSelectOptionCost(staticEntry, {
                            HASH: /* Generic */61643255,
                            VAL: selected_option
                          });
              }
          case /* Slow */2 :
              return Ley_Option$OptolithClient.Foldable.find((function (param) {
                            return Ley_List$OptolithClient.countBy((function (e) {
                                          return Ley_Option$OptolithClient.isNone(e.customCost);
                                        }), heroEntry.active) > (
                                    isEntryToAdd ? 2 : 3
                                  );
                          }), ensureFlat(apValue));
          case /* DecreasedArcanePower */6 :
              return Ley_Option$OptolithClient.Monad.$great$great$eq(Activatable_SelectOptions$OptolithClient.getOption1(singleHeroEntry), (function (sid) {
                            if (typeof sid === "number") {
                              return ;
                            }
                            if (sid.HASH !== 290194801) {
                              return ;
                            }
                            if (!apValue.TAG) {
                              return ;
                            }
                            var apValues = apValue._0;
                            return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, sid.VAL, staticData.skills), (function ($$static) {
                                          return Ley_List$OptolithClient.Safe.atMay(apValues, IC$OptolithClient.icToIx($$static.ic));
                                        }));
                          }));
          case /* Poor */1 :
          case /* DecreasedKarmaPoints */7 :
              break;
          case /* NoFlyingBalm */3 :
          case /* NoFamiliar */4 :
          case /* MagicalRestriction */5 :
          case /* DecreasedLifePoints */8 :
          case /* DecreasedSpirit */9 :
          case /* DecreasedToughness */10 :
          case /* BadLuck */11 :
          case /* PersonalityFlaw */12 :
              return getDefaultEntryCost(staticEntry, singleHeroEntry);
          
        }
        return Ley_Option$OptolithClient.Monad.$great$great$eq(level, (function (level) {
                      var match = Ley_List$OptolithClient.Foldable.foldr((function (active, param) {
                              var prevSndMax = param[1];
                              var prevMax = param[0];
                              var match = active.level;
                              var match$1 = active.customCost;
                              if (match !== undefined && !(match$1 !== undefined || match <= prevMax)) {
                                return [
                                        match,
                                        prevMax
                                      ];
                              } else {
                                return [
                                        prevMax,
                                        prevSndMax
                                      ];
                              }
                            }), [
                            0,
                            0
                          ], heroEntry.active);
                      if (match[0] > level || Ley_List$OptolithClient.countBy((function (e) {
                                return Ley_Option$OptolithClient.Foldable.elem(level, e.level);
                              }), heroEntry.active) > (
                          isEntryToAdd ? 0 : 1
                        )) {
                        return ;
                      }
                      var partial_arg = level - match[1] | 0;
                      return Ley_Option$OptolithClient.Functor.$less$amp$great(ensureFlat(apValue), (function (param) {
                                    return Math.imul(partial_arg, param);
                                  }));
                    }));
    case /* SpecialAbility */2 :
        var match$2 = Id$OptolithClient.specialAbilityFromInt(staticEntry._0.id);
        var exit$1 = 0;
        if (typeof match$2 !== "number") {
          return getDefaultEntryCost(staticEntry, singleHeroEntry);
        }
        if (match$2 < 82) {
          var switcher = match$2 - 42 | 0;
          if (!(switcher > 38 || switcher < 0)) {
            if (switcher !== 29) {
              return getDefaultEntryCost(staticEntry, singleHeroEntry);
            } else {
              return Ley_Option$OptolithClient.Monad.$great$great$eq(ensureFlat(apValue), (function (flatAp) {
                            return Ley_Option$OptolithClient.Monad.$great$great$eq(Ley_Option$OptolithClient.Monad.$great$great$eq(sid1, Activatable_SelectOptions$OptolithClient.getGenericId), (function (languageId) {
                                          return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, Id$OptolithClient.specialAbilityToInt(/* Language */6), hero.specialAbilities), (function (language) {
                                                        return Ley_Option$OptolithClient.Monad.$great$great$eq(Ley_List$OptolithClient.Foldable.find((function (e) {
                                                                          return Ley_Option$OptolithClient.Foldable.elem(languageId, Ley_Option$OptolithClient.Monad.$great$great$eq(Ley_Option$OptolithClient.listToOption(e.options), Activatable_SelectOptions$OptolithClient.getGenericId));
                                                                        }), language.active), (function (selectedLanguage) {
                                                                      return Ley_Option$OptolithClient.Functor.$less$amp$great(selectedLanguage.level, (function (param) {
                                                                                    if (param !== 4) {
                                                                                      return flatAp;
                                                                                    } else {
                                                                                      return 0;
                                                                                    }
                                                                                  }));
                                                                    }));
                                                      }));
                                        }));
                          }));
            }
          }
          if (switcher >= 39) {
            exit$1 = 3;
          } else {
            switch (switcher + 42 | 0) {
              case /* SkillSpecialization */0 :
                  return Ley_Option$OptolithClient.Functor.$less$amp$great(Ley_Option$OptolithClient.Monad.$great$great$eq(sid1, (function (param) {
                                    return Activatable_SelectOptions$OptolithClient.getSkillFromOption(staticData, param);
                                  })), (function (skill) {
                                return Math.imul(Ley_List$OptolithClient.countBy((function (e) {
                                                  if (Ley_Option$OptolithClient.Foldable.elem({
                                                          HASH: /* Skill */290194801,
                                                          VAL: skill.id
                                                        }, Ley_Option$OptolithClient.listToOption(e.options))) {
                                                    return Ley_Option$OptolithClient.isNone(e.customCost);
                                                  } else {
                                                    return false;
                                                  }
                                                }), heroEntry.active) + (
                                            isEntryToAdd ? 1 : 0
                                          ) | 0, IC$OptolithClient.getAPForActivatation(skill.ic));
                              }));
              case /* Language */6 :
                  return Ley_Option$OptolithClient.Monad.$great$great$eq(level, (function (level) {
                                if (level !== 4) {
                                  return Ley_Option$OptolithClient.Functor.$less$amp$great(ensureFlat(apValue), (function (param) {
                                                return Math.imul(level, param);
                                              }));
                                } else {
                                  return 0;
                                }
                              }));
              case /* PropertyKnowledge */10 :
              case /* AspectKnowledge */12 :
                  exit$1 = 1;
                  break;
              case /* AdaptionZauber */16 :
              case /* FavoriteSpellwork */18 :
                  exit$1 = 2;
                  break;
              case /* TraditionWitches */19 :
                  var decreaseCost = function (id, cost) {
                    if (Activatable_Accessors$OptolithClient.isActiveM(Curry._2(Ley_IntMap$OptolithClient.lookup, id, hero.disadvantages))) {
                      return cost - 10 | 0;
                    } else {
                      return cost;
                    }
                  };
                  return Ley_Option$OptolithClient.Functor.$less$amp$great(ensureFlat(apValue), (function (flatAp) {
                                return decreaseCost(Id$OptolithClient.disadvantageToInt(/* NoFamiliar */4), decreaseCost(Id$OptolithClient.disadvantageToInt(/* NoFlyingBalm */3), flatAp));
                              }));
              case /* Forschungsgebiet */26 :
              case /* Expertenwissen */27 :
              case /* Wissensdurst */28 :
                  exit$1 = 3;
                  break;
              case /* Recherchegespuer */29 :
                  return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, Id$OptolithClient.specialAbilityToInt(/* Wissensdurst */28), hero.specialAbilities), (function (wissensdurst) {
                                return Ley_Option$OptolithClient.Monad.$great$great$eq(ensurePerLevel(apValue), (function (apPerLevel) {
                                              var getCostFromHeroEntry = function (entry) {
                                                return Ley_Option$OptolithClient.Monad.$great$great$eq(Ley_Option$OptolithClient.Monad.$great$great$eq(Activatable_SelectOptions$OptolithClient.getOption1(entry), (function (param) {
                                                                  return Activatable_SelectOptions$OptolithClient.getSkillFromOption(staticData, param);
                                                                })), (function (skill) {
                                                              return Ley_List$OptolithClient.Safe.atMay(apPerLevel, IC$OptolithClient.icToIx(skill.ic));
                                                            }));
                                              };
                                              return Ley_Option$OptolithClient.Monad.liftM2((function (prim, prim$1) {
                                                            return prim + prim$1 | 0;
                                                          }), getCostFromHeroEntry(singleHeroEntry), Ley_Option$OptolithClient.Monad.$great$great$eq(Ley_Option$OptolithClient.listToOption(wissensdurst.active), (function (fst) {
                                                                return getCostFromHeroEntry(Activatable_Convert$OptolithClient.singleToSingleWithId(heroEntry, fst));
                                                              })));
                                            }));
                              }));
              case /* TerrainKnowledge */1 :
              case /* CraftInstruments */2 :
              case /* Hunter */3 :
              case /* AreaKnowledge */4 :
              case /* Literacy */5 :
              case /* CombatReflexes */7 :
              case /* ImprovedDodge */8 :
              case /* TraditionGuildMages */9 :
              case /* PropertyFocus */11 :
              case /* TraditionChurchOfPraios */13 :
              case /* Feuerschlucker */14 :
              case /* CombatStyleCombination */15 :
              case /* Exorzist */17 :
              case /* MagicStyleCombination */20 :
              case /* Harmoniezauberei */21 :
              case /* Matrixzauberei */22 :
              case /* TraditionElves */23 :
              case /* TraditionDruids */24 :
              case /* SpellEnhancement */25 :
              case /* PredigtDerGemeinschaft */30 :
              case /* PredigtDerZuversicht */31 :
              case /* PredigtDesGottvertrauens */32 :
              case /* PredigtDesWohlgefallens */33 :
              case /* PredigtWiderMissgeschicke */34 :
              case /* VisionDerBestimmung */35 :
              case /* VisionDerEntrueckung */36 :
              case /* VisionDerGottheit */37 :
              case /* VisionDesSchicksals */38 :
              case /* VisionDesWahrenGlaubens */39 :
              case /* HoheWeihe */40 :
                  return getDefaultEntryCost(staticEntry, singleHeroEntry);
              case /* Lieblingsliturgie */41 :
                  return Ley_Option$OptolithClient.Monad.$great$great$eq(Activatable_SelectOptions$OptolithClient.getOption1(singleHeroEntry), (function (sid) {
                                if (typeof sid === "number") {
                                  return ;
                                }
                                if (sid.HASH !== -384382742) {
                                  return ;
                                }
                                if (!apValue.TAG) {
                                  return ;
                                }
                                var apValues = apValue._0;
                                return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, sid.VAL, staticData.liturgicalChants), (function ($$static) {
                                              return Ley_List$OptolithClient.Safe.atMay(apValues, IC$OptolithClient.icToIx($$static.ic));
                                            }));
                              }));
              
            }
          }
        } else if (match$2 >= 85) {
          if (match$2 >= 91) {
            return getDefaultEntryCost(staticEntry, singleHeroEntry);
          }
          exit$1 = 3;
        } else {
          if (match$2 !== 83) {
            return getDefaultEntryCost(staticEntry, singleHeroEntry);
          }
          exit$1 = 3;
        }
        switch (exit$1) {
          case 1 :
              return Ley_Option$OptolithClient.Monad.$great$great$eq(ensurePerLevel(apValue), (function (apPerLevel) {
                            var amountActive = Ley_List$OptolithClient.countBy((function (e) {
                                    return Ley_Option$OptolithClient.isNone(e.customCost);
                                  }), heroEntry.active);
                            var index = amountActive + (
                              isEntryToAdd ? 0 : -1
                            ) | 0;
                            return Ley_List$OptolithClient.Safe.atMay(apPerLevel, index);
                          }));
          case 2 :
              return Ley_Option$OptolithClient.Monad.$great$great$eq(Activatable_SelectOptions$OptolithClient.getOption1(singleHeroEntry), (function (sid) {
                            if (typeof sid === "number") {
                              return ;
                            }
                            if (sid.HASH !== 345443720) {
                              return ;
                            }
                            if (!apValue.TAG) {
                              return ;
                            }
                            var apValues = apValue._0;
                            return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, sid.VAL, staticData.spells), (function ($$static) {
                                          return Ley_List$OptolithClient.Safe.atMay(apValues, IC$OptolithClient.icToIx($$static.ic));
                                        }));
                          }));
          case 3 :
              return Ley_Option$OptolithClient.Monad.$great$great$eq(Activatable_SelectOptions$OptolithClient.getOption1(singleHeroEntry), (function (sid) {
                            if (typeof sid === "number") {
                              return ;
                            }
                            if (sid.HASH !== 290194801) {
                              return ;
                            }
                            if (!apValue.TAG) {
                              return ;
                            }
                            var apValues = apValue._0;
                            return Ley_Option$OptolithClient.Monad.$great$great$eq(Curry._2(Ley_IntMap$OptolithClient.lookup, sid.VAL, staticData.skills), (function ($$static) {
                                          return Ley_List$OptolithClient.Safe.atMay(apValues, IC$OptolithClient.icToIx($$static.ic));
                                        }));
                          }));
          
        }
        break;
    
  }
}

function getApValue(isEntryToAdd, automaticAdvantages, staticData, hero, staticEntry, heroEntry, singleHeroEntry) {
  var isAutomatic = Ley_List$OptolithClient.elem(singleHeroEntry.id, automaticAdvantages);
  var modifyAbs;
  switch (staticEntry.TAG | 0) {
    case /* Disadvantage */1 :
        modifyAbs = Ley_Int$OptolithClient.negate;
        break;
    case /* Advantage */0 :
    case /* SpecialAbility */2 :
        modifyAbs = Ley_Function$OptolithClient.id;
        break;
    
  }
  var customCost = singleHeroEntry.customCost;
  if (customCost !== undefined) {
    return {
            apValue: Curry._1(modifyAbs, customCost),
            isAutomatic: isAutomatic
          };
  } else {
    return {
            apValue: Curry._1(modifyAbs, Ley_Option$OptolithClient.fromOption(0, getEntrySpecificCost(isEntryToAdd, staticData, hero, staticEntry, heroEntry, singleHeroEntry))),
            isAutomatic: isAutomatic
          };
  }
}

export {
  getApValue ,
  
}
/* Ley_IntMap-OptolithClient Not a pure module */