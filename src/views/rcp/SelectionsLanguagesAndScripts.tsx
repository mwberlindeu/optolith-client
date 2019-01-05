import * as classNames from 'classnames';
import * as React from 'react';
import { translate, UIMessagesObject } from '../../App/Utils/I18n';
import { getLevelElements } from '../../App/Utils/levelUtils';
import { isNumber } from '../../App/Utils/typeCheckUtils';
import { Checkbox } from '../../components/Checkbox';
import { Dropdown, DropdownOption } from '../../components/Dropdown';
import { LanguagesSelectionListItem, ScriptsSelectionListItem } from '../../types/data';
import { Just, List, Maybe, Nothing, OrderedMap, Record } from '../../utils/dataUtils';

export interface SelectionsLanguagesAndScriptsProps {
  scriptsActive: OrderedMap<number, number>;
  languagesActive: OrderedMap<number, number>;
  apLeft: number;
  apTotal: number;
  scripts: List<Record<ScriptsSelectionListItem>>;
  languages: List<Record<LanguagesSelectionListItem>>;
  locale: UIMessagesObject;
  adjustLanguage (id: number): (level: Maybe<number>) => void;
  adjustScript (id: number): (ap: number) => void;
}

export function SelectionsLanguagesAndScripts (props: SelectionsLanguagesAndScriptsProps) {
  const {
    apTotal,
    apLeft,
    scripts,
    scriptsActive,
    languages,
    languagesActive,
    locale,
    adjustLanguage,
    adjustScript,
  } = props;

  const levels = getLevelElements (3);

  return (
    <div className="lang_lit list">
      <h4>
        {translate (locale, 'rcpselections.labels.languagesandliteracytotaling')}
        {' '}
        {apTotal}
        {' AP ('}
        {apLeft}
        {' AP '}
        {translate (locale, 'rcpselections.labels.left')}
        {')'}
      </h4>
      <div className="languages-scripts">
        <div className="languages">
          {
            languages
              .map (obj => {
                const id = obj .get ('id');
                const name = obj .get ('name');
                const native = obj .get ('native');

                const disabled = native || !languagesActive .member (id) && apLeft <= 0;

                return (
                  <div key={id} className={classNames (disabled && 'disabled')}>
                    <Checkbox
                      checked={languagesActive .member (id) || native === true}
                      disabled={disabled}
                      onClick={
                        () => adjustLanguage (id)
                                             (languagesActive .member (id) ? Nothing () : Just (1))
                      }
                      >
                      {name}
                    </Checkbox>
                    {(() => {
                      if (native) {
                        return (
                          <Dropdown
                            className="tiers"
                            value={4}
                            options={List.of (Record.of<DropdownOption> ({ id: 4, name: 'MS' }))}
                            disabled
                            />
                        );
                      }
                      else if (languagesActive .member (id)) {
                        return (
                          <Dropdown
                            className="tiers"
                            value={languagesActive .lookup (id)}
                            onChange={
                              optionId => adjustLanguage (id)
                                                         (optionId .bind (Maybe.ensure (isNumber)))
                            }
                            options={
                              levels .filter (
                                e => (
                                  Maybe.fromMaybe (0)
                                                  (e .lookup ('id') .bind (Maybe.ensure (isNumber)))
                                  - languagesActive .findWithDefault (0) (id)
                                ) * 2
                                  <= apLeft
                              )
                            }
                            />
                        );
                      }

                      return undefined;
                    }) ()}
                  </div>
                );
              })
              .toArray ()
          }
        </div>
        <div className="scripts">
          {
            scripts
              .map (obj => {
                const id = obj .get ('id');
                const name = obj .get ('name');
                const cost = obj .get ('cost');
                const native = obj .get ('native');

                const disabled = native || !scriptsActive .member (id) && apLeft - cost < 0;

                return (
                  <div key={id} className={classNames (disabled && 'disabled')}>
                    <Checkbox
                      checked={scriptsActive .member (id) || native === true}
                      disabled={disabled}
                      onClick={() => adjustScript (id) (cost)}>
                      {name} ({cost} AP)
                    </Checkbox>
                  </div>
                );
              })
              .toArray ()
          }
        </div>
      </div>
    </div>
  );
}
