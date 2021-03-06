import { cnst, ident } from "../../Data/Function"
import { AppState } from "../Models/AppState"
import { combineReducerRecord } from "../Utilities/combineReducerRecord"
import { herolistReducer } from "./herolistReducer"
import { hasInitWithErrorsReducer, isLoadingReducer } from "./isReadyReducer"
import { localeReducer } from "./localeReducer"
import { uiReducer } from "./uiReducer"
import { wikiReducer } from "./wikiReducer"

export const appSlicesReducer =
  combineReducerRecord (AppState)
                       ({
                         herolist: herolistReducer,
                         l10n: localeReducer,
                         ui: uiReducer,
                         wiki: wikiReducer,
                         isLoading: isLoadingReducer,
                         hasInitWithError: hasInitWithErrorsReducer,
                         cache: cnst (ident),
                       })
