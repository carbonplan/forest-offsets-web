import Article from '../components/article'
import PlanYourProject from './components/plan-your-project'
import NorthernCalifornia from './components/northern-california'

export const meta = {
  id: 'forest-offsets-retrospective',
  color: 'pink',
  title: 'Forest offsets retrospective',
  summary:
    'Calculations of forest offset credits and how they can be manipulated.',
  quotes: [],
}

export const sidenotes = {}

# Forest offsets retrospective

## How boundaries can inflate credits

This simple visualization illustrates how project boundaries can artificially inflate credits. In the first scenario, the boundary through the middle exactly matches the forest productivity (green is high, orange is low). In the second scenario, the boundary is altered. Placing a project in the region jutting out artificially inflates the credits.

<PlanYourProject/>

## Projects and boundaries

Here we show projects as circles overlaid on top of different regional boundaries. You can use the map to zoom to different regions, and turn different boundary layers on or off. The chart to the right shows project credits using either the CAR supersection boundaries or the Baileys ecoregions.

<NorthernCalifornia/>

## Terms of engagement

CarbonPlan received a grant from Microsoft's AI for Earth program to support this work. Microsoft did not exercise any control over the output. CarbonPlan is solely responsible for the content of this writeup, which does not reflect the views of Microsoft or any other organization.

### Questions? Interested in collaborating on these problems? Email us at [hello@carbonplan.org](mailto:hello@carbonplan.org)

export default ({ children }) => <Article meta={meta}>{children}</Article>
