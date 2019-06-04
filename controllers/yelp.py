import os
import requests
from flask import Blueprint, request

router = Blueprint('yelp', __name__)

@router.route('/yelp/pubs')
def pubs():
    lat = request.args.get('lat')
    lng = request.args.get('lng')

    api_key = os.getenv('YELP_API_KEY')
    payload = {
        'latitude': lat,
        'longitude': lng,
        'limit': '50',
        'term': 'pub'}
    headers = {'Authorization': f'Bearer {api_key}'}

    r = requests.get('https://api.yelp.com/v3/businesses/search', headers=headers, params=payload)

    return r.text

@router.route('/yelp/pubs/<pub_id>')
def pub(pub_id):
    api_key = os.getenv('YELP_API_KEY')
    headers = {'Authorization': f'Bearer {api_key}'}

    r = requests.get(f'https://api.yelp.com/v3/businesses/{pub_id}', headers=headers)
    return r.text
