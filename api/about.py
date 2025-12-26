from http.server import BaseHTTPRequestHandler
import json
from pathlib import Path
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Get about.md file
        base_path = Path(os.getcwd())
        about_path = base_path / 'about' / 'about.md'

        if about_path.exists() and about_path.is_file():
            try:
                with open(about_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                response = {
                    'content': content,
                    'exists': True
                }
            except Exception as e:
                response = {
                    'content': '',
                    'exists': False,
                    'error': str(e)
                }
        else:
            response = {
                'content': '',
                'exists': False
            }

        self.wfile.write(json.dumps(response).encode())
