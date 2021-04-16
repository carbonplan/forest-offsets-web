import json

import fsspec
import numpy as np

short_names = {
    
}

with fsspec.open(
    "https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/forest-offsets-database-v1.0.json",
    "r",
) as f:
    data = json.load(f)

with fsspec.open(
    "https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/archive/results/reclassification-crediting-error.json",
    "r",
) as f:
    overcrediting = json.load(f)

def get_overcrediting(condition=None, percentage=True, display=False):
    if condition is not None:
        keys = list(map(lambda x: x['id'], filter(condition, data)))
    else:
        keys = list(map(lambda x: x['id'], data))
    keys = list(filter(lambda x: x in overcrediting.keys(), keys))
    if len(keys) < 1:
        return None
    total = []
    for i in range(1000):
        total.append(np.nansum([overcrediting[key]['delta_arbocs'][i] for key in keys]))
    total_percentage = list(np.percentile(
        total, [5, 50, 95]) / np.sum([[x for x in data if x['id'] == key][0]['arbocs']['issuance'] for key in keys]
    ))
    total_arbocs = list(np.percentile(total, [5, 50, 95]))
    return {
        'percent': total_percentage,
        'arbocs': total_arbocs
    }

subset = list(map(lambda x: {
    'id': x['id'],
    'name': x['name'],
    'owners': x['owners'], 
    'developers': x['developers'], 
    'attestor': x['attestor'], 
    'shape_centroid': x['shape_centroid'], 
    'supersection_ids': x['supersection_ids'], 
    'carbon': x['carbon'], 
    'arbocs': {'issuance': x['arbocs']['issuance']}, 
    'over_crediting': get_overcrediting(condition=lambda d: d['id'] == x['id']) 
    }, data))

with open('data/projects.js', 'w') as f:
    f.write('module.exports=' + json.dumps(subset))
