import { Box } from 'theme-ui'

# Summary

This website is a monitoring tool for tracking wildfires burning within forest carbon offsets projects enrolled under California’s cap-and-trade program. Of the 119 projects in the program that we are monitoring, the list on the left shows all projects that intersect wildfire perimeters during the 2022 fire season. For each project that intersects a wildfire perimeter, we report the total burned acreage, and at the top we report total acres burned across all offset projects. The map shows projects and fires, and labels those fires with project intersections.

# Methods

This site relies primarily on two datasets: the perimeters of projects enrolled in California’s forest carbon offsets program and the perimeters of wildfires. By intersecting these two datasets, we identify projects affected by fire and calculate the area burned.

Project perimeters come directly from the California Air Resources Board (CARB), which implements California’s cap-and-trade program. Specifically, CARB maintains an [ArcGIS dataset](https://webmaps.arb.ca.gov/ARBOCIssuanceMap/) of all currently enrolled offset projects. For each project, we calculate project area directly from the raw geometry. We also report information about the total number of offset credits awarded to each project, which we take from [CARB’s official issuance table](https://ww2.arb.ca.gov/our-work/programs/compliance-offset-program/arb-offset-credit-issuance). For display purposes in the web map, we apply minor buffering and simplification steps to the raw geometries before rendering. Finally, we exclude all Early Action projects from our monitoring.

Fire perimeters come from the National Interagency Fire Center (NIFC), an umbrella organization responsible for coordinating federal wildfire management. NIFC maintains several geographic datasets, including an authoritative version of [all wildland fire perimeters](https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-current-wildland-fire-perimeters/about) from the 2022 fire season.

We calculate burned area by intersecting these two datasets, using the raw geometries provided by CARB, rather than the simplified versions, for these calculations

We run our analysis pipeline every four hours to ensure we display the most up-to-date information.

export default ({ children }) => <Box>{children}</Box>
