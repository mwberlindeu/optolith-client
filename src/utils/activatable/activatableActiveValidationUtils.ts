/**
 * Contains helper functions for calculating restrictions of changing active
 * `Activatables`: Minimum level, maximum level and if the entry can be removed.
 *
 * @file src/utils/activatableActiveValidationUtils.ts
 * @author Lukas Obermann
 * @since 1.1.0
 */

import * as R from 'ramda';
import { isObject } from 'util';
import * as Wiki from '../../App/Models/Wiki/wikiTypeHelpers';
import { countActiveGroupEntries } from '../../App/Utils/entryGroupUtils';
import { getAllEntriesByGroup, getHeroStateItem } from '../../App/Utils/heroStateUtils';
import { isOwnTradition } from '../../App/Utils/Increasable/liturgicalChantUtils';
import { match } from '../../App/Utils/match';
import { isBoolean } from '../../App/Utils/typeCheckUtils';
import { getWikiEntry } from '../../App/Utils/WikiUtils';
import { ActivatableCategory, Categories } from '../../constants/Categories';
import * as Data from '../../types/data';
import { Just, List, Maybe, Nothing, OrderedMap, OrderedSet, Record } from '../dataUtils';
import { flattenPrerequisites } from '../prerequisites/flattenPrerequisites';
import { validateLevel, validateObject } from '../prerequisites/validatePrerequisitesUtils';
import { countActiveSkillEntries } from './activatableSkillUtils';
import { isStyleValidToRemove } from './ExtendedStyleUtils';
import { isActive } from './isActive';
import { getActiveSelections } from './selectionUtils';
import { getBlessedTraditionFromWiki, getMagicalTraditions } from './traditionUtils';

const hasRequiredMinimumLevel = (
  tiers: Maybe<number>,
  minTier: Maybe<number>
): boolean =>
  Maybe.isJust (tiers) && Maybe.isJust (minTier);

const isRequiredByOthers = (
  instance: Record<Data.ActivatableDependent>,
  active: Record<Data.ActiveObject>
): boolean =>
  instance
    .get ('dependencies')
    .any (
      e => isBoolean (e)
        ? (
          e && instance
            .get ('active')
            .length () === 1
        )
        : (
          (active as Record<Data.DependencyObject>).equals (e)
          || (
            Maybe.isJust (e.lookup ('tier'))
            && Maybe.isJust (active.lookup ('tier'))
            && Maybe.fromMaybe (false) (
              e.lookup ('active')
                .fmap (
                  ea => ea === active
                    .lookup ('tier')
                    .gte (e.lookup ('tier'))
                )
            ))
        )
    );

/**
 * Even if th
 */
const getSuperIsRemoveDisabled = (
  tiers: Maybe<number>,
  minTier: Maybe<number>,
  instance: Record<Data.ActivatableDependent>,
  active: Record<Data.ActiveObject>
) => (isDisabled: boolean): boolean =>
  isDisabled
  // Disable if a minimum level is required
  || hasRequiredMinimumLevel (tiers, minTier)
  // Disable if other entries depend on this entry
  || isRequiredByOthers (instance, active);

/**
 * Checks if you can somehow remove an ActiveObject from the given entry.
 * @param state The present state of the current hero.
 * @param obj The entry.
 * @param sid The sid of the ActiveObject
 */
const isRemovalDisabledEntrySpecific = (
  wiki: Record<Wiki.WikiAll>,
  state: Record<Data.HeroDependent>,
  entry: Wiki.WikiActivatable,
  instance: Record<Data.ActivatableDependent>,
  active: Record<Data.ActiveObject>,
  minTier: Maybe<number>
): boolean => {
  return R.pipe (getSuperIsRemoveDisabled (entry.lookup ('tiers'), minTier, instance, active)) (
    match<string, boolean> (entry.get ('id'))
      .on (
        R.both (
          R.equals ('ADV_16'),
          () => Maybe.fromMaybe (false) (
            active.lookup ('sid')
              .bind (
                sid => state.get ('skills')
                  .lookup (sid as string)
              )
              .bind (
                skill => state.lookup ('experienceLevel')
                  .bind (
                    e => wiki.lookup ('experienceLevels')
                      .bind (slice => slice.lookup (e))
                  )
                  .fmap (R.pipe (
                    el => el.lookup ('maxSkillRating'),
                    Maybe.fmap (R.add (
                      instance.get ('active')
                        .foldl<number> (
                          e => obj =>
                            obj.lookup ('sid')
                              .equals (active.lookup ('sid')) ? e + 1 : e
                        ) (0)
                    )),
                    Maybe.equals (skill.lookup ('value'))
                  ))
              )
          )
        ),
        R.T
      )
      .on (
        R.both (
          R.equals ('ADV_17'),
          () => Maybe.fromMaybe (false) (
            active.lookup ('sid')
              .bind (
                sid => state.get ('combatTechniques')
                  .lookup (sid as string)
              )
              .bind (
                skill => state.lookup ('experienceLevel')
                  .bind (
                    e => wiki.lookup ('experienceLevels')
                      .bind (slice => slice.lookup (e))
                  )
                  .fmap (R.pipe (
                    el => el.lookup ('maxCombatTechniqueRating'),
                    Maybe.fmap (R.inc),
                    Maybe.equals (skill.lookup ('value'))
                  ))
              )
          )
        ),
        R.T
      )
      .on (
        R.both (
          List.elem_ (List.of (
            'SA_70',
            'SA_255',
            'SA_345',
            'SA_346',
            'SA_676',
            'SA_677',
            'SA_678',
            'SA_679',
            'SA_680',
            'SA_681'
          )),
          R.both (
            () => R.lte (
              getMagicalTraditions (state.get ('specialAbilities'))
                .length (),
              1
            ),
            R.either (
              () => R.gt (countActiveSkillEntries (state, 'spells'), 0),
              () => R.gt (OrderedSet.size (state.get ('cantrips'))) (0)
            )
          )
        ),
        R.T
      )
      .on (
        R.both (
          List.elem_ (List.of (
            'SA_86',
            'SA_682',
            'SA_683',
            'SA_684',
            'SA_685',
            'SA_686',
            'SA_687',
            'SA_688',
            'SA_689',
            'SA_690',
            'SA_691',
            'SA_692',
            'SA_693',
            'SA_694',
            'SA_695',
            'SA_696',
            'SA_697',
            'SA_698'
          )),
          R.either (
            () => R.gt (countActiveSkillEntries (state, 'spells'), 0),
            () => R.gt (OrderedSet.size (state.get ('cantrips'))) (0)
          )
        ),
        R.T
      )
      .on (
        R.both (
          R.equals ('SA_164'),
          () => {
            const armedStyleActive = countActiveGroupEntries (wiki, state, 9);
            const unarmedStyleActive = countActiveGroupEntries (wiki, state, 10);
            const totalActive = armedStyleActive + unarmedStyleActive;

            return totalActive >= 3
              || armedStyleActive >= 2
              || unarmedStyleActive >= 2;
          }
        ),
        R.T
      )
      .on (
        R.both (
          R.equals ('SA_266'),
          () => R.gte (countActiveGroupEntries (wiki, state, 13)) (2)
        ),
        R.T
      )
      .on (
        R.both (
          List.elem_ (List.of ('SA_623', 'SA_625', 'SA_632')),
          () => Maybe.fromMaybe (false) (
            getBlessedTraditionFromWiki (
              wiki.get ('specialAbilities'),
              state.get ('specialAbilities')
            )
              .bind (
                blessedTradition => state.lookup ('liturgicalChants')
                  .fmap (OrderedMap.elems)
                  .fmap (R.pipe (
                    (list: List<Record<Data.ActivatableSkillDependent>>) =>
                      list.filter (e => e.get ('active')),
                    Maybe.mapMaybe (
                      e => wiki.lookup ('liturgicalChants')
                        .bind (
                          slice => e.lookup ('id')
                            .bind (
                              id => OrderedMap.lookup<string, Record<Wiki.LiturgicalChant>> (id)
                                                                                            (slice)
                            )
                        )
                    ),
                    list => list.any (e => !isOwnTradition (blessedTradition, e))
                  ))
              )
          )
        ),
        R.T
      )
      .on (
        R.both (
          () => Maybe.fromJust<ActivatableCategory> (
            entry.lookup ('category')
          ) === Categories.SPECIAL_ABILITIES,
          () => R.equals (
            isStyleValidToRemove (
              state,
              Maybe.pure (entry as Record<Wiki.SpecialAbility>)
            ),
            false
          )
        ),
        R.T
      )
      .otherwise (
        () => instance .get ('dependencies')
          .any (dep => {
            if (typeof dep === 'object' && Maybe.isJust (dep .lookup ('origin'))) {
              return Maybe.fromMaybe (true) (
                getWikiEntry<Wiki.WikiActivatable>
                  (wiki)
                  (Maybe.fromJust (dep.lookup ('origin') as Just<string>))
                  .bind (
                    originEntry => flattenPrerequisites (originEntry.get ('prerequisites'))
                                                        (originEntry.lookup ('tiers')
                                                          .alt (Just (1)))
                                                        (Nothing ())
                      .find ((r): r is Wiki.AllRequirementObjects => {
                        if (typeof r === 'string') {
                          return false;
                        }
                        else {
                          const id = r.get ('id');
                          const origin = dep.lookup ('origin');

                          return id instanceof List
                            && Maybe.isJust (origin)
                            && id.elem (Maybe.fromJust (origin));
                        }
                      })
                      .fmap (
                        (req: Wiki.AllRequirementObjects) =>
                          (req.get ('id') as List<string>)
                            .foldl<number> (
                              acc => e => validateObject (
                                wiki,
                                state,
                                req.merge (Record.of ({
                                  id: e,
                                })) as Wiki.AllRequirementObjects,
                                entry.get ('id')
                              ) ? acc + 1 : acc
                            ) (0) > 1
                      )
                  )
              );
            }
            else if (typeof dep === 'object') {
              const eSid = dep.lookup ('sid');

              if (Maybe.isJust (eSid) && Maybe.fromJust (eSid) instanceof List) {
                const list = Maybe.fromJust (eSid) as List<number>;

                const maybeSid = active.lookup ('sid')
                  .bind<boolean> (sid => {
                    if (list.elem (sid as number)) {
                      return getActiveSelections (Maybe.pure (instance))
                        .fmap (
                          activeSelections => !activeSelections.any (
                            n => n !== sid && activeSelections.elem (n as number)
                          )
                        );
                    }
                    else {
                      return Maybe.empty ();
                    }
                  });

                if (Maybe.isJust (maybeSid)) {
                  return Maybe.fromJust (maybeSid);
                }
              }
            }

            return false;
          })
      )
  );
};

const getSermonsAndVisionsMinTier = (
  wiki: Record<Wiki.WikiAll>,
  state: Record<Data.HeroDependent>,
  more: boolean,
  gr: number
): Maybe<number> => Maybe.ensure (more ? R.lt (3) : R.gt (3)) (
  getAllEntriesByGroup (
    wiki.get ('specialAbilities'),
    state.get ('specialAbilities'),
    gr
  )
    .filter (isActive)
    .length ()
)
  .fmap (more ? R.add (-3) : R.subtract (3));

/**
 * Get minimum valid tier.
 * @param dependencies The current instance dependencies.
 */
export function getMinTier (
  wiki: Record<Wiki.WikiAll>,
  state: Record<Data.HeroDependent>,
  obj: Record<Data.ActiveObjectWithId>,
  dependencies: List<Data.ActivatableDependency>,
  sid: Maybe<string | number>
): Maybe<number> {
  return R.pipe (
    dependencies.foldl<Maybe<number>> (
      min => dependency =>
        Maybe.ensure (
          isObject as (e: Data.ActivatableDependency) => e is Record<Data.DependencyObject>
        ) (dependency)
          .bind (
            e => e.lookup ('tier')
              .bind (Maybe.ensure (
                tier => min.alt (Maybe.pure (0))
                  .lt (Maybe.pure (tier))
                  && Maybe.isJust (e.lookup ('sid'))
                  && e.lookup ('sid')
                    .equals (sid)
              ))
          )
          .alt (min)
    )
  ) (
    match<string, Maybe<number>> (obj.get ('id'))
      .on (
        'ADV_58',
        () => Maybe.ensure (R.lt (3)) (countActiveSkillEntries (state, 'spells'))
          .fmap (R.add (-3))
      )
      .on ('ADV_79', () => getSermonsAndVisionsMinTier (
        wiki,
        state,
        true,
        24
      ))
      .on ('ADV_80', () => getSermonsAndVisionsMinTier (
        wiki,
        state,
        true,
        27
      ))
      .on ('DISADV_72', () => getSermonsAndVisionsMinTier (
        wiki,
        state,
        false,
        24
      ))
      .on ('DISADV_73', () => getSermonsAndVisionsMinTier (
        wiki,
        state,
        false,
        27
      ))
      .otherwise (Maybe.empty)
  );
}

/**
 * Get maximum valid tier.
 */
export const getMaxTier = (
  wiki: Record<Wiki.WikiAll>,
  state: Record<Data.HeroDependent>,
  prerequisites: Wiki.LevelAwarePrerequisites,
  dependencies: List<Data.ActivatableDependency>,
  id: string
) => {
  return match<string, Maybe<number>> (id)
    .on (
      R.both (
        R.equals ('SA_667'),
        R.always (Maybe.isJust (state.lookup ('pact')))
      ),
      () => state.lookup ('pact')
        .bind (pact => pact.lookup ('level'))
    )
    .otherwise (() => !(prerequisites instanceof List) ? validateLevel (
      wiki,
      state,
      prerequisites,
      dependencies,
      id
    ) : Maybe.empty ());
};

/**
 * Checks if the given ActiveObject can be removed or changed in tier.
 * @param obj The ActiveObject with origin id.
 * @param state The current hero's state.
 */
export const getIsRemovalOrChangeDisabled = (
  obj: Record<Data.ActiveObjectWithId>,
  wiki: Record<Wiki.WikiAll>,
  state: Record<Data.HeroDependent>
): Maybe<Record<Data.ActivatableActivationValidationObject>> => {
  return getWikiEntry<Wiki.WikiActivatable> (wiki) (obj.get ('id'))
    .bind (
      wikiEntry => getHeroStateItem<Record<Data.ActivatableDependent>> (
        obj.get ('id')
      ) (state)
        .fmap (instance => {
          const minTier = getMinTier (
            wiki,
            state,
            obj,
            instance.get ('dependencies'),
            obj.lookup ('sid')
          );

          return obj.mergeMaybe (Record.of ({
            disabled: isRemovalDisabledEntrySpecific (
              wiki,
              state,
              wikiEntry,
              instance,
              obj as Record<any>,
              minTier
            ),
            minTier,
            maxTier: getMaxTier (
              wiki,
              state,
              wikiEntry.get ('prerequisites'),
              instance.get ('dependencies'),
              obj.get ('id')
            ),
          })) as Record<Data.ActivatableActivationValidationObject>;
        })
    );
};
