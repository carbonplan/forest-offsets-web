import { Box } from 'theme-ui'

## Summary

This website and associated data products present a digitization of improved forest management (IFM) projects that earned offset credits in California’s carbon market as of September 2020. All project materials are based on publicly available resources, primarily derived from participating carbon offset registries and the California Air Resources Board (ARB).

## Usage

The project panel lists each project by an abbreviated project name and the project’s offset project registry ID (e.g. CAR123). Below each project name, we display the name of the developer associated with the project and the county in which the project is located.

You can click (or tap) on a project to see additional information related to carbon crediting calculations, including the number of credits issued (referred to as ARBOCs each of which represents 1tCO₂), the initial carbon stock measured at the project site (tCO₂ per acre), and the regional average or “common practice” determined by ARB for comparable forest types (tCO₂ per acre). These latter two data points — initial carbon stock and common practice — are the primary determinants of the number of offset credits ARB awards in an IFM project’s initial crediting period, which generates the majority of total project credits for IFM projects.

For some projects, we also include the results from our analysis of crediting error. We describe that analysis in more detail in [our article](https://carbonplan.org/research/forest-offsets-explainer). Briefly, for each project, we construct an alternative definition of common practice that uses the actual project species composition data, and thus better reflects the local ecology. We then ask how many credits the project would have received assuming that alternative, which implies either over-crediting or under-crediting.

The map shows the geographic boundaries of each project, each labeled by its project ID.

On desktop or tablet, a minimap in the lower right shows each project as a circle. You can click and pan the box in the minimap to quickly move to a different area. Also on desktop or tablet only, clicking a project ID on the main map will highlight that project in the list, and clicking “Show project on a map” when viewing project details in the list will zoom the map to that project.

On mobile, you can move between the "Projects" and "Map" tabs by tapping at the bottom. If you find a project in the list tap "Show project on map" to switch to the map and see its location.

## Methods

Most data are directly sourced from project-submitted “offset project data reports” (OPDRs), the official documentation offset projects must submit to ARB. These documents are made available by the three offset project registries that help ARB administer California’s offset program: [the Climate Action Reserve (CAR)](https://thereserve2.apx.com/myModule/rpt/myrpt.asp?r=111), [the American Carbon Registry (ACR)](https://acr2.apx.com/myModule/rpt/myrpt.asp?r=111), and [Verra (VCS)](https://registry.verra.org/app/search/CA_OPR). We only include those IFM projects that joined under California’s compliance program, rather than those that began as “Early Action” projects and were subsequently transitioned into the compliance program.

Shapefiles for projects were obtained from the California Air Resources Board’s online [Credit Issuance Map](https://webmaps.arb.ca.gov/ARBOCIssuanceMap/), using the ArcGIS MapServer API. After downloading each shapefile, we buffered and combined polygons within close proximity of each other. We then took the centroid of each of these combined polygons to yield a list of centroids for each project.

For each project, we transcribed project details described in the “initial” and “annual” OPDRs. In the rare case where initial and/or annual OPDRs were unavailable, we sourced information from the project’s listing information (which is also hosted by the offset registries). For each project, we record the CARB supersections it occupies and total project acreage. We also transcribed information about each project’s assessment areas, including information about the assessment area site class, total acreage, and the species composition of the land assigned to each assessment area. For some projects, species information was only available on a project-wide basis (e.g., no information was available on a per-assessment-area basis), which we recorded under the special assessment area code 999.

For the initial reporting period, we recorded onsite carbon stocks (IFM-1 and IFM-3) and the carbon stocks contained within wood products (IFM-7 and IFM-8), both for the baseline and project scenarios as well as for the project’s calculated secondary effects (including emissions leakage). We also created a list of all entities that have owned specific offset projects, as well as enumerated the entities that played a role in developing (e.g., financing) individual offset projects.

## Data access

The primary project data rendered on this website is available in [CSV](https://carbonplan.blob.core.windows.net/carbonplan-retro/projects/retro-db-light-v1.0.csv) and [JSON](https://carbonplan.blob.core.windows.net/carbonplan-retro/projects/retro-db-light-v1.0.json) formats. The shapefiles rendered in the map can be accessed at <span style={{overflowWrap: 'break-word'}}>https://carbonplan.blob.core.windows.net/carbonplan-retro/projects/{id}/shape.json</span> where {id} is the ID of the project. Additional details on the construction of these datasets and our analyses of them are available in our [article](https://carbonplan.org/research/forest-offsets-explainer).

## Acknowledgements

The digitization of public project records and release of a digitized dataset was funded through a grant to CarbonPlan from the Microsoft AI for Earth program.

## Version

v1.0.0 (released 04/29/2021)

export default ({ children }) => <Box>{children}</Box>
