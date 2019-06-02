import { Nothing } from "../../../../Data/Maybe";
import { IdPrefixes } from "../../../Constants/IdPrefixes";
import { Cantrip } from "../../../Models/Wiki/Cantrip";
import { prefixId } from "../../IDUtils";
import { mergeRowsById } from "../mergeTableRows";
import { mensureMapNatural, mensureMapNaturalList, mensureMapNonEmptyString } from "../validateMapValueUtils";
import { lookupKeyValid, mapMNamed, TableType } from "../validateValueUtils";
import { toSourceLinks } from "./Sub/toSourceLinks";

export const toCantrip =
  mergeRowsById
    ("toCantrip")
    (id => lookup_l10n => lookup_univ => {
      // Shortcuts

      const checkL10nNonEmptyString =
        lookupKeyValid (mensureMapNonEmptyString) (TableType.L10n) (lookup_l10n)

      const checkUnivNaturalNumber =
        lookupKeyValid (mensureMapNatural) (TableType.Univ) (lookup_univ)

      const checkUnivNaturalNumberList =
        lookupKeyValid (mensureMapNaturalList ("&")) (TableType.Univ) (lookup_univ)

      // Check and convert fields

      const ename = checkL10nNonEmptyString ("name")

      const etraditions = checkUnivNaturalNumberList ("traditions")

      const eproperty = checkUnivNaturalNumber ("property")

      const eeffect = checkL10nNonEmptyString ("effect")

      const erange = checkL10nNonEmptyString ("range")

      const eduration = checkL10nNonEmptyString ("duration")

      const etarget = checkL10nNonEmptyString ("target")

      const note = lookup_l10n ("note")

      const esrc = toSourceLinks (lookup_l10n)

      // Return error or result

      return mapMNamed
        ({
          ename,
          etraditions,
          eproperty,
          eeffect,
          erange,
          eduration,
          etarget,
          esrc,
        })
        (rs => Cantrip ({
          id: prefixId (IdPrefixes.CANTRIPS) (id),
          name: rs.ename,
          tradition: rs.etraditions,
          property: rs.eproperty,
          effect: rs.eeffect,
          range: rs.erange,
          duration: rs.eduration,
          target: rs.etarget,
          note,
          src: rs.esrc,
          category: Nothing,
        }))
    })