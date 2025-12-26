from http.server import BaseHTTPRequestHandler
import json
from pathlib import Path

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Get images.md file
        images_config_path = Path('config') / 'images.md'

        if images_config_path.exists() and images_config_path.is_file():
            try:
                with open(images_config_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Parse the frontmatter to extract image variables
                image_vars = {}
                if content.startswith('---'):
                    parts = content.split('---')
                    if len(parts) >= 3:
                        frontmatter = parts[1].strip()
                        for line in frontmatter.split('\n'):
                            line = line.strip()
                            if line and not line.startswith('#') and ':' in line:
                                key, value = line.split(':', 1)
                                image_vars[key.strip()] = value.strip()

                response = {
                    'variables': image_vars,
                    'exists': True
                }
            except Exception as e:
                response = {
                    'variables': {},
                    'exists': False,
                    'error': str(e)
                }
        else:
            response = {
                'variables': {},
                'exists': False
            }

        self.wfile.write(json.dumps(response).encode())
