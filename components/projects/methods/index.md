import { Box } from 'theme-ui'

## Summary

This website and associated data products present a digitization of improved forest management (IFM) projects that earned offset credits in California’s carbon market as of September 2020.The initial dataset includes only those projects that joined California’s compliance program, rather than those that began as “Early Action” projects and were subsequently transitioned into the compliance program, because public data for the first reporting period of Early Action projects are less consistent and not standardized. All project materials are based on publicly available resources, primarily derived from participating carbon offset registries and the California Air Resources Board (ARB).

## Usage

The panel on the left lists each project by its title, as recorded in official source documents. For convenience, we display three primary metadata elements for each project below the title: the project’s registry ID, the total number of California Air Resources Board offset credits (ARBOCs) received, and a historical estimate of fire risk. 

You can click on a project to expand it and see additional information. Metadata includes the project ID from ARB, its primary owner, its primary developer, and the attestor who signed the official paperwork submitted to ARB. Note that the ARB project ID is a specific designation from ARB, whereas the project’s registry ID is a number provided by one of the three private sector offset registries that host project data and help implement ARB’s offsets program. 

Data related to carbon crediting calculations includes the number of ARBOCs issued, the initial carbon stock measured at the project site (tCO2 per acre), and the common practice ARB determines for comparable forest types (tCO2 per acre). These latter two data points — initial carbon stock and common practice — drive the number of offset credits ARB awards in a project’s initial crediting period, which generates the majority of total project credits for IFM projects. A checkmark next to reported ARBOCs indicates that we have been able to independently reproduce the ARBOC calculation using the applicable ARB offset protocol and the data projects report on official project registries (see Methods). 

Finally, we also report three risk estimates: the total project risk assigned by ARB, the fire risk assigned by ARB, and the fire risk independently estimated based on data from the Monitoring Trends in Burn Severity (MTBS) database. All three address the 100-year permanence standard required by the California forest offset protocols. The total project risk reports the percentage of gross project credits set aside by ARB in a [“buffer pool”](https://carbonplan.org/research/offset-project-fire) for insurance purposes, which is intended to reflect a conservative estimate of project-level risks over a 100-year period; the ARB-assigned fire risk is a component of total project risks used in ARB’s offset protocols. We separately calculate the MTBS fire risk as the chance of a moderate or severe fire occurring during a 100-year period, based on observed historical fire frequencies (see Methods). 

The map on the right shows the geographical extent of each project. Each circle in the minimap in the lower right also represents a project. You can use the toggle above the list to restrict the list to only show projects within the view of the map. You can also click the minimap in the lower right corner to quickly move to a different area. 

## Methods

Most data are directly sourced from project-submitted “offset project data reports” (OPDRs), the official documentation offset projects submit to receive ARB offset credits. These documents are made available by the offset project registries that help ARB administer California’s offset program. Three registries host OPDR documents: [The Climate Action Reserve (CAR)](https://thereserve2.apx.com/myModule/rpt/myrpt.asp?r=111), [The American Carbon Registry (ACR)](https://acr2.apx.com/myModule/rpt/myrpt.asp?r=111), and [Verra (VCS)](https://registry.verra.org/app/search/CA_OPR).

Shapefiles for projects were obtained from… and were further processed by….

For each project, we manually transcribed project details described in the “initial” and “annual” OPDRs. In the rare case where initial and/or annual OPDRs were unavailable, we sourced information from the project’s listing information (which is also hosted by the offset registries). For the initial reporting period, we recorded onsite carbon stocks and the carbon stocks contained within wood products, both for the baseline and project scenarios as well as for the project’s calculated secondary effects (including emissions leakage). These data allowed us to recalculate the number of ARBOCs that should have been granted to the project for the first reporting period. 

When we were able to recalculate the number of ARBOCs ultimately awarded to the project (as recorded in the [ARB issuance table](https://ww2.arb.ca.gov/our-work/programs/compliance-offset-program/arb-offset-credit-issuance), we display a green checkmark next to the reported allocation. To increase confidence in our ability to replicate the ARB issuance table, we had two individuals separately implement the applicable protocol calculations using the same data shown here and reached identical outcomes for all projects. 

We calculated empirical fire risks using methods similar to those described in Anderegg et al. (2020). Briefly, we used the Monitoring Trends in Burn Severity (MTBS) dataset, which includes 30m annual rasters of burn severity as well as burned area boundary polygons for individual fires (Eidenshink et al, 2007). The dataset covers fires from 1984-2018 and includes fires larger than 500 acres (1000 acres in the Western U.S.) for the continental U.S., Alaska, Hawaii, and Puerto Rico. To estimate empirical fire risk, within each geographic supersection, per year, we computed an annual burn probability as the fraction of pixels in that ecoregion labeled as moderate or severe fire. These burn probabilities were averaged over the period 2001-2018 to estimate an average annual burn probability. To convert burn probability into an integrated 100-year risk, we computed the probability of at least one fire under a binomial distribution with 100 trials and success given by the burn probability. Finally, we assigned each project a risk based on the supersection in which it belongs. This is a highly simplified analysis that does not account for spatial or temporal autocorrelation or attempt to model any drivers of fire risk or how they will change over time. 

An important caveat applies when comparing these MTBS-based fire risks with the share of project credits ARB sets aside for the offset buffer pool to account for fire and total project reversal risks. Our MTBS fire risk calculation represents the expected chance that a project area experiences a moderate or severe fire at some point over a 100-year period. Not only will fire risk increase in a warming world, but fire risks are not the same as expected offset credit reversals from forest carbon losses due to fire. 

When a fire impacts a forest offset project, some fraction of the carbon stored in that forest will burn. The total impact on the carbon offset program depends on how much carbon is lost from fire — or “reversed,” as the offset protocols describe these consequences. Under the offset program’s rules (see Section 95983 of the [program regulations](https://ww2.arb.ca.gov/sites/default/files/classic//cc/capandtrade/ct_reg_unofficial.pdf)), ARB will retire offset credits from the buffer pool equal to the project’s reversal. If a fire reduces standing carbon stock below the project’s baseline scenario, however, then ARB will terminate the project and retire offset credits from the buffer pool equal to the project’s total credits to date. 

As a result, comparing our MTBS fire risk with ARB’s estimated fire and total risks is not a strictly apples-to-apples comparison. With this caveat in mind, we believe the comparison is nevertheless a reasonable proxy for evaluating the adequacy of the protocol’s treatment of fire risks. Our method for calculating MTBS-based fire risks screens out low-intensity fires that are unlikely to result in project terminations, leaving only moderate and severe events that are likely to lead to project terminations. Because project terminations require the buffer pool to retire offset credits equal to the project’s total historical credits, this method will tend to produce risk numbers that are comparable to those selected by ARB’s. To the extent any of the fire events used to generate these risks would not result in a complete reversal, our analysis overestimates actual fire risk; in contrast, our methods may underestimate actual fire risks if the chances of moderate or severe fires increase in the decades ahead due to climate change or other drivers.

## Data access

We provide the data rendered on this website in [CSV] and [JSON] formats. The shapefiles used to render the projects can be accessed at https://.../{id}.json where {id} is the ID of the project.

## Acknowledgements

These data products and the website were developed jointly by the following contributors (in alphabetical order): Grayson Badgley (Black Rock Forest / Columbia University), Danny Cullenward (CarbonPlan), Jeremy Freeman (CarbonPlan), Joe Hamman (CarbonPlan), Barbara Haya (UC Berkeley).

The development of this project was funded, in part, through a grant to CarbonPlan from the Microsoft AI for Earth program.

## References

Anderegg et al. (2020) Climate-driven risks to the climate mitigation potential of forests, Science, [DOI](https://doi.org/10.1126/science.aaz7005)

Eidenshink et al. (2007) A project for monitoring trends in burn severity, Fire Ecology, [DOI](https://doi.org/10.4996/fireecology.0301003)

export default ({ children }) => <Box>{children}</Box>
