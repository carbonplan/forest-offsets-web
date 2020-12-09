from utils import get_df, get_sheet


def make_projects():
    sheet = get_sheet("Sheet2", "Forest-Offset-Projects")
    df, types = get_df(sheet)

    projects = []

    for i, row in df.iterrows():
        p = {
            'id': row[('project', 'project_id', '')],
            'arbId': row[('project', 'arb_id', '')],
            'name': row[('project', 'name', '')],
            'owner': row[('project', 'opo', '')],
            'developer': row[('project', 'apd', '')],
            'coordinates': row[('project', 'coordinates', '')],
            'bufferContribution': row[('rp[0]', 'buffer_contribution', '')],
            'arbocsReceived': row[('rp[0]', 'allocation', '')],
            'carbon': {
                'initialCarbonStock': {
                    'value': row[('baseline', 'initial_carbon_stock', '')],
                    'units': 'tCO2e-1',
                },
                'commonPractice': {
                    'value': row[('baseline', 'common_practice', '')],
                    'units': 'tCO2e-1',
                },
            },
            'permanence': {
                'arbTotalRisk': row[('project', 'reversal_risk', '')],
                'arbFireRisk': row[('project', 'fire_risk', '')],
                'mtbsFireRisk': -9999,
            },
        }

        projects.append(p)

    return projects
