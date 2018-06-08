import R from 'ramda';
import * as Data from '../types/data.d';
import { List } from './dataUtils';
import { match } from './match';

const addCustomCost = (
  cost: number | undefined,
  active: Data.ActiveObject,
): Data.ActiveObject =>
  typeof cost === 'number' ? { ...active, cost } : active;

/**
 * Converts the object generated by the list item to an object that can be
 * inserted into an array of ActiveObjects.
 * @param obj The entry for which you want to convert the object.
 * @param activate The object generated by the list item.
 */
export const convertUIStateToActiveObject =
  (activate: Data.ActivateArgs): Data.ActiveObject => {
    const { id, sel, sel2, input, tier, customCost } = activate;

    return addCustomCost(
      customCost,
      match<string, Data.ActiveObject>(id)
        .on('ADV_68', () => ({
          sid: sel,
          sid2: input
        }))
        .on('DISADV_33', () => ({
          sid: sel,
          ...(([7, 8].includes(sel as number) && input) ? { sid2: input } : {})
        }))
        .on('SA_9', () => ({
          sid: sel,
          sid2: input || sel2,
        }))
        .otherwise(() => R.pipe(
          (obj: Data.ActiveObject) => (sel !== undefined || input !== undefined) ? {
            ...obj,
            sid: input || sel,
          } : obj,
          obj => (obj.sid !== undefined && sel2 !== undefined) ? {
            ...obj,
            sid2: sel2,
          } : obj,
        )(tier !== undefined ? {
          tier,
        } : {}))
    );
  };

/**
 * Generates a list of ActiveObjects based on the given instance.
 */
export const convertActivatableToArray = (
  obj: Data.ActivatableDependent,
): List<Data.ActiveObjectWithId> => {
  return obj.active.map((e, index) => ({ ...e, id: obj.id, index }));
};

/**
 * Get all active items in an array.
 * @param state A state slice.
 */
export const getActiveFromState = (
  state: Map<string, Data.ActivatableDependent>,
): Data.ActiveObjectWithId[] => {
  return [...state.values()].reduce<Data.ActiveObjectWithId[]>((arr, e) => {
    return [...arr, ...convertActivatableToArray(e)];
  }, []);
};

interface ActiveObjectAny extends Data.ActiveObject {
	[key: string]: any;
}

/**
 * Returns only `sid`, `sid2` and `tier` property of passed `ActiveObject`.
 * @param activeObject
 */
export const getActiveObjectCore = (
  { sid, sid2, tier }: ActiveObjectAny,
): Data.ActiveObject => {
  return { sid, sid2, tier };
};
