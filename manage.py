import os
import sys
from django.core.management import execute_from_command_line

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'prefeitura.settings')

try:
    execute_from_command_line(sys.argv)
except Exception as e:
    print(f"Erro ao iniciar o servidor: {e}")