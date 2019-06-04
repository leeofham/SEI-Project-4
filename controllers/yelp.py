import os
import requests
from flask import Blueprint

router = Blueprint('yelp', __name__)

@router.route('/yelp/pubs')
def pubs():
    api_key = os.getenv('YELP_API_KEY')
    payload = {'location': 'london', 'limit': '50', 'term': 'pub'}
    headers = {'Authorization': f'Bearer {api_key}'}

    r = requests.get('https://api.yelp.com/v3/businesses/search', headers=headers, params=payload)
    print(r.text)
    return r.text

@router.route('/yelp/pubs/<pub_id>')
def pub(pub_id):
    api_key = os.getenv('YELP_API_KEY')
    headers = {'Authorization': f'Bearer {api_key}'}

    r = requests.get(f'https://api.yelp.com/v3/businesses/{pub_id}', headers=headers)
    return r.text
