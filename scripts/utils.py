import json
import pathlib

import gspread
import pandas as pd
from oauth2client.service_account import ServiceAccountCredentials

SECRET_FILE = pathlib.Path(__file__).parents[1] / 'secrets/google-sheets-key.json'


def ffill(data):
    """
    helper function to forward fill column labels
    """
    last = data[0]
    new = []
    for line in data:
        if line:
            new.append(line)
            last = line
        else:
            new.append(last)
    return new


def get_df(sheet):
    data = sheet.get('A1:D64')
    left = pd.DataFrame(data[1:], columns=data[0])
    data = sheet.get('BA1:CT64')
    right = pd.DataFrame(data[1:], columns=data[0])
    df = pd.concat([left, right], axis=1)

    levels = ['level0', 'level1', 'level2']
    left = df[levels].copy()
    left[levels[:2]] = left[levels[:2]].mask(left == '', None).ffill()
    index = pd.MultiIndex.from_frame(left)

    types = df['type']

    df.index = index
    df = df.drop(columns=levels + ['type'])
    df = df.transpose()
    df = df.iloc[1:]

    types.index = index

    for index, col in df.iteritems():
        df[index] = cast_col(col, types[index])

    return df, types


def get_sheet(sheet, doc):
    """
    helper function to open a specific google sheet
    """
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

    credentials = ServiceAccountCredentials.from_json_keyfile_name(SECRET_FILE, scope)

    gc = gspread.authorize(credentials)
    wks = gc.open(doc)
    sheet = wks.worksheet(sheet)
    return sheet


def json_loads(v):
    try:
        if 'SEE NOTE' in v:
            return None
        return json.loads(v)
    except Exception:
        print(v)
        raise


def cast_col(col, type_str):
    if type_str == 'YYYY-MM-DD':
        return col  # to_datetime(col, errors='coerce')
    elif type_str == 'str' or type_str == 'str:previous_project_id':
        return col.astype(str)
    elif type_str == 'bool':
        return col.astype(bool)
    elif type_str == 'int':
        return pd.to_numeric(col.str.replace(',', ''), errors='coerce', downcast='integer')
    elif type_str == 'float':
        return pd.to_numeric(col.str.replace(',', ''), errors='coerce', downcast='float')
    elif type_str == '[lon:float, lat:float]' or type_str == '[int]':
        return [json_loads(v) if v else [] for v in col]
    elif type_str == '[(is_intentional, size)]':
        return col  # TODO
    else:
        try:
            return [json_loads(v) if v else "" for v in col]
        except Exception:
            raise


def maybe_float(value):
    new = value.replace("$", "").replace(",", "")
    try:
        return float(new)
    except Exception:
        return value.strip()
