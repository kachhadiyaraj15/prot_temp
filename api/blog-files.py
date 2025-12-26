from http.server import BaseHTTPRequestHandler
import json
from pathlib import Path

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Get all .md files from blog directory
        blog_files = []
        blog_path = Path('blog')

        if blog_path.exists() and blog_path.is_dir():
            # Scan tech directory
            tech_path = blog_path / 'tech'
            if tech_path.exists() and tech_path.is_dir():
                for file in tech_path.glob('*.md'):
                    if not file.name.startswith('_'):
                        blog_files.append({
                            'file': f'tech/{file.name}',
                            'category': 'tech'
                        })

            # Scan non-tech directory
            non_tech_path = blog_path / 'non-tech'
            if non_tech_path.exists() and non_tech_path.is_dir():
                for file in non_tech_path.glob('*.md'):
                    if not file.name.startswith('_'):
                        blog_files.append({
                            'file': f'non-tech/{file.name}',
                            'category': 'non-tech'
                        })

            # Also check root blog directory
            for file in blog_path.glob('*.md'):
                if not file.name.startswith('_'):
                    blog_files.append({
                        'file': file.name,
                        'category': 'general'
                    })

        response = {
            'files': blog_files,
            'count': len(blog_files)
        }

        self.wfile.write(json.dumps(response).encode())
