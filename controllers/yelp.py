import os
import requests
from flask import Blueprint

router = Blueprint('yelp', __name__)

@router.route('/yelp/pubs')
def pubs():
    api_key = os.getenv('YELP_API_KEY')
    print(api_key)
    payload = {'location': 'london', 'limit': '50', 'term': 'pub'}
    headers = {'Authorization': f'Bearer {api_key}'}

    r = requests.get('https://api.yelp.com/v3/businesses/search', headers=headers, params=payload)
    return r.text
