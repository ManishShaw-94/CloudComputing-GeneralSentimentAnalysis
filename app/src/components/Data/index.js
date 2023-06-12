/*

A utility file which imports all the needed JSON files and simply exports it.
This avoids the unnecessary cluttering of imports in the components which need
these JSON files.

*/

import VICAge from "../../../data/age/VIC.json";
import WAAge from "../../../data/age/WA.json";
import TASAge from "../../../data/age/TAS.json";
import SAAge from "../../../data/age/SA.json";
import QLDAge from "../../../data/age/QLD.json";
import NTAge from "../../../data/age/NT.json";
import NSWAge from "../../../data/age/NSW.json";
import ACTAge from "../../../data/age/ACT.json";

import VICFinance from "../../../data/finance/VIC.json";
import WAFinance from "../../../data/finance/WA.json";
import TASFinance from "../../../data/finance/TAS.json";
import SAFinance from "../../../data/finance/SA.json";
import QLDFinance from "../../../data/finance/QLD.json";
import NTFinance from "../../../data/finance/NT.json";
import NSWFinance from "../../../data/finance/NSW.json";
import ACTFinance from "../../../data/finance/ACT.json";

export {
  VICAge,
  VICFinance,
  WAAge,
  WAFinance,
  TASAge,
  TASFinance,
  SAAge,
  SAFinance,
  QLDAge,
  QLDFinance,
  NTAge,
  NTFinance,
  NSWAge,
  NSWFinance,
  ACTAge,
  ACTFinance,
};
