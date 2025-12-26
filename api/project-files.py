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

        # Get all .md files from projects directory
        project_files = []
        base_path = Path(os.getcwd())
        projects_path = base_path / 'projects'

        if projects_path.exists() and projects_path.is_dir():
            for file in projects_path.glob('*.md'):
                if not file.name.startswith('_'):
                    project_files.append(file.name)

        project_files.sort()

        response = {
            'files': project_files,
            'count': len(project_files)
        }

        self.wfile.write(json.dumps(response).encode())
