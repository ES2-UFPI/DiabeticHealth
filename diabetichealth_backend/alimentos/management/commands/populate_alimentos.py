from django.core.management.base import BaseCommand
from alimentos.models import Alimento
import pandas as pd

class Command(BaseCommand):
    help = "Popula o banco com dados de um arquivo Excel"

    def add_arguments(self, parser):
        parser.add_argument(
            '--file', type=str, required=True, help="Caminho para o arquivo .xlsx"
        )

    def handle(self, *args, **options):
        file_path = options['file']

        try:
            # Ler o arquivo Excel
            df = pd.read_excel(file_path)

            # Verificar se as colunas necessárias estão presentes
            required_columns = ['alimento', 'medida usual', 'g ou ml', 'cho (g)', 'calorias (kcal)']
            if not all(col in df.columns for col in required_columns):
                self.stderr.write("Erro: O arquivo Excel não possui as colunas necessárias.")
                return

            # Iterar sobre as linhas do DataFrame e salvar os dados no banco
            for _, row in df.iterrows():
                try:
                    Alimento.objects.create(
                        nome=row['alimento'],
                        medida_usual=row['medida usual'],
                        g_ou_ml=row['g ou ml'],
                        carboidratos=row['cho (g)'],
                        calorias=row['calorias (kcal)'],
                    )
                    self.stdout.write(f"Alimento adicionado: {row['alimento']}")
                except Exception as e:
                    self.stderr.write(f"Erro ao adicionar '{row['alimento']}': {e}")

            self.stdout.write("Banco de dados populado com sucesso!")

        except FileNotFoundError:
            self.stderr.write(f"Erro: Arquivo '{file_path}' não encontrado.")
        except Exception as e:
            self.stderr.write(f"Erro inesperado: {e}")