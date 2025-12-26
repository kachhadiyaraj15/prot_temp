from http.server import BaseHTTPRequestHandler
import json
from pathlib import Path

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Get site.md file
        site_config_path = Path('config') / 'site.md'

        if site_config_path.exists() and site_config_path.is_file():
            try:
                with open(site_config_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Parse the frontmatter to extract site configuration
                site_config = {}
                if content.startswith('---'):
                    parts = content.split('---')
                    if len(parts) >= 3:
                        frontmatter = parts[1].strip()
                        for line in frontmatter.split('\n'):
                            line = line.strip()
                            if line and not line.startswith('#') and ':' in line:
                                key, value = line.split(':', 1)
                                key = key.strip()
                                value = value.strip()

                                # Parse boolean values
                                if value.lower() == 'true':
                                    value = True
                                elif value.lower() == 'false':
                                    value = False
                                # Parse numbers
                                elif value.isdigit():
                                    value = int(value)

                                site_config[key] = value

                response = {
                    'config': site_config,
                    'exists': True
                }
            except Exception as e:
                response = {
                    'config': {},
                    'exists': False,
                    'error': str(e)
                }
        else:
            response = {
                'config': {},
                'exists': False
            }

        self.wfile.write(json.dumps(response).encode())
