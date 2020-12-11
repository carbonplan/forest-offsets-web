from utils import get_df, get_sheet


def make_projects():
    sheet = get_sheet("ifm", "Forest-Offset-Projects-v0.3")
    df, types = get_df(sheet)

    projects = []

    for i, row in df.iterrows():
        p = {
            'id': row[('project', 'opr_id', '')],
            'arbId': row[('project', 'arb_id', '')],
            'name': row[('project', 'name', '')],
            'owner': row[('project', 'opo', '')],
            'developer': row[('project', 'apd', '')],
            'coordinates': row[('project', 'coordinates', '')],
            'bufferContribution': row[('rp_1', 'buffer_contribution', '')],
            'arbocsReceived': row[('rp_1', 'allocation', '')],
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
