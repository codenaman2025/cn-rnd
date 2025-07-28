import requests

def load_lottie_url(url: str):
    """Load a Lottie animation from a remote URL."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException:
        return None
