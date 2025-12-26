#!/usr/bin/env python3
"""
Simple HTTP server with API endpoint to list blog posts
"""
import http.server
import socketserver
import json
import os
import signal
import sys
from pathlib import Path
from urllib.parse import urlparse, parse_qs

PORT = 8000
BLOG_DIR = "blog"
PROJECTS_DIR = "projects"
ABOUT_DIR = "about"
HOME_DIR = "home"
CONFIG_DIR = "config"

class BlogServerHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        
        # API endpoint to list blog markdown files
        if parsed_path.path == '/api/blog-files':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            # Get all .md files from blog directory (tech and non-tech subdirectories)
            blog_files = []
            blog_path = Path(BLOG_DIR)

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

                # Also check root blog directory for backward compatibility
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

        # API endpoint to list project markdown files
        elif parsed_path.path == '/api/project-files':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            # Get all .md files from projects directory
            project_files = []
            projects_path = Path(PROJECTS_DIR)

            if projects_path.exists() and projects_path.is_dir():
                for file in projects_path.glob('*.md'):
                    # Skip template files (starting with _)
                    if not file.name.startswith('_'):
                        project_files.append(file.name)

            # Sort files alphabetically
            project_files.sort()

            response = {
                'files': project_files,
                'count': len(project_files)
            }

            self.wfile.write(json.dumps(response).encode())

        # API endpoint to get about content
        elif parsed_path.path == '/api/about':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            # Get about.md file
            about_path = Path(ABOUT_DIR) / 'about.md'

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

        # API endpoint to get home page content
        elif parsed_path.path == '/api/home':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            # Get home.md file
            home_path = Path(HOME_DIR) / 'home.md'

            if home_path.exists() and home_path.is_file():
                try:
                    with open(home_path, 'r', encoding='utf-8') as f:
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

        # API endpoint to get image configuration
        elif parsed_path.path == '/api/config/images':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            # Get images.md file
            images_config_path = Path(CONFIG_DIR) / 'images.md'

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

        # API endpoint to get site configuration
        elif parsed_path.path == '/api/config/site':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            # Get site.md file
            site_config_path = Path(CONFIG_DIR) / 'site.md'

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
        else:
            # Serve static files normally
            super().do_GET()

def run_server():
    # Allow port reuse to avoid "Address already in use" errors
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", PORT), BlogServerHandler) as httpd:
            print(f"🚀 Server running at http://localhost:{PORT}/")
            print(f"🏠 Home API available at http://localhost:{PORT}/api/home")
            print(f"📝 Blog API available at http://localhost:{PORT}/api/blog-files")
            print(f"🚀 Projects API available at http://localhost:{PORT}/api/project-files")
            print(f"👤 About API available at http://localhost:{PORT}/api/about")
            print(f"🖼️  Images Config API available at http://localhost:{PORT}/api/config/images")
            print(f"⚙️  Site Config API available at http://localhost:{PORT}/api/config/site")
            print(f"\n💡 Press Ctrl+C to stop the server\n")
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n\n👋 Server stopped gracefully")
                return  # Exit cleanly
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"\n❌ Error: Port {PORT} is already in use!")
            print(f"💡 To fix this, run: netstat -ano | findstr :{PORT}")
            print(f"   Then kill the process with: taskkill /F /PID [PID_NUMBER]\n")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()

